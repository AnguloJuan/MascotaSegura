-- SQLite
-- Estados
INSERT INTO estado (nombre) VALUES ('Estado 1');
INSERT INTO estado (nombre) VALUES ('Estado 2');

-- Municipios
INSERT INTO municipio (nombre, idEstado) VALUES ('Municipio 1', 1);
INSERT INTO municipio (nombre, idEstado) VALUES ('Municipio 2', 1);
INSERT INTO municipio (nombre, idEstado) VALUES ('Municipio 3', 2);

-- Refugios
INSERT INTO refugio (idMunicipio, espacios) VALUES (1, 10);
INSERT INTO refugio (idMunicipio, espacios) VALUES (2, 5);

-- Adoptantes
INSERT INTO adoptante (idMunicipio, nombre, apellido, correo, telefono, contrasena, idHistorialAdoptante, idTipoUsuario) VALUES (1, 'Adoptante 1', 'Apellido 1', 'adoptante1@example.com', 123456789, 123456, 1, 1);
INSERT INTO adoptante (idMunicipio, nombre, apellido, correo, telefono, contrasena, idHistorialAdoptante, idTipoUsuario) VALUES (2, 'Adoptante 2', 'Apellido 2', 'adoptante2@example.com', 987654321, 654321, 2, 1);

-- Empleados
INSERT INTO empleado (idRefugio, nombre, apellido, correo, contrasena, telefono, NIP, idTipoUsuario) VALUES (1, 'Empleado 1', 'Apellido 1', 'empleado1@example.com', 'password1', '123456789', 'ABC123', 2);
INSERT INTO empleado (idRefugio, nombre, apellido, correo, contrasena, telefono, NIP, idTipoUsuario) VALUES (2, 'Empleado 2', 'Apellido 2', 'empleado2@example.com', 'password2', '987654321', 'DEF456', 2);

-- Tipo de usuarios
INSERT INTO tipoUsuario (id, usuario) VALUES (1, 'Adoptante');
INSERT INTO tipoUsuario (id, usuario) VALUES (2, 'Empleado');

-- Historial Adoptivo
INSERT INTO historialAdoptivo (idMascota, idAdoptante) VALUES (1, 1);
INSERT INTO historialAdoptivo (idMascota, idAdoptante) VALUES (2, 2);

