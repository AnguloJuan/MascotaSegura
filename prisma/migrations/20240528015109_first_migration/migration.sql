-- CreateTable
CREATE TABLE "estado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "municipio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "idEstado" INTEGER NOT NULL,
    CONSTRAINT "municipio_idEstado_fkey" FOREIGN KEY ("idEstado") REFERENCES "estado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "refugio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT,
    "espacios" INTEGER,
    "fechaCreada" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idMunicipio" INTEGER NOT NULL,
    CONSTRAINT "refugio_idMunicipio_fkey" FOREIGN KEY ("idMunicipio") REFERENCES "municipio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "adoptante" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" BIGINT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "fechaRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idMunicipio" INTEGER NOT NULL,
    "idTipoUsuario" INTEGER NOT NULL,
    "imagen" TEXT,
    CONSTRAINT "adoptante_idMunicipio_fkey" FOREIGN KEY ("idMunicipio") REFERENCES "municipio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "adoptante_idTipoUsuario_fkey" FOREIGN KEY ("idTipoUsuario") REFERENCES "tipoUsuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "empleado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idRefugio" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "telefono" BIGINT NOT NULL,
    "NIP" TEXT NOT NULL,
    "fechaRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idTipoUsuario" INTEGER NOT NULL,
    "imagen" TEXT,
    CONSTRAINT "empleado_idTipoUsuario_fkey" FOREIGN KEY ("idTipoUsuario") REFERENCES "tipoUsuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tipoUsuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "historialAdoptivo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idMascota" INTEGER NOT NULL,
    "idAdoptante" INTEGER NOT NULL,
    "motivo" TEXT DEFAULT 'Sin motivo específico',
    CONSTRAINT "historialAdoptivo_idMascota_fkey" FOREIGN KEY ("idMascota") REFERENCES "mascota" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "historialAdoptivo_idAdoptante_fkey" FOREIGN KEY ("idAdoptante") REFERENCES "adoptante" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sexo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sexo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "mascota" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT,
    "edad" INTEGER,
    "meses" INTEGER,
    "maltratado" BOOLEAN NOT NULL DEFAULT false,
    "fechaRegistro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imagen" TEXT,
    "idRefugio" INTEGER,
    "cartilla" BOOLEAN NOT NULL DEFAULT false,
    "motivo" TEXT,
    "idSexo" INTEGER NOT NULL,
    "idTamano" INTEGER DEFAULT 1,
    "idEspecie" INTEGER NOT NULL,
    "idRaza" INTEGER,
    CONSTRAINT "mascota_idRefugio_fkey" FOREIGN KEY ("idRefugio") REFERENCES "refugio" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "mascota_idSexo_fkey" FOREIGN KEY ("idSexo") REFERENCES "sexo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "mascota_idTamano_fkey" FOREIGN KEY ("idTamano") REFERENCES "tamano" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "mascota_idEspecie_fkey" FOREIGN KEY ("idEspecie") REFERENCES "especie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "mascota_idRaza_fkey" FOREIGN KEY ("idRaza") REFERENCES "raza" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "adopcion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fechaCreada" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idAdoptante" INTEGER NOT NULL,
    "idMascota" INTEGER NOT NULL,
    "idRefugio" INTEGER NOT NULL,
    "idEstadoAdopcion" INTEGER NOT NULL,
    CONSTRAINT "adopcion_idAdoptante_fkey" FOREIGN KEY ("idAdoptante") REFERENCES "adoptante" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "adopcion_idMascota_fkey" FOREIGN KEY ("idMascota") REFERENCES "mascota" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "adopcion_idRefugio_fkey" FOREIGN KEY ("idRefugio") REFERENCES "refugio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "adopcion_idEstadoAdopcion_fkey" FOREIGN KEY ("idEstadoAdopcion") REFERENCES "estadoAdopcion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "estadoReporte" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "estado" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "reporte" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descripcion" TEXT NOT NULL,
    "fechaCreada" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idReportador" INTEGER,
    "idReportado" INTEGER,
    "idMascota" INTEGER,
    "idMunicipio" INTEGER NOT NULL,
    "imagen" TEXT,
    "nombre" TEXT,
    "correo" TEXT,
    "estadoReporteId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "reporte_idReportador_fkey" FOREIGN KEY ("idReportador") REFERENCES "adoptante" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "reporte_idReportado_fkey" FOREIGN KEY ("idReportado") REFERENCES "adoptante" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "reporte_idMascota_fkey" FOREIGN KEY ("idMascota") REFERENCES "mascota" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "reporte_idMunicipio_fkey" FOREIGN KEY ("idMunicipio") REFERENCES "municipio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "reporte_estadoReporteId_fkey" FOREIGN KEY ("estadoReporteId") REFERENCES "estadoReporte" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "especie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "especie" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "raza" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "raza" TEXT NOT NULL,
    "idEspecie" INTEGER,
    CONSTRAINT "raza_idEspecie_fkey" FOREIGN KEY ("idEspecie") REFERENCES "especie" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "espacios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "espacioTotal" INTEGER NOT NULL,
    "espacioDisponible" INTEGER NOT NULL,
    "idEspecie" INTEGER NOT NULL,
    "idRefugio" INTEGER NOT NULL,
    CONSTRAINT "espacios_idEspecie_fkey" FOREIGN KEY ("idEspecie") REFERENCES "especie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "espacios_idRefugio_fkey" FOREIGN KEY ("idRefugio") REFERENCES "refugio" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "estadoAdopcion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "estadoAdopcion" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tamano" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tamano" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "adoptante_correo_key" ON "adoptante"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "empleado_correo_key" ON "empleado"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "adopcion_idMascota_key" ON "adopcion"("idMascota");
