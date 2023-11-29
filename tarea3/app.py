from flask import Flask, request, render_template, redirect, url_for, jsonify
from flask_cors import cross_origin
from utils.validations import validate_register_artesan, validate_register_hincha
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

# -------- Default and Nav bar Routes  --------

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/stats", methods=["GET"])
@cross_origin(origin="localhost", supports_credentials=True)
def stats():
    return render_template("stats.html")


@app.route("/get-stats-data-artesanos", methods=["GET"])
@cross_origin(origin="localhost", supports_credentials=True)
def get_stats_data_artesanos():
    #tengo que pedirle la info a la db para los artesanos
    stats = db.stats_artesano()
    data = [{"name": stat[0], "quantity": stat[1]} for stat in stats]
    return jsonify(data)


@app.route("/get-stats-data-hinchas", methods=["GET"])
@cross_origin(origin="localhost", supports_credentials=True)
def get_stats_data_hinchas():
    #tengo que pedirle la info a la db para los hinchas
    stats = db.stats_hincha()
    data = [{"name": stat[0], "quantity": stat[1]} for stat in stats]
    return jsonify(data)
    
#-------- Routes for artesanos --------

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
        if validate_register_artesan(nombre,email,telefono,region,comuna,descripcion,artesania,fotos):
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
    
@app.route("/ver-artesanos", methods=["GET"])
def ver_artesanos():

    # Obtener los parámetros de la consulta
    page_size = int(request.args.get('page_size', 5))
    offset = int(request.args.get('offset', 0))

    if request.method == "GET":
        # get last confessions 
        data = []
        for conf in db.get_artesanos(page_size, offset):
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

@app.route("/info-artesano/<int:artesano_id>")
def info_artesano(artesano_id):
    artesano_info = db.get_artesano_info(artesano_id)
    return render_template("informacion-artesano.html", artesano_info=artesano_info)

#-------- Routes for hinchas --------

@app.route("/agregar-hincha", methods=["GET","POST"])
def agregar_hincha():
    if request.method == "POST":
        nombre =  request.form.get("nombre")
        email = request.form.get("email")
        telefono = request.form.get("telefono")
        region = request.form.get("region")
        comuna = request.form.get("comuna")
        comentarios = request.form.get("comentarios")
        transporte = request.form.get("transporte")
        deporte = request.form.get("deporte") 
        if validate_register_hincha(nombre,email,telefono,region,comuna,comentarios,deporte,transporte):
            comuna_id = db.get_comuna_id(comuna)
            db.insert_hincha(comuna_id,transporte,nombre,email,telefono,comentarios) 
            # Insertar en tabla hincha_deporte
            hincha_id = db.get_hincha_idByName(nombre)
            deporte_id = db.get_deporte_id(deporte) 
            db.insert_hincha_deporte(hincha_id, deporte_id) 
        return redirect(url_for("index"))
    
    elif request.method == "GET":
        return render_template("agregar-hincha.html")

@app.route("/ver-hinchas", methods=["GET"])
def ver_hinchas():
    # Obtener los parámetros de la consulta
    page_size = int(request.args.get('page_size', 5))
    offset = int(request.args.get('offset', 0))

    if request.method == "GET":
        # get last confessions 
        data = []
        for conf in db.get_hinchas(page_size, offset):
            id, comuna_id, modo_transporte, nombre, email, telefono, _ = conf
            comuna = db.get_comuna_name(comuna_id)
            data.append({
                "nombre": nombre,
                "comuna": comuna[0],
                "deporte": db.get_specificDeporte(id)[0],
                "modo_transporte": modo_transporte,
                "telefono": telefono,
                "hincha_id": db.get_hincha_idByName(nombre),        
            })
    
    return render_template("ver-hinchas.html", data=data)    

@app.route("/info-hincha/<int:hincha_id>")
def info_hincha(hincha_id):
    hincha_info = db.get_hincha_info(hincha_id)
    return render_template("informacion-hincha.html", hincha_info=hincha_info)

#-------- Other functions --------

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