-- Mascotas
INSERT INTO mascota (idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (1, 1, 1, 'Mascota 1', 2, 'Macho', 1, 'Raza 1', 0);
INSERT INTO mascota (idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (2, 2, 2, 'Mascota 2', 3, 'Hembra', 2, 'Raza 2', 1);

-- Adopciones
INSERT INTO adopcion (idAdoptante, idMascota, idRefugio) VALUES (1, 1, 1);
INSERT INTO adopcion (idAdoptante, idMascota, idRefugio) VALUES (2, 2, 2);

-- Reportes
INSERT INTO reporte (idReportador, idReportado, idMascota, idMunicipio, descripcion) VALUES (1, 2, 1, 1, 'Descripción del reporte');
INSERT INTO reporte (idReportador, idReportado, idMascota, idMunicipio, descripcion) VALUES (2, 1, 2, 2, 'Descripción del reporte');

-- Especies
INSERT INTO especie (id, especie) VALUES (1, 'Especie 1');
INSERT INTO especie (id, especie) VALUES (2, 'Especie 2');

-- Espacios
INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (1, 5, 5, 1, 1);
INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (2, 3, 3, 2, 2);

/*
ALTER TABLE espacios RENAME COLUMN espacios TO espacioTotal;
ALTER TABLE espacios ADD COLUMN espacioDisponible Int;

UPDATE espacios SET espacioDisponible = 5 WHERE id = 1;
UPDATE espacios SET espacioDisponible = 3 WHERE id = 2;
*/

-- Borrar datos de la tabla adopcion
DELETE FROM adopcion;
-- Borrar datos de la tabla adoptante
DELETE FROM adoptante;
-- Borrar datos de la tabla cartilla
DELETE FROM cartilla;
-- Borrar datos de la tabla empleado
DELETE FROM empleado;
-- Borrar datos de la tabla especie
DELETE FROM especie;
-- Borrar datos de la tabla estado
DELETE FROM estado;
-- Borrar datos de la tabla espacios
DELETE FROM espacios;
-- Borrar datos de la tabla historialAdoptivo
DELETE FROM historialAdoptivo;
-- Borrar datos de la tabla mascota
DELETE FROM mascota;
-- Borrar datos de la tabla municipio
DELETE FROM municipio;
-- Borrar datos de la tabla refugio
DELETE FROM refugio;
-- Borrar datos de la tabla reporte
DELETE FROM reporte;
-- Borrar datos de la tabla tipoUsuario
DELETE FROM tipoUsuario;


-------Tabla adoptantes-----
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, idHistorialAdoptante, idTipoUsuario) VALUES (1, 1, 'Juan', 'Pérez', 'juan.perez@example.com', '6122881676', 'contraseña123', 1, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, idHistorialAdoptante, idTipoUsuario) VALUES (2, 2, 'María', 'Gómez', 'maria.gomez@example.com', '6125869587', 'password123', 2, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, idHistorialAdoptante, idTipoUsuario) VALUES (3, 3, 'Carlos', 'López', 'carlos.lopez@example.com', '6125487954', 'segura123', 3, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, idHistorialAdoptante, idTipoUsuario) VALUES (4, 4, 'Ana', 'Rodríguez', 'ana.rodriguez@example.com', '6125489845', 'miClave123', 4, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, idHistorialAdoptante, idTipoUsuario) VALUES (5, 5, 'Pedro', 'Martínez', 'pedro.martinez@example.com', '6123547956', 'secreta456', 5, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, idHistorialAdoptante, idTipoUsuario) VALUES (6, 1, 'Laura', 'Sánchez', 'laura.sanchez@example.com', '6126231548', 'clave1234', 6, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, idHistorialAdoptante, idTipoUsuario) VALUES (7, 2, 'José', 'Ramírez', 'jose.ramirez@example.com', '6123365987', 'password567', 7, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, idHistorialAdoptante, idTipoUsuario) VALUES (8, 3, 'Sofía', 'Torres', 'sofia.torres@example.com', '6122154987', 'segura567', 8, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, idHistorialAdoptante, idTipoUsuario) VALUES (9, 4, 'Javier', 'Hernández', 'javier.hernandez@example.com', '6123226254', 'miClave567', 9, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, idHistorialAdoptante, idTipoUsuario) VALUES (10, 5, 'Carmen', 'Luna', 'carmen.luna@example.com', '6121245987', 'secreta890', 10, 1);

------ Empleados----
INSERT INTO empleado (id, idRefugio, nombre, apellido, correo, contrasena, telefono, NIP, idTipoUsuario) VALUES (2, 2, 'Luis ', 'Ortega', 'empleado2@example.com', 'password2', '987654321', 'DEF456', 2);
INSERT INTO empleado (id, idRefugio, nombre, apellido, correo, contrasena, telefono, NIP, idTipoUsuario) VALUES (3, 3, 'Manuel', 'Diaz', 'empleado3@example.com', 'password3', '555555555', 'GHI789', 2);
INSERT INTO empleado (id, idRefugio, nombre, apellido, correo, contrasena, telefono, NIP, idTipoUsuario) VALUES (4, 4, 'Juan', 'Lopez', 'empleado4@example.com', 'password4', '999999999', 'JKL012', 2);
INSERT INTO empleado (id, idRefugio, nombre, apellido, correo, contrasena, telefono, NIP, idTipoUsuario) VALUES (5, 5, 'Jose', 'Torres', 'empleado5@example.com', 'password5', '111111111', 'MNO345', 2);
INSERT INTO empleado (id, idRefugio, nombre, apellido, correo, contrasena, telefono, NIP, idTipoUsuario) VALUES (6, 2, 'Eduardo', 'Martinez', 'empleado6@example.com', 'password6', '222222222', 'PQR678', 2);
INSERT INTO empleado (id, idRefugio, nombre, apellido, correo, contrasena, telefono, NIP, idTipoUsuario) VALUES (7, 3, 'Francisco', 'Duarte', 'empleado7@example.com', 'password7', '333333333', 'STU901', 2);
INSERT INTO empleado (id, idRefugio, nombre, apellido, correo, contrasena, telefono, NIP, idTipoUsuario) VALUES (8, 4, 'Maria', 'Macias', 'empleado8@example.com', 'password8', '444444444', 'VWX234', 2);
INSERT INTO empleado (id, idRefugio, nombre, apellido, correo, contrasena, telefono, NIP, idTipoUsuario) VALUES (9, 5, 'Melissa', 'Murillo', 'empleado9@example.com', 'password9', '666666666', 'YZA567', 2);
INSERT INTO empleado (id, idRefugio, nombre, apellido, correo, contrasena, telefono, NIP, idTipoUsuario) VALUES (10, 2, 'Kevin', 'Lopez', 'empleado10@example.com', 'password10', '777777777', 'BCD890', 2);
----Reportes-----
INSERT INTO reporte (id, idReportador, idReportado, idMascota, idMunicipio, descripcion) VALUES (2, 2, 1, 2, 2, 'Perro se encuentra desnutrido en tal zona');
INSERT INTO reporte (id, idReportador, idReportado, idMascota, idMunicipio, descripcion) VALUES (3, 3, 2, 3, 3, 'Gato perdido cerca del parque');
INSERT INTO reporte (id, idReportador, idReportado, idMascota, idMunicipio, descripcion) VALUES (4, 4, 3, 1, 4, 'Cachorro abandonado en la calle principal');
INSERT INTO reporte (id, idReportador, idReportado, idMascota, idMunicipio, descripcion) VALUES (5, 5, 4, 4, 5, 'Conejo encontrado en el jardín');
INSERT INTO reporte (id, idReportador, idReportado, idMascota, idMunicipio, descripcion) VALUES (6, 6, 5, 5, 2, 'Tortuga herida en el lago');
INSERT INTO reporte (id, idReportador, idReportado, idMascota, idMunicipio, descripcion) VALUES (7, 7, 6, 2, 3, 'Perro callejero en mal estado cerca de la escuela');
INSERT INTO reporte (id, idReportador, idReportado, idMascota, idMunicipio, descripcion) VALUES (8, 8, 7, 3, 4, 'Gato atrapado en el árbol');
INSERT INTO reporte (id, idReportador, idReportado, idMascota, idMunicipio, descripcion) VALUES (9, 9, 8, 1, 5, 'Cachorro abandonado en una caja en la acera');
INSERT INTO reporte (id, idReportador, idReportado, idMascota, idMunicipio, descripcion) VALUES (10, 10, 9, 4, 2, 'Conejo encontrado en el parque');
INSERT INTO reporte (id, idReportador, idReportado, idMascota, idMunicipio, descripcion) VALUES (11, 2, 10, 5, 3, 'Tortuga en peligro cerca del río');
-- Mascotas ---
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (1, 2, 2, 2, 'Bobby', 3, 'Hembra', 2, 'Perro', 1);
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (2, 3, 3, 3, 'Luna', 2, 'Hembra', 1, 'Gato', 0);
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (3, 4, 4, 4, 'Rocky', 4, 'Macho', 2, 'Perro', 0);
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (4, 5, 5, 5, 'Max', 1, 'Macho', 3, 'Conejo', 1);
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (5, 2, 6, 6, 'Simba', 2, 'Macho', 1, 'Gato', 0);
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (6, 3, 7, 7, 'Lola', 3, 'Hembra', 2, 'Perro', 0);
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (7, 4, 8, 8, 'Pelusa', 2, 'Hembra', 1, 'Gato', 0);
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (8, 5, 9, 9, 'Bugs', 1, 'Macho', 3, 'Conejo', 1);
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (9, 2, 10, 10, 'Nala', 2, 'Hembra', 1, 'Gato', 0);
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (10, 3, 2, 11, 'Rocky', 4, 'Macho', 2, 'Perro', 0);
--Especies --
INSERT INTO especie (id, especie) VALUES (1, 'Canina');
INSERT INTO especie (id, especie) VALUES (2, 'Felina');
INSERT INTO especie (id, especie) VALUES (3, 'Ave');
INSERT INTO especie (id, especie) VALUES (4, 'Reptil');
INSERT INTO especie (id, especie) VALUES (5, 'Roedor');
--Estados--
INSERT INTO estado (id, nombre) VALUES (1, 'Baja California Sur');
INSERT INTO estado (id, nombre) VALUES (2, 'Jalisco');
INSERT INTO estado (id, nombre) VALUES (3, 'Yucatán');
INSERT INTO estado (id, nombre) VALUES (4, 'Nuevo León');
INSERT INTO estado (id, nombre) VALUES (5, 'Veracruz');
--Municipios--
INSERT INTO municipio (id, nombre, idEstado) VALUES (1, 'Loreto', 1);
INSERT INTO municipio (id, nombre, idEstado) VALUES (2, 'La Paz', 1);
INSERT INTO municipio (id, nombre, idEstado) VALUES (3, 'Comondú', 1);
INSERT INTO municipio (id, nombre, idEstado) VALUES (4, 'Mulegé', 1);
INSERT INTO municipio (id, nombre, idEstado) VALUES (5, 'Los Cabos', 1);
INSERT INTO municipio (id, nombre, idEstado) VALUES (6, 'Guadalajara', 2);
INSERT INTO municipio (id, nombre, idEstado) VALUES (7, 'Zapopan', 2);
INSERT INTO municipio (id, nombre, idEstado) VALUES (8, 'Tlaquepaque', 2);
INSERT INTO municipio (id, nombre, idEstado) VALUES (9, 'Tonalá', 2);
INSERT INTO municipio (id, nombre, idEstado) VALUES (10, 'Puerto Vallarta', 2);
INSERT INTO municipio (id, nombre, idEstado) VALUES (11, 'Mérida', 3);
INSERT INTO municipio (id, nombre, idEstado) VALUES (12, 'Valladolid', 3);
INSERT INTO municipio (id, nombre, idEstado) VALUES (13, 'Progreso', 3);
INSERT INTO municipio (id, nombre, idEstado) VALUES (14, 'Izamal', 3);
INSERT INTO municipio (id, nombre, idEstado) VALUES (15, 'Tizimín', 3);
INSERT INTO municipio (id, nombre, idEstado) VALUES (16, 'Monterrey', 4);
INSERT INTO municipio (id, nombre, idEstado) VALUES (17, 'San Pedro Garza García', 4);
INSERT INTO municipio (id, nombre, idEstado) VALUES (18, 'Guadalupe', 4);
INSERT INTO municipio (id, nombre, idEstado) VALUES (19, 'Apodaca', 4);
INSERT INTO municipio (id, nombre, idEstado) VALUES (20, 'Escobedo', 4);
INSERT INTO municipio (id, nombre, idEstado) VALUES (21, 'Veracruz', 5);
INSERT INTO municipio (id, nombre, idEstado) VALUES (22, 'Xalapa', 5);
INSERT INTO municipio (id, nombre, idEstado) VALUES (23, 'Coatzacoalcos', 5);
INSERT INTO municipio (id, nombre, idEstado) VALUES (24, 'Poza Rica', 5);
INSERT INTO municipio (id, nombre, idEstado) VALUES (25, 'Córdoba', 5);

--refugio--

INSERT INTO refugio (id, idMunicipio, espacios) VALUES (1, 2, 30);
INSERT INTO refugio (id, idMunicipio, espacios) VALUES (2, 3, 20);
INSERT INTO refugio (id, idMunicipio, espacios) VALUES (3, 4, 25);
INSERT INTO refugio (id, idMunicipio, espacios) VALUES (4, 5, 15);
INSERT INTO refugio (id, idMunicipio, espacios) VALUES (5, 6, 10);
INSERT INTO refugio (id, idMunicipio, espacios) VALUES (6, 3, 35);

---Tipos de usuario---
INSERT INTO tipoUsuario (id, usuario) VALUES (1, 'Adoptante');
INSERT INTO tipoUsuario (id, usuario) VALUES (2, 'Empleado');
INSERT INTO tipoUsuario (id, usuario) VALUES (3, 'Administrador');


-- espacios --

INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (2, 200, 50, 2, 1);
INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (3, 150, 100, 1, 1);
INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (4, 100, 75, 3, 1);
INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (5, 120, 60, 2, 4);
INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (6, 180, 90, 1, 5);
INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (7, 100, 50, 3, 6);
INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (8, 150, 75, 2, 7);
INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (9, 120, 60, 1, 8);
INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (10, 180, 90, 3, 9);
INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (11, 200, 100, 2, 10);