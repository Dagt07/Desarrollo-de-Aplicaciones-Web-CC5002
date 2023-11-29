import pymysql
import json

# -- Config to access the database --
DB_NAME = "tarea2"
DB_USERNAME = "root"
DB_PASSWORD = "databasepassword"
DB_HOST = "localhost"
DB_PORT = 3306
DB_CHARSET = "utf8"

with open('database/querys.json', 'r') as querys:
	QUERY_DICT = json.load(querys)

# -- conn ---

def get_conn():
	conn = pymysql.connect(
		db=DB_NAME,
		user=DB_USERNAME,
		passwd=DB_PASSWORD,
		host=DB_HOST,
		port=DB_PORT,
		charset=DB_CHARSET
	)
	return conn

# -- querys --

def get_region_id(region):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_region_id"], (region,))
	region_id = cursor.fetchone()
	return region_id

def get_comuna_id(comuna):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_comuna_id"], (comuna,))
	comuna_id = cursor.fetchone()
	return comuna_id

def get_comuna_name(comuna_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_comuna_name"], (comuna_id,))
	comuna_name = cursor.fetchone()
	return comuna_name

def insert_artesano(comuna_id, descripcion, nombre, email, telefono):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["insert_artesano"], (comuna_id,descripcion,nombre,email,telefono))
	user = cursor.fetchone()
	conn.commit()
	return user

def insert_hincha(comuna_id, modo_transporte, nombre, email, telefono, comentarios):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["insert_hincha"], (comuna_id,modo_transporte,nombre,email,telefono,comentarios))
	user = cursor.fetchone()
	conn.commit()
	return user

def get_artesano_idByName(name):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_artesano_idByName"], (name,))
	artesano_id = cursor.fetchone()
	return artesano_id

def get_hincha_idByName(name):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_hincha_idByName"], (name,))
	hincha_id = cursor.fetchone()
	return hincha_id

def get_last_insert_id():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["last_insert_id"])
	last_insert_id = cursor.fetchone()
	return last_insert_id
	
def get_artesania_id(nombre):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_artesania_id"], (nombre,))
	artesania_id = cursor.fetchone()
	return artesania_id

def get_deporte_id(nombre):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_deporte_id"], (nombre,))
	deporte_id = cursor.fetchone()
	return deporte_id

def get_artesania_name(id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_artesania_name"], (id,))
	artesania_name = cursor.fetchone()
	return artesania_name

def insert_artesano_tipo(artesano_id, artesania_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["insert_artesano_tipo"], (artesano_id,artesania_id))
	artesania = cursor.fetchall()
	conn.commit()
	return artesania

def insert_hincha_deporte(hincha_id, deporte_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["insert_hincha_deporte"], (hincha_id,deporte_id))
	deporte = cursor.fetchall()
	conn.commit()
	return deporte

def get_specificArtesania(id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_specificArtesania"], (id,))
	artesania = cursor.fetchone()
	return artesania

def get_specificDeporte(id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_specificDeporte"], (id,))
	deporte = cursor.fetchone()
	return deporte

def getfotos(id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["getfotos"], (id))
	fotos = cursor.fetchone()
	return fotos

def get_artesano_info(id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_artesano_info"], (id))
	artesanos = cursor.fetchone()
	return artesanos

def get_hincha_info(id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_hincha_info"], (id))
	hincha = cursor.fetchone()
	return hincha

def get_artesanos(page_size,offset):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_artesanos"], (page_size,offset))
	confessions = cursor.fetchall()
	return confessions

def get_hinchas(page_size,offset):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_hinchas"], (page_size,offset))
	confessions = cursor.fetchall()
	return confessions

def create_confession(file_path, filename, artesano_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["insert_fotos"], (file_path, filename, artesano_id))
	conn.commit()

#	Stats querys
def stats_artesano():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["stats_artesano"])
	stats = cursor.fetchall()
	return stats

def stats_hincha():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["stats_hincha"])
	stats = cursor.fetchall()
	return stats



