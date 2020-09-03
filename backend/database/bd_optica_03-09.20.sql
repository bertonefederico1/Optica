/* CREATE DATABASE  IF NOT EXISTS `optica` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `optica`;
-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: optica
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `acabado_lente`
--

DROP TABLE IF EXISTS `acabado_lente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `acabado_lente` (
  `idAcabadoLente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idAcabadoLente`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acabado_lente`
--

LOCK TABLES `acabado_lente` WRITE;
/*!40000 ALTER TABLE `acabado_lente` DISABLE KEYS */;
INSERT INTO `acabado_lente` VALUES (1,'Blanco','No posee ningún tratamiento adicional'),(2,'Antirayas','Antirayas'),(3,'Antirreflejos','Antirreflejos'),(4,'Filtro luz azul','Protege la visión de la luz');
/*!40000 ALTER TABLE `acabado_lente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anteojo_receta`
--

DROP TABLE IF EXISTS `anteojo_receta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `anteojo_receta` (
  `numAnteojo` int(11) NOT NULL AUTO_INCREMENT,
  `numReceta` int(11) NOT NULL,
  `numPedido` int(11) DEFAULT NULL,
  `codLenteOI` int(11) DEFAULT NULL,
  `codLenteOD` int(11) DEFAULT NULL,
  `codArmazon` int(11) NOT NULL,
  `idObraSocial` int(11) NOT NULL,
  `fechaPrometido` timestamp NOT NULL,
  `fechaEntrega` timestamp NULL DEFAULT NULL,
  `estadoAnteojo` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abonoSeña` tinyint(4) NOT NULL,
  `abonoSaldo` tinyint(4) NOT NULL,
  `montoTotal` decimal(10,2) NOT NULL,
  `montoSeña` decimal(10,2) DEFAULT NULL,
  `valorAltura` int(11) NOT NULL,
  `utilidadAnteojo` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `esFacObraSocial` tinyint(4) NOT NULL,
  PRIMARY KEY (`numAnteojo`),
  KEY `AnteojoReceta_Receta_idx` (`numReceta`),
  KEY `AnteojoReceta_Pedido_idx` (`numPedido`),
  KEY `AnteojoReceta_LenteOI_idx` (`codLenteOI`),
  KEY `AnteojoReceta_LenteOD_idx` (`codLenteOD`),
  KEY `AnteojoReceta_Armazon_idx` (`codArmazon`),
  KEY `AnteojoReceta_ObraSocial_idx` (`idObraSocial`),
  CONSTRAINT `AnteojoReceta_Armazon` FOREIGN KEY (`codArmazon`) REFERENCES `armazon` (`codArmazon`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `AnteojoReceta_LenteOD` FOREIGN KEY (`codLenteOD`) REFERENCES `lente` (`codLente`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `AnteojoReceta_LenteOI` FOREIGN KEY (`codLenteOI`) REFERENCES `lente` (`codLente`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `AnteojoReceta_ObraSocial` FOREIGN KEY (`idObraSocial`) REFERENCES `obra_social` (`idObraSocial`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `AnteojoReceta_Pedido` FOREIGN KEY (`numPedido`) REFERENCES `pedido` (`numPedido`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `AnteojoReceta_Receta` FOREIGN KEY (`numReceta`) REFERENCES `receta` (`numReceta`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anteojo_receta`
--

LOCK TABLES `anteojo_receta` WRITE;
/*!40000 ALTER TABLE `anteojo_receta` DISABLE KEYS */;
/*!40000 ALTER TABLE `anteojo_receta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `armazon`
--

DROP TABLE IF EXISTS `armazon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `armazon` (
  `codArmazon` int(11) NOT NULL AUTO_INCREMENT,
  `idMaterialArmazon` int(11) NOT NULL,
  `idDisenoArmazon` int(11) NOT NULL,
  `idUtilidadArmazon` int(11) NOT NULL,
  `idProvLab` int(11) NOT NULL,
  `modelo` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `marca` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cantidad` int(11) NOT NULL,
  `activo` tinyint(4) NOT NULL,
  PRIMARY KEY (`codArmazon`),
  KEY `Armazon_MaterialArmazon_idx` (`idMaterialArmazon`),
  KEY `Armazon_DiseñoArmazon_idx` (`idDisenoArmazon`),
  KEY `Armazon_UtilidadArmazon_idx` (`idUtilidadArmazon`),
  KEY `Armazon_ProveedorLaboratorio_idx` (`idProvLab`),
  CONSTRAINT `Armazon_DisenoArmazon` FOREIGN KEY (`idDisenoArmazon`) REFERENCES `diseno_armazon` (`idDisenoArmazon`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Armazon_MaterialArmazon` FOREIGN KEY (`idMaterialArmazon`) REFERENCES `material_armazon` (`idMaterialArmazon`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Armazon_ProveedorLaboratorio` FOREIGN KEY (`idProvLab`) REFERENCES `proveedor_laboratorio` (`idProvLab`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Armazon_UtilidadArmazon` FOREIGN KEY (`idUtilidadArmazon`) REFERENCES `utilidad_armazon` (`idUtilidadArmazon`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `armazon`
--

LOCK TABLES `armazon` WRITE;
/*!40000 ALTER TABLE `armazon` DISABLE KEYS */;
INSERT INTO `armazon` VALUES (1,1,2,1,1,'Oak Mujer RW','Oakley','Rosa',2,1),(2,2,1,2,2,'Aviator lectura','RayBan','Negro',1,1),(3,1,3,3,3,'PumpColor','Rusty','Multicolor',7,1),(4,1,2,3,2,'Rusty Clásico','Rusty','Gris',3,1);
/*!40000 ALTER TABLE `armazon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cliente` (
  `idCliente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `domicilio` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activo` tinyint(4) NOT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Juan','Perez','420000','juansito@gmail.com','Rivadavia 111',1),(19,'David','Correa','425682','david@hotmail.com','Alberdi 2222',1),(20,'Carlos','Murrieta','423454','carlos@arnet.com.ar','San Juan 3333',1),(93,'asda','asdasd','21312','sadas@asds','asdas',0);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente_obra_social`
--

DROP TABLE IF EXISTS `cliente_obra_social`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cliente_obra_social` (
  `idCliente_ObraSocial` int(11) NOT NULL AUTO_INCREMENT,
  `idCliente` int(11) NOT NULL,
  `idObraSocial` int(11) NOT NULL,
  `nroSocio` int(11) NOT NULL,
  PRIMARY KEY (`idCliente_ObraSocial`),
  KEY `clienteObraSocial_Cliente_idx` (`idCliente`),
  KEY `clienteObraSocial_ObraSocial_idx` (`idObraSocial`),
  CONSTRAINT `clienteObraSocial_Cliente` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `clienteObraSocial_ObraSocial` FOREIGN KEY (`idObraSocial`) REFERENCES `obra_social` (`idObraSocial`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente_obra_social`
--

LOCK TABLES `cliente_obra_social` WRITE;
/*!40000 ALTER TABLE `cliente_obra_social` DISABLE KEYS */;
INSERT INTO `cliente_obra_social` VALUES (3,19,3,2536),(4,20,3,2222),(5,19,1,1569),(65,1,1,6525),(68,93,2,5);
/*!40000 ALTER TABLE `cliente_obra_social` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diseno_armazon`
--

DROP TABLE IF EXISTS `diseno_armazon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `diseno_armazon` (
  `idDisenoArmazon` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idDisenoArmazon`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diseno_armazon`
--

LOCK TABLES `diseno_armazon` WRITE;
/*!40000 ALTER TABLE `diseno_armazon` DISABLE KEYS */;
INSERT INTO `diseno_armazon` VALUES (1,'Hombre','Hombre'),(2,'Dama','Dama'),(3,'Niño','Niño');
/*!40000 ALTER TABLE `diseno_armazon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diseño_lente`
--

DROP TABLE IF EXISTS `diseño_lente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `diseño_lente` (
  `idDiseñoLente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idDiseñoLente`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diseño_lente`
--

LOCK TABLES `diseño_lente` WRITE;
/*!40000 ALTER TABLE `diseño_lente` DISABLE KEYS */;
INSERT INTO `diseño_lente` VALUES (1,'Monofocal','Diseño fino para un menor peso'),(2,'Bifocal','Bifocal'),(3,'Multifocal','Multifocal');
/*!40000 ALTER TABLE `diseño_lente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lente`
--

DROP TABLE IF EXISTS `lente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `lente` (
  `codLente` int(11) NOT NULL AUTO_INCREMENT,
  `idProvLab` int(11) NOT NULL,
  `idDiseñoLente` int(11) NOT NULL,
  `idMaterialLente` int(11) NOT NULL,
  `idAcabadoLente` int(11) NOT NULL,
  `valorEsf` double NOT NULL,
  `valorCil` double NOT NULL,
  `indiceRefraccion` double NOT NULL,
  `eje` int(11) NOT NULL,
  `diametro` int(11) NOT NULL,
  `color` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `deStock` tinyint(4) NOT NULL,
  `activo` tinyint(4) NOT NULL,
  PRIMARY KEY (`codLente`),
  KEY `Lente_DiseñoLente_idx` (`idDiseñoLente`),
  KEY `Lente_MaterialLente_idx` (`idMaterialLente`),
  KEY `Lente_AcabadoLente_idx` (`idAcabadoLente`),
  KEY `Lente_ProvLab_idx` (`idProvLab`),
  CONSTRAINT `Lente_AcabadoLente` FOREIGN KEY (`idAcabadoLente`) REFERENCES `acabado_lente` (`idAcabadoLente`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Lente_DiseñoLente` FOREIGN KEY (`idDiseñoLente`) REFERENCES `diseño_lente` (`idDiseñoLente`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Lente_MaterialLente` FOREIGN KEY (`idMaterialLente`) REFERENCES `material_lente` (`idMaterialLente`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Lente_ProvLab` FOREIGN KEY (`idProvLab`) REFERENCES `proveedor_laboratorio` (`idProvLab`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lente`
--

LOCK TABLES `lente` WRITE;
/*!40000 ALTER TABLE `lente` DISABLE KEYS */;
INSERT INTO `lente` VALUES (1,1,1,1,2,0.5,0,1.5,90,70,'Blanco',1,1,1),(2,2,1,1,1,-2,0,1.6,120,85,'Blanco',5,1,1),(3,3,1,3,1,0,-0.25,1.5,120,75,'Blanco',0,1,1),(4,3,1,2,1,0,-2,1.74,170,80,'Blanco',2,1,1),(5,2,1,2,2,1,0,1.6,120,80,'Blanco',10,1,1),(6,1,2,1,3,0.5,-0.25,1.74,90,75,'Blanco',1,0,1),(7,2,3,1,2,2.5,-2,1.6,130,80,'Blanco',1,0,1);
/*!40000 ALTER TABLE `lente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material_armazon`
--

DROP TABLE IF EXISTS `material_armazon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `material_armazon` (
  `idMaterialArmazon` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idMaterialArmazon`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_armazon`
--

LOCK TABLES `material_armazon` WRITE;
/*!40000 ALTER TABLE `material_armazon` DISABLE KEYS */;
INSERT INTO `material_armazon` VALUES (1,'Pasta','Pasta'),(2,'Metal','Metal (Económico)'),(3,'Metal','Metal (Reforzado)');
/*!40000 ALTER TABLE `material_armazon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material_lente`
--

DROP TABLE IF EXISTS `material_lente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `material_lente` (
  `idMaterialLente` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idMaterialLente`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_lente`
--

LOCK TABLES `material_lente` WRITE;
/*!40000 ALTER TABLE `material_lente` DISABLE KEYS */;
INSERT INTO `material_lente` VALUES (1,'Orgánico','Resistente a golpes'),(2,'Mineral','Espesor 2mm'),(3,'Policarbonato','Policarbonato');
/*!40000 ALTER TABLE `material_lente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obra_social`
--

DROP TABLE IF EXISTS `obra_social`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `obra_social` (
  `idObraSocial` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `periodoFacMeses` int(11) NOT NULL,
  `cantFacPeriodo` int(11) NOT NULL,
  `activo` tinyint(4) NOT NULL,
  PRIMARY KEY (`idObraSocial`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obra_social`
--

LOCK TABLES `obra_social` WRITE;
/*!40000 ALTER TABLE `obra_social` DISABLE KEYS */;
INSERT INTO `obra_social` VALUES (1,'Osde',12,2,1),(2,'Iapos',12,5,1),(3,'Swiss Medical',6,1,1);
/*!40000 ALTER TABLE `obra_social` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pedido` (
  `numPedido` int(11) NOT NULL AUTO_INCREMENT,
  `codLenteOI` int(11) DEFAULT NULL,
  `codLenteOD` int(11) DEFAULT NULL,
  `idProvLab` int(11) NOT NULL,
  `fechaPedido` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estadoPedido` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fechaRecibido` timestamp NULL DEFAULT NULL,
  `fechaEntregaEsperada` timestamp NOT NULL,
  `obsPedido` text COLLATE utf8mb4_unicode_ci,
  `pedirLenteOI` tinyint(4) NOT NULL,
  `pedirLenteOD` tinyint(4) NOT NULL,
  PRIMARY KEY (`numPedido`),
  KEY `Pedido_LenteOI_idx` (`codLenteOI`),
  KEY `Pedido_LenteOD_idx` (`codLenteOD`),
  KEY `Pedido_ProvLab_idx` (`idProvLab`),
  CONSTRAINT `Pedido_LenteOD` FOREIGN KEY (`codLenteOD`) REFERENCES `lente` (`codLente`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Pedido_LenteOI` FOREIGN KEY (`codLenteOI`) REFERENCES `lente` (`codLente`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Pedido_ProvLab` FOREIGN KEY (`idProvLab`) REFERENCES `proveedor_laboratorio` (`idProvLab`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor_laboratorio`
--

DROP TABLE IF EXISTS `proveedor_laboratorio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `proveedor_laboratorio` (
  `idProvLab` int(11) NOT NULL AUTO_INCREMENT,
  `razonSocial` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombreFantasia` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `domicilio` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activo` tinyint(4) NOT NULL,
  PRIMARY KEY (`idProvLab`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor_laboratorio`
--

LOCK TABLES `proveedor_laboratorio` WRITE;
/*!40000 ALTER TABLE `proveedor_laboratorio` DISABLE KEYS */;
INSERT INTO `proveedor_laboratorio` VALUES (1,'Vlux S.A','Varilux','Belgrano 1252, Neuquén, Neuquén','2996254168','info@varilux.com',1),(2,'Laboratorio Casa S.A.','LabHouse','Av. Santa Fe 555, CABA','1144558741','labhouse@lhouse.com.ar',1),(3,'R y F asociados S.A.','Laboratorio R&F','Mendoza 2000, CABA','1162365985','labRF@gmail.com',1);
/*!40000 ALTER TABLE `proveedor_laboratorio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receta`
--

DROP TABLE IF EXISTS `receta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `receta` (
  `numReceta` int(11) NOT NULL AUTO_INCREMENT,
  `idCliente` int(11) NOT NULL,
  `fechaReceta` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `nombreMedico` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `obsReceta` text COLLATE utf8mb4_unicode_ci,
  `valorEsfOD` double NOT NULL,
  `valorCilOD` double NOT NULL,
  `ejeOD` int(11) NOT NULL,
  `valorEsfOI` double NOT NULL,
  `valorCilOI` double NOT NULL,
  `ejeOI` int(11) NOT NULL,
  `valorDIPLejos` double NOT NULL,
  `valorDIPCerca` double NOT NULL,
  `valorADD` double NOT NULL,
  PRIMARY KEY (`numReceta`),
  KEY `Receta_Cliente_idx` (`idCliente`),
  CONSTRAINT `Receta_Cliente` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receta`
--

LOCK TABLES `receta` WRITE;
/*!40000 ALTER TABLE `receta` DISABLE KEYS */;
/*!40000 ALTER TABLE `receta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contraseña` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rol` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilidad_armazon`
--

DROP TABLE IF EXISTS `utilidad_armazon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `utilidad_armazon` (
  `idUtilidadArmazon` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idUtilidadArmazon`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilidad_armazon`
--

LOCK TABLES `utilidad_armazon` WRITE;
/*!40000 ALTER TABLE `utilidad_armazon` DISABLE KEYS */;
INSERT INTO `utilidad_armazon` VALUES (1,'Lejos','Lejos'),(2,'Cerca','Cerca'),(3,'Ambos','Ambos');
/*!40000 ALTER TABLE `utilidad_armazon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'optica'
--

--
-- Dumping routines for database 'optica'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-03 19:09:37
 */