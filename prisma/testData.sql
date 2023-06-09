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