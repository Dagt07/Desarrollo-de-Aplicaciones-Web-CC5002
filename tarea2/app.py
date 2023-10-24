from flask import Flask, request, render_template, redirect, url_for, session
from utils.validations import validate_register
from database import db
from werkzeug.utils import secure_filename
import hashlib
import filetype
import os
import uuid

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.secret_key = "s3cr3t_k3y"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000

# --- Routes ---
@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/agregar-artesano", methods=["GET", "POST"])
def agregar_artesano():
    if request.method == "POST":
        nombre =  request.form.get("nombre")
        email = request.form.get("email")
        telefono = request.form.get("telefono")
        region = request.form.get("region")
        comuna = request.form.get("comuna")
        descripcion = request.form.get("descripcion")
        artesania = request.form.get("artesania")
        fotos = request.files.getlist("fotos") 
        if validate_register(nombre,email,telefono,region,comuna,descripcion,artesania,fotos):
            comuna_id = db.get_comuna_id(comuna)
            db.insert_artesano(comuna_id,descripcion,nombre,email,telefono) 
            # Insertar en tabla artesano_tipo
            artesano_id = db.get_artesano_idByName(nombre)
            artesania_id = db.get_artesania_id(artesania) 
            db.insert_artesano_tipo(artesano_id, artesania_id) 
            # Insertar en tabla fotos
            for foto in fotos:
                agregarfoto(foto,nombre)
        return redirect(url_for("index"))
    
    elif request.method == "GET":
        return render_template("agregar-artesano.html")
    
@app.route("/agregar-hincha", methods=["GET"])
def agregar_hincha():
    if request.method == "GET":
        return render_template("agregar-hincha.html")
    
@app.route("/ver-artesanos", methods=["GET"])
def ver_artesanos():
    if request.method == "GET":
        # get last confessions 
        data = []
        for conf in db.get_confessions(page_size=5):
            id, comuna_id, _, nombre, email, telefono = conf
            conf_img = db.getfotos(id)
            ### CHECKPOINT 
            comuna = db.get_comuna_name(comuna_id)
            img_filename = f"uploads/{conf_img[0]}"
            data.append({
                "nombre": nombre,
                "telefono": telefono,
                "comuna": comuna[0],
                "tipo_artesania": db.get_specificArtesania(id)[0],
                "path_image": url_for("static", filename=img_filename),
                "artesano_id": db.get_artesano_idByName(nombre)
            })
    
    return render_template("ver-artesanos.html", data=data)  

@app.route("/ver-hinchas", methods=["GET"])
def ver_hinchas():
    if request.method == "GET":
        return render_template("ver-hinchas.html")   

@app.route("/info-artesano/<int:artesano_id>")
def info_artesano(artesano_id):
    artesano_info = db.get_artesano_info(artesano_id)
    print(artesano_info)
    return render_template("informacion-artesano.html", artesano_info=artesano_info)
    
@app.route("/info-hincha", methods=["GET"])
def info_hincha():
    if request.method == "GET":
        return render_template("informacion-hincha.html")
    
def agregarfoto(conf_img,name):
        # 1. generate random name for img
        _filename_hash = hashlib.sha256(
            secure_filename(conf_img.filename).encode("utf-8")
            ).hexdigest()
        _extension = filetype.guess(conf_img).extension
        img_filename = f"{_filename_hash}_{str(uuid.uuid4())}.{_extension}"
        #img_filename = f"{_filename}.{_extension}"
       
        # 2. save img as a file
        conf_img.save(os.path.join(app.config["UPLOAD_FOLDER"], img_filename))

        # 3. save confession in db
        artesano_id= db.get_artesano_idByName(name)
        filepath = "static/uploads"
        db.create_confession(filepath, img_filename, artesano_id)

if __name__ == "__main__":
    app.run(debug=True)
