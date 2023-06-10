-- SQLite
-- Estados
/*
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

INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, fechaRegistro, idHistorialAdoptante, idTipoUsuario) VALUES (11, 3, 'Juan', 'Perez', 'juan2.perez@example.com', '6123456789', 'contraseña123', '2023-04-05 14:30:00', 11, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, fechaRegistro, idHistorialAdoptante, idTipoUsuario) VALUES (12, 2, 'María', 'García', 'maria.garcia@example.com', '6129876543', 'pass1234', '2023-04-10 11:15:00', 12, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, fechaRegistro, idHistorialAdoptante, idTipoUsuario) VALUES (13, 4, 'Pedro', 'Rodríguez', 'pedro.rodriguez@example.com', '6125678912', 'securepass', '2023-04-15 16:45:00', 13, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, fechaRegistro, idHistorialAdoptante, idTipoUsuario) VALUES (14, 1, 'Ana', 'López', 'ana.lopez@example.com', '6128765432', 'mypassword', '2023-04-20 13:30:00', 14, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, fechaRegistro, idHistorialAdoptante, idTipoUsuario) VALUES (15, 3, 'Carlos', 'Martínez', 'carlos.martinez@example.com', '6123456780', 'password123', '2023-04-25 10:20:00', 15, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, fechaRegistro, idHistorialAdoptante, idTipoUsuario) VALUES (16, 2, 'Laura', 'Hernández', 'laura.hernandez@example.com', '6129876541', '12345678', '2023-04-30 15:15:00', 16, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, fechaRegistro, idHistorialAdoptante, idTipoUsuario) VALUES (17, 3, 'Roberto', 'Flores', 'roberto.flores@example.com', '6125678901', 'pass123', '2023-05-05 12:10:00', 17, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, fechaRegistro, idHistorialAdoptante, idTipoUsuario) VALUES (18, 4, 'Sofía', 'Gómez', 'sofia.gomez@example.com', '6128765439', 'secure123', '2023-05-10 17:00:00', 18, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, fechaRegistro, idHistorialAdoptante, idTipoUsuario) VALUES (19, 1, 'Fernando', 'Díaz', 'fernando.diaz@example.com', '6123456781', 'mypass123', '2023-05-15 11:45:00', 19, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, fechaRegistro, idHistorialAdoptante, idTipoUsuario) VALUES (20, 3, 'Mónica', 'Silva', 'monica.silva@example.com', '6129876542', 'password1234', '2023-05-20 09:30:00', 20, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, fechaRegistro, idHistorialAdoptante, idTipoUsuario) VALUES (21, 2, 'Alejandro', 'Mendoza', 'alejandro.mendoza@example.com', '6125678903', 'pass12345', '2023-05-25 14:20:00', 21, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, fechaRegistro, idHistorialAdoptante, idTipoUsuario) VALUES (22, 4, 'Isabel', 'Vargas', 'isabel.vargas@example.com', '6128765434', 'securepass123', '2023-05-30 11:15:00', 22, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, fechaRegistro, idHistorialAdoptante, idTipoUsuario) VALUES (23, 1, 'Jorge', 'Ramírez', 'jorge.ramirez@example.com', '6123456783', 'mypassword123', '2023-06-04 16:30:00', 23, 1);
INSERT INTO adoptante (id, idMunicipio, nombre, apellido, correo, telefono, contrasena, fechaRegistro, idHistorialAdoptante, idTipoUsuario) VALUES (24, 3, 'Marcela', 'Ríos', 'marcela.rios@example.com', '6129876545', 'password12345', '2023-06-09 13:45:00', 24, 1);


------ Empleados----
INSERT INTO empleado (id, idRefugio, nombre, apellido, correo, contrasena, telefono, NIP, idTipoUsuario) VALUES (1, 1, 'Luis ', 'Ortega', 'empleado2@example.com', 'password2', '987654321', 'DEF456', 2);
INSERT INTO empleado (id, idRefugio, nombre, apellido, correo, contrasena, telefono, NIP, idTipoUsuario) VALUES (2, 2, 'Manuel', 'Diaz', 'empleado3@example.com', 'password3', '555555555', 'GHI789', 2);
INSERT INTO empleado (id, idRefugio, nombre, apellido, correo, contrasena, telefono, NIP, idTipoUsuario) VALUES (3, 4, 'Juan', 'Lopez', 'empleado4@example.com', 'password4', '999999999', 'JKL012', 2);
INSERT INTO empleado (id, idRefugio, nombre, apellido, correo, contrasena, telefono, NIP, idTipoUsuario) VALUES (4, 1, 'Jose', 'Torres', 'empleado5@example.com', 'password5', '111111111', 'MNO345', 2);
INSERT INTO empleado (id, idRefugio, nombre, apellido, correo, contrasena, telefono, NIP, idTipoUsuario) VALUES (5, 2, 'Eduardo', 'Martinez', 'empleado6@example.com', 'password6', '222222222', 'PQR678', 2);
INSERT INTO empleado (id, idRefugio, nombre, apellido, correo, contrasena, telefono, NIP, idTipoUsuario) VALUES (6, 3, 'Francisco', 'Duarte', 'empleado7@example.com', 'password7', '333333333', 'STU901', 2);
INSERT INTO empleado (id, idRefugio, nombre, apellido, correo, contrasena, telefono, NIP, idTipoUsuario) VALUES (7, 4, 'Maria', 'Macias', 'empleado8@example.com', 'password8', '444444444', 'VWX234', 2);
INSERT INTO empleado (id, idRefugio, nombre, apellido, correo, contrasena, telefono, NIP, idTipoUsuario) VALUES (8, 5, 'Melissa', 'Murillo', 'empleado9@example.com', 'password9', '666666666', 'YZA567', 2);
INSERT INTO empleado (id, idRefugio, nombre, apellido, correo, contrasena, telefono, NIP, idTipoUsuario) VALUES (9, 2, 'Kevin', 'Lopez', 'empleado10@example.com', 'password10', '777777777', 'BCD890', 2);
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
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (2, 1, 3, 3, 'Luna', 2, 'Hembra', 1, 'Gato', 0);
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (3, 4, 4, 4, 'Rocky', 4, 'Macho', 2, 'Perro', 0);
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (4, 5, 5, 5, 'Max', 1, 'Macho', 3, 'Conejo', 1);
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (5, 2, 6, 6, 'Simba', 2, 'Macho', 1, 'Gato', 0);
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (6, 1, 7, 7, 'Lola', 3, 'Hembra', 2, 'Perro', 0);
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (7, 4, 8, 8, 'Pelusa', 2, 'Hembra', 1, 'Gato', 0);
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (8, 1, 9, 9, 'Bugs', 1, 'Macho', 3, 'Conejo', 1);
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (9, 2, 10, 10, 'Nala', 2, 'Hembra', 1, 'Gato', 0);
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado) VALUES (10, 3, 2, 11, 'Rocky', 4, 'Macho', 2, 'Perro', 0);

INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (11, 1, 5, 12, 'Luna', 1, 'Hembra', 1, 'Gato', 0, '2023-05-03 14:15:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (12, 4, 8, 13, 'Max', 3, 'Macho', 2, 'Perro', 1, '2023-05-05 16:45:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (13, 2, 3, 14, 'Bella', 2, 'Hembra', 1, 'Gato', 0, '2023-05-07 11:30:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (14, 3, 6, 15, 'Buddy', 5, 'Macho', 2, 'Perro', 0, '2023-05-09 13:20:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (15, 1, 9, 16, 'Milo', 2, 'Macho', 1, 'Gato', 1, '2023-05-12 10:10:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (16, 4, 1, 17, 'Daisy', 4, 'Hembra', 2, 'Perro', 0, '2023-05-15 16:30:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (17, 2, 4, 18, 'Simba', 3, 'Macho', 1, 'Gato', 0, '2023-05-17 09:45:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (18, 3, 7, 19, 'Lola', 6, 'Hembra', 2, 'Perro', 0, '2023-05-19 12:20:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (19, 1, 10, 20, 'Oreo', 2, 'Macho', 1, 'Gato', 0, '2023-05-21 15:50:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (20, 4, 2, 21, 'Mia', 5, 'Hembra', 2, 'Perro', 1, '2023-05-24 10:05:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (21, 2, 5, 22, 'Oliver', 4, 'Macho', 1, 'Gato', 0, '2023-05-27 14:40:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (22, 3, 8, 23, 'Luna', 7, 'Hembra', 2, 'Perro', 0, '2023-05-29 11:15:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (23, 1, 1, 24, 'Max', 2, 'Macho', 1, 'Gato', 0, '2023-05-31 13:55:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (24, 4, 4, 25, 'Lola', 6, 'Hembra', 2, 'Perro', 1, '2023-06-02 16:25:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (25, 2, 7, 26, 'Simba', 4, 'Macho', 1, 'Gato', 0, '2023-06-05 09:35:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (26, 3, 10, 27, 'Molly', 3, 'Hembra', 2, 'Perro', 0, '2023-06-07 12:10:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (27, 1, 3, 28, 'Tiger', 5, 'Macho', 1, 'Gato', 0, '2023-06-09 15:45:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (28, 4, 6, 29, 'Lucy', 2, 'Hembra', 2, 'Perro', 1, '2023-06-11 10:20:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (29, 2, 9, 30, 'Charlie', 3, 'Macho', 1, 'Gato', 0, '2023-06-13 13:55:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (30, 3, 1, 31, 'Daisy', 6, 'Hembra', 2, 'Perro', 0, '2023-06-15 16:30:00');

INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (31, 1, 2, 32, 'Max', 3, 'Macho', 1, 'Gato', 0, '2023-04-05 14:30:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (32, 1, 3, 33, 'Lola', 2, 'Hembra', 2, 'Perro', 0, '2023-04-10 11:15:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (33, 1, 4, 34, 'Bella', 4, 'Hembra', 3, 'Conejo', 0, '2023-04-15 16:45:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (34, 1, 5, 35, 'Rocky', 5, 'Macho', 2, 'Perro', 0, '2023-04-20 13:30:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (35, 1, 6, 36, 'Simba', 1, 'Macho', 1, 'Gato', 0, '2023-04-25 10:20:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (36, 1, 7, 37, 'Luna', 3, 'Hembra', 2, 'Perro', 0, '2023-04-30 15:15:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (37, 1, 8, 38, 'Milo', 2, 'Macho', 3, 'Conejo', 0, '2023-05-05 12:10:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (38, 1, 9, 39, 'Lucy', 4, 'Hembra', 2, 'Perro', 0, '2023-05-10 17:00:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (39, 1, 10, 40, 'Toby', 2, 'Macho', 1, 'Gato', 0, '2023-05-15 11:45:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (40, 1, 11, 41, 'Lola', 3, 'Hembra', 2, 'Perro', 0, '2023-05-20 09:30:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (41, 1, 12, 42, 'Mia', 1, 'Hembra', 3, 'Conejo', 0, '2023-05-25 14:20:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (42, 1, 13, 43, 'Max', 5, 'Macho', 2, 'Perro', 0, '2023-05-30 11:15:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (43, 1, 14, 44, 'Luna', 2, 'Hembra', 1, 'Gato', 0, '2023-06-04 16:30:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (44, 1, 15, 45, 'Buddy', 4, 'Macho', 2, 'Perro', 0, '2023-06-09 13:45:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (45, 1, 16, 46, 'Coco', 3, 'Hembra', 3, 'Conejo', 0, '2023-06-14 10:30:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (46, 1, 17, 47, 'Rocky', 2, 'Macho', 1, 'Gato', 0, '2023-06-19 15:45:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (47, 1, 18, 48, 'Lola', 4, 'Hembra', 2, 'Perro', 0, '2023-06-24 12:20:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (48, 1, 19, 49, 'Charlie', 1, 'Macho', 3, 'Conejo', 0, '2023-06-29 09:10:00');
INSERT INTO mascota (id, idRefugio, idHistorial, idCartilla, nombre, edad, sexo, idEspecie, raza, maltratado, fechaRegistro) VALUES (49, 1, 20, 50, 'Luna', 5, 'Hembra', 2, 'Perro', 0, '2023-07-04 14:50:00');


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

INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (2, 20, 5, 2, 1);
INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (3, 15, 10, 1, 1);
INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (4, 10, 7, 3, 1);
INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (5, 12, 6, 2, 2);
INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (6, 18, 9, 1, 2);
INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (7, 10, 5, 3, 2);
INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (8, 15, 7, 2, 3);
INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (9, 12, 6, 1, 3);
INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (10, 18, 9, 3, 3);
INSERT INTO espacios (id, espacioTotal, espacioDisponible, idEspecie, idRefugio) VALUES (11, 20, 10, 2, 4);

--Reportes--
--Usuarios---
INSERT INTO reporte (id, idReportador, idReportado, idMascota, idMunicipio, descripcion, fechaCreada) VALUES (11, 2, 10, 5, 3, 'Tortuga en peligro cerca del río', '2023-04-01 09:00:00');
INSERT INTO reporte (id, idReportador, idReportado, idMascota, idMunicipio, descripcion, fechaCreada) VALUES (12, 1, 9, 3, 2, 'Perro abandonado en el parque', '2023-04-05 14:30:00');
INSERT INTO reporte (id, idReportador, idReportado, idMascota, idMunicipio, descripcion, fechaCreada) VALUES (13, 3, 7, 2, 1, 'Gato perdido en el vecindario', '2023-04-10 11:15:00');
INSERT INTO reporte (id, idReportador, idReportado, idMascota, idMunicipio, descripcion, fechaCreada) VALUES (14, 2, 6, 1, 4, 'Perro herido en la carretera', '2023-04-15 16:45:00');
INSERT INTO reporte (id, idReportador, idReportado, idMascota, idMunicipio, descripcion, fechaCreada) VALUES (15, 1, 5, 4, 3, 'Gato encontrado en el parque', '2023-04-20 13:30:00');
INSERT INTO reporte (id, idReportador, idReportado, idMascota, idMunicipio, descripcion, fechaCreada) VALUES (16, 3, 8, 5, 2, 'Cachorro perdido cerca de la tienda', '2023-04-25 10:20:00');
INSERT INTO reporte (id, idReportador, idReportado, idMascota, idMunicipio, descripcion, fechaCreada) VALUES (17, 2, 7, 1, 1, 'Gato herido en el jardín', '2023-04-30 15:15:00');
INSERT INTO reporte (id, idReportador, idReportado, idMascota, idMunicipio, descripcion, fechaCreada) VALUES (18, 1, 6, 2, 4, 'Perro abandonado en la calle principal', '2023-05-05 12:10:00');
INSERT INTO reporte (id, idReportador, idReportado, idMascota, idMunicipio, descripcion, fechaCreada) VALUES (19, 3, 5, 3, 3, 'Gato perdido en el vecindario', '2023-05-10 17:00:00');
INSERT INTO reporte (id, idReportador, idReportado, idMascota, idMunicipio, descripcion, fechaCreada) VALUES (20, 2, 4, 4, 2, 'Perro encontrado en el parque', '2023-05-15 11:45:00');

--anonimos--
INSERT INTO reporte (id, idMunicipio, descripcion, fechaCreada) VALUES (21, 3, 'Gato perdido cerca del parque', '2023-05-01 09:00:00');
INSERT INTO reporte (id, idMunicipio, descripcion, fechaCreada) VALUES (22, 1, 'Perro encontrado en la calle principal', '2023-05-02 10:30:00');
INSERT INTO reporte (id, idMunicipio, descripcion, fechaCreada) VALUES (23, 2, 'Cachorro abandonado en la tienda de comestibles', '2023-05-03 14:15:00');
INSERT INTO reporte (id, idMunicipio, descripcion, fechaCreada) VALUES (24, 4, 'Gato herido en el jardín público', '2023-05-05 16:45:00');
INSERT INTO reporte (id, idMunicipio, descripcion, fechaCreada) VALUES (25, 3, 'Perro perdido en el vecindario', '2023-05-07 11:30:00');
INSERT INTO reporte (id, idMunicipio, descripcion, fechaCreada) VALUES (26, 2, 'Cachorro encontrado cerca de la estación de autobuses', '2023-05-09 13:20:00');
INSERT INTO reporte (id, idMunicipio, descripcion, fechaCreada) VALUES (27, 1, 'Gato abandonado en el parque de la ciudad', '2023-05-12 10:10:00');
INSERT INTO reporte (id, idMunicipio, descripcion, fechaCreada) VALUES (28, 4, 'Perro herido en la carretera principal', '2023-05-15 16:30:00');
INSERT INTO reporte (id, idMunicipio, descripcion, fechaCreada) VALUES (29, 3, 'Cachorro perdido en el centro comercial', '2023-05-17 09:45:00');
INSERT INTO reporte (id, idMunicipio, descripcion, fechaCreada) VALUES (30, 2, 'Gato encontrado en el patio trasero de una casa', '2023-05-19 12:20:00');
INSERT INTO reporte (id, idMunicipio, descripcion, fechaCreada) VALUES (31, 1, 'Perro abandonado cerca del supermercado', '2023-05-21 15:50:00');
INSERT INTO reporte (id, idMunicipio, descripcion, fechaCreada) VALUES (32, 4, 'Cachorro herido en el parque para perros', '2023-05-24 10:05:00');
INSERT INTO reporte (id, idMunicipio, descripcion, fechaCreada) VALUES (33, 3, 'Gato perdido en la zona residencial', '2023-05-27 14:40:00');
INSERT INTO reporte (id, idMunicipio, descripcion, fechaCreada) VALUES (34, 2, 'Perro encontrado en el parque de juegos', '2023-05-29 11:15:00');
INSERT INTO reporte (id, idMunicipio, descripcion, fechaCreada) VALUES (35, 1, 'Cachorro abandonado en el centro de la ciudad', '2023-05-31 13:55:00');

--Adopcion--
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (1, 1, 1, 1, '2023-04-01 09:00:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (2, 2, 2, 3, '2023-04-05 14:30:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (3, 3, 3, 4, '2023-04-10 11:15:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (4, 4, 4, 5, '2023-04-15 16:45:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (5, 5, 5, 5, '2023-04-20 13:30:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (6, 6, 6, 6, '2023-04-25 10:20:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (7, 7, 7, 7, '2023-04-30 15:15:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (8, 8, 8, 2, '2023-05-05 12:10:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (9, 9, 9, 9, '2023-05-10 17:00:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (10, 10, 10, 1, '2023-05-15 11:45:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (11, 11, 11, 1, '2023-05-20 09:30:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (12, 12, 12, 12, '2023-05-25 14:20:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (13, 13, 13, 1, '2023-05-30 11:15:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (14, 14, 14, 14, '2023-06-04 16:30:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (15, 15, 15, 1, '2023-06-09 13:45:00');

INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (16, 16, 16, 1, '2023-05-05 14:30:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (17, 17, 17, 1, '2023-05-10 11:15:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (18, 18, 18, 1, '2023-05-15 16:45:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (19, 19, 19, 1, '2023-05-20 13:30:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (20, 20, 20, 1, '2023-05-25 10:20:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (21, 21, 21, 1, '2023-05-30 15:15:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (22, 22, 22, 1, '2023-06-04 16:30:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (23, 23, 23, 1, '2023-06-09 13:45:00');
INSERT INTO adopcion (id, idAdoptante, idMascota, idRefugio, fechaCreada) VALUES (24, 24, 24, 1, '2023-06-14 10:30:00');
