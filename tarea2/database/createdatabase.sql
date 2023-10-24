-- Crear Base de datos
CREATE DATABASE IF NOT EXISTS tarea2 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE tarea2;

-- Darle permisos al usuario
GRANT ALL ON tarea2.* TO cc5002@localhost;
GRANT ALL ON tarea2.* TO root@localhost;




