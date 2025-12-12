-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: interchange.proxy.rlwy.net    Database: railway
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aperturas`
--

DROP TABLE IF EXISTS `aperturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aperturas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `monto` decimal(11,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `avales`
--

DROP TABLE IF EXISTS `avales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avales` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `cliente` smallint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cliente` (`cliente`) USING BTREE,
  CONSTRAINT `fk_clienteenaval` FOREIGN KEY (`cliente`) REFERENCES `clientes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `avalestienda`
--

DROP TABLE IF EXISTS `avalestienda`;
/*!50001 DROP VIEW IF EXISTS `avalestienda`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `avalestienda` AS SELECT 
 1 AS `id`,
 1 AS `cliente`,
 1 AS `nombreCompleto`,
 1 AS `nombres`,
 1 AS `apellidos`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `persona` smallint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `persona` (`persona`),
  CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`persona`) REFERENCES `persona` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trigger_crear` AFTER INSERT ON `clientes` FOR EACH ROW BEGIN 

	insert into avales values(null, NEW.id); 

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `clientestienda`
--

DROP TABLE IF EXISTS `clientestienda`;
/*!50001 DROP VIEW IF EXISTS `clientestienda`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `clientestienda` AS SELECT 
 1 AS `idCliente`,
 1 AS `id`,
 1 AS `nombres`,
 1 AS `apellidos`,
 1 AS `nombreCompleto`,
 1 AS `dni`,
 1 AS `direccion`,
 1 AS `departamento`,
 1 AS `municipio`,
 1 AS `barrio`,
 1 AS `lugarTrabajo`,
 1 AS `telefono`,
 1 AS `foto`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `creditos`
--

DROP TABLE IF EXISTS `creditos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `creditos` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `fecha` date DEFAULT NULL,
  `cliente` smallint unsigned DEFAULT NULL,
  `aval` smallint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `aval` (`aval`) USING BTREE,
  KEY `cliente` (`cliente`) USING BTREE,
  CONSTRAINT `creditos_ibfk_1` FOREIGN KEY (`aval`) REFERENCES `avales` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `creditos_ibfk_2` FOREIGN KEY (`cliente`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `creditostienda`
--

DROP TABLE IF EXISTS `creditostienda`;
/*!50001 DROP VIEW IF EXISTS `creditostienda`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `creditostienda` AS SELECT 
 1 AS `cliente`,
 1 AS `aval`,
 1 AS `numeroFactura`,
 1 AS `fechaEmisionFactura`,
 1 AS `numeroCredito`,
 1 AS `fechaCreacionCredito`,
 1 AS `total`,
 1 AS `clientefullname`,
 1 AS `pagos`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `detalles`
--

DROP TABLE IF EXISTS `detalles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `factura` bigint unsigned NOT NULL,
  `producto` mediumint unsigned DEFAULT NULL,
  `precio` decimal(11,2) DEFAULT NULL,
  `cantidad` decimal(11,2) unsigned DEFAULT NULL,
  `importe` decimal(11,2) DEFAULT NULL,
  `precioVenta` decimal(11,2) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `factura` (`factura`) USING BTREE,
  KEY `producto` (`producto`) USING BTREE,
  CONSTRAINT `detalles_ibfk_1` FOREIGN KEY (`factura`) REFERENCES `facturas` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `detalles_ibfk_3` FOREIGN KEY (`producto`) REFERENCES `productos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `id` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `persona` smallint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `persona` (`persona`),
  CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`persona`) REFERENCES `persona` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `empleadostienda`
--

DROP TABLE IF EXISTS `empleadostienda`;
/*!50001 DROP VIEW IF EXISTS `empleadostienda`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `empleadostienda` AS SELECT 
 1 AS `id`,
 1 AS `nombres`,
 1 AS `apellidos`,
 1 AS `dni`,
 1 AS `direccion`,
 1 AS `departamento`,
 1 AS `municipio`,
 1 AS `barrio`,
 1 AS `lugarTrabajo`,
 1 AS `telefono`,
 1 AS `foto`,
 1 AS `idempleado`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `facturas`
--

DROP TABLE IF EXISTS `facturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facturas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `empleado` tinyint unsigned DEFAULT NULL,
  `credito` smallint unsigned DEFAULT NULL,
  `comprador` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `empleado` (`empleado`) USING BTREE,
  KEY `credito` (`credito`) USING BTREE,
  CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`empleado`) REFERENCES `empleados` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `facturas_ibfk_2` FOREIGN KEY (`credito`) REFERENCES `creditos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `facturastienda`
--

DROP TABLE IF EXISTS `facturastienda`;
/*!50001 DROP VIEW IF EXISTS `facturastienda`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `facturastienda` AS SELECT 
 1 AS `id`,
 1 AS `fecha`,
 1 AS `f`,
 1 AS `empleadoid`,
 1 AS `creditoid`,
 1 AS `comprador`,
 1 AS `clienteid`,
 1 AS `avalid`,
 1 AS `total`,
 1 AS `empleadofullname`,
 1 AS `clientefullname`,
 1 AS `avalfullname`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `formaspago`
--

DROP TABLE IF EXISTS `formaspago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formaspago` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'llave primaria',
  `nombre` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL COMMENT 'nombre de la forma de pago',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `inventariotienda`
--

DROP TABLE IF EXISTS `inventariotienda`;
/*!50001 DROP VIEW IF EXISTS `inventariotienda`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `inventariotienda` AS SELECT 
 1 AS `id`,
 1 AS `codigoBarra`,
 1 AS `descripcion`,
 1 AS `precioCosto`,
 1 AS `precioVenta`,
 1 AS `stock`,
 1 AS `idmarca`,
 1 AS `marca`,
 1 AS `estado`,
 1 AS `modelo`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `kardex`
--

DROP TABLE IF EXISTS `kardex`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kardex` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `producto` mediumint unsigned NOT NULL,
  `fecha` datetime NOT NULL,
  `tipoMovimiento` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `cantidad` decimal(11,2) NOT NULL,
  `empleado` tinyint unsigned NOT NULL,
  `nota` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `producto` (`producto`),
  KEY `empleado` (`empleado`),
  CONSTRAINT `kardex_ibfk_1` FOREIGN KEY (`producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `kardex_ibfk_2` FOREIGN KEY (`empleado`) REFERENCES `empleados` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marca` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `monto` decimal(11,2) DEFAULT NULL,
  `credito` smallint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `credito` (`credito`) USING BTREE,
  CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`credito`) REFERENCES `creditos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `pagos_BEFORE_INSERT` BEFORE INSERT ON `pagos` FOR EACH ROW BEGIN
	DECLARE total_credito decimal(11,2);
    DECLARE pagos decimal(11,2);
	DECLARE saldos decimal(11,2);
    
    select sum(monto) into pagos from pagos where credito = NEW.credito;
    select total into total_credito from facturastienda where creditoid = NEW.credito;
	set saldos = (total_credito - (pagos + new.monto));
     
	if saldos < 0 then
		signal SQLSTATE '45000' set MESSAGE_TEXT = 'El monto es mayor al saldo.';
    end if;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `pagospedidos`
--

DROP TABLE IF EXISTS `pagospedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagospedidos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `pedido` int unsigned DEFAULT NULL,
  `fecha` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `monto` decimal(11,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pedido` (`pedido`) USING BTREE,
  CONSTRAINT `pagospedidos_pedidos_FK` FOREIGN KEY (`pedido`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `crearPagoPedido_trigger` BEFORE INSERT ON `pagospedidos` FOR EACH ROW BEGIN

    -- Declaración de variables locales para almacenar totales y saldo

    DECLARE totalPedido DECIMAL(10, 2);

    DECLARE totalPagado DECIMAL(10, 2);

    DECLARE saldoPendiente DECIMAL(10, 2);

    DECLARE p DECIMAL(10, 2);



    -- Calcula el total pagado hasta ahora para el pedido actual

    SELECT IFNULL(SUM(monto), 0) INTO totalPagado FROM pagospedidos WHERE pedido = NEW.pedido;



    -- Obtiene el total del pedido desde la tabla pedidos

    SELECT total INTO totalPedido FROM pedidostienda WHERE id = NEW.pedido;



    -- Calcula el saldo pendiente restando lo pagado al total del pedido

    SET saldoPendiente = totalPedido - totalPagado;



    -- Calcula cuánto quedaría pendiente después del nuevo pago

    SET p = saldoPendiente - NEW.monto;



    -- Lógica de control de pago

    IF p < 0 THEN

        SIGNAL SQLSTATE '45000'

        SET MESSAGE_TEXT = 'El monto del pago no puede ser mayor al saldo pendiente del pedido.';

    ELSEIF p = 0 THEN

        UPDATE pedidos SET estado = 'Cancelado' WHERE id = NEW.pedido;

    END IF;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `pagospedidos_AFTER_DELETE` AFTER DELETE ON `pagospedidos` FOR EACH ROW BEGIN
-- Declaración de variables locales para almacenar totales y saldo
    DECLARE totalPedido DECIMAL(10, 2);
    DECLARE totalPagado DECIMAL(10, 2);
    DECLARE saldoPendiente DECIMAL(10, 2);
    DECLARE p DECIMAL(10, 2);

    -- Calcula el total pagado hasta ahora para el pedido actual
    SELECT IFNULL(SUM(monto), 0) INTO totalPagado FROM pagospedidos WHERE pedido = OLD.pedido;

    -- Obtiene el total del pedido desde la tabla pedidos
    SELECT total INTO totalPedido FROM pedidostienda WHERE id = OLD.pedido;

    -- Calcula el saldo pendiente restando lo pagado al total del pedido
    SET saldoPendiente = totalPedido - totalPagado;

    -- Lógica de control de pago
    IF saldoPendiente > 0 THEN
        UPDATE pedidos SET estado = 'Pendiente' WHERE id = OLD.pedido;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `pagostienda`
--

DROP TABLE IF EXISTS `pagostienda`;
/*!50001 DROP VIEW IF EXISTS `pagostienda`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `pagostienda` AS SELECT 
 1 AS `id`,
 1 AS `fecha`,
 1 AS `f`,
 1 AS `monto`,
 1 AS `credito`,
 1 AS `cliente`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `proveedor` tinyint unsigned DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `estado` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `proveedor` (`proveedor`) USING BTREE,
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`proveedor`) REFERENCES `proveedores` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `pedidostienda`
--

DROP TABLE IF EXISTS `pedidostienda`;
/*!50001 DROP VIEW IF EXISTS `pedidostienda`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `pedidostienda` AS SELECT 
 1 AS `id`,
 1 AS `fecha`,
 1 AS `estado`,
 1 AS `nombreProveedor`,
 1 AS `idProveedor`,
 1 AS `total`,
 1 AS `pagado`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `nombres` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `apellidos` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `dni` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `direccion` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `departamento` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `municipio` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `barrio` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `lugarTrabajo` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `telefono` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `foto` varchar(120) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `productoproveedor`
--

DROP TABLE IF EXISTS `productoproveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productoproveedor` (
  `pedido` int unsigned NOT NULL,
  `producto` mediumint unsigned DEFAULT NULL,
  `precio` decimal(11,2) DEFAULT NULL,
  `cantidad` decimal(11,2) unsigned DEFAULT NULL,
  `importe` decimal(11,2) DEFAULT NULL,
  KEY `producto` (`producto`) USING BTREE,
  KEY `pedido` (`pedido`) USING BTREE,
  CONSTRAINT `productoproveedor_ibfk_2` FOREIGN KEY (`producto`) REFERENCES `productos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `productoproveedor_pedidos_FK` FOREIGN KEY (`pedido`) REFERENCES `pedidos` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `modelo` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `codigoBarra` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `precioCosto` decimal(11,2) unsigned DEFAULT NULL,
  `precioVenta` decimal(11,2) unsigned NOT NULL,
  `stock` smallint unsigned NOT NULL,
  `marca` smallint unsigned DEFAULT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigoBarra_UNIQUE` (`codigoBarra`),
  KEY `marca` (`marca`) USING BTREE,
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`marca`) REFERENCES `marca` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `id` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci NOT NULL,
  `telefono` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `cuentaBancaria` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `vendedor` varchar(124) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `telefonoVendedor` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transacciones`
--

DROP TABLE IF EXISTS `transacciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transacciones` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT NULL,
  `tipo` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `monto` decimal(11,2) DEFAULT NULL,
  `anotacion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `usuario` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `password` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `empleado` tinyint unsigned DEFAULT NULL,
  `permiso` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `empleado` (`empleado`) USING BTREE,
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`empleado`) REFERENCES `empleados` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `usuariostienda`
--

DROP TABLE IF EXISTS `usuariostienda`;
/*!50001 DROP VIEW IF EXISTS `usuariostienda`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `usuariostienda` AS SELECT 
 1 AS `id`,
 1 AS `usuario`,
 1 AS `permiso`,
 1 AS `empleado`,
 1 AS `nombres`,
 1 AS `apellidos`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'railway'
--

--
-- Dumping routines for database 'railway'
--
/*!50003 DROP PROCEDURE IF EXISTS `estadoDiario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `estadoDiario`(IN fechaInicio varchar(20), IN fechaFinal varchar(20))
BEGIN
DECLARE ventasEfectivo DECIMAL(11,2);
DECLARE ventasCredito DECIMAL(11,2);
DECLARE salidas DECIMAL(11,2);
DECLARE entradas DECIMAL(11,2);
DECLARE pagos DECIMAL(11,2);

select ifnull(sum(total),0) into ventasEfectivo from facturastienda where creditoid is null and date(fecha) between fechaInicio and fechaFinal;
select ifnull(sum(total),0) into ventasCredito from facturastienda where creditoid is not null and date(fecha) between fechaInicio and fechaFinal;

select ifnull(sum(monto),0) into entradas from transacciones where tipo = 'entrada' and date(fecha) between fechaInicio and fechaFinal;
select ifnull(sum(monto),0) into salidas from transacciones where tipo = 'salida' and date(fecha) between fechaInicio and fechaFinal;
select ifnull(sum(monto),0) into pagos from pagos where date(fecha) between fechaInicio and fechaFinal;

select ventasEfectivo, ventasCredito, salidas, entradas, pagos;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `avalestienda`
--

/*!50001 DROP VIEW IF EXISTS `avalestienda`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `avalestienda` AS select `a`.`id` AS `id`,`c`.`id` AS `cliente`,concat(`p`.`nombres`,' ',`p`.`apellidos`) AS `nombreCompleto`,`p`.`nombres` AS `nombres`,`p`.`apellidos` AS `apellidos` from ((`persona` `p` join `clientes` `c` on((`p`.`id` = `c`.`persona`))) join `avales` `a` on((`a`.`cliente` = `c`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `clientestienda`
--

/*!50001 DROP VIEW IF EXISTS `clientestienda`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `clientestienda` AS select `c`.`id` AS `idCliente`,`p`.`id` AS `id`,`p`.`nombres` AS `nombres`,`p`.`apellidos` AS `apellidos`,concat(`p`.`nombres`,' ',`p`.`apellidos`) AS `nombreCompleto`,`p`.`dni` AS `dni`,`p`.`direccion` AS `direccion`,`p`.`departamento` AS `departamento`,`p`.`municipio` AS `municipio`,`p`.`barrio` AS `barrio`,`p`.`lugarTrabajo` AS `lugarTrabajo`,`p`.`telefono` AS `telefono`,`p`.`foto` AS `foto` from (`persona` `p` join `clientes` `c` on((`p`.`id` = `c`.`persona`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `creditostienda`
--

/*!50001 DROP VIEW IF EXISTS `creditostienda`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `creditostienda` AS select `c`.`cliente` AS `cliente`,concat(`a`.`nombres`,' ',`a`.`apellidos`) AS `aval`,`f`.`id` AS `numeroFactura`,`f`.`fecha` AS `fechaEmisionFactura`,`c`.`id` AS `numeroCredito`,`c`.`fecha` AS `fechaCreacionCredito`,`f`.`total` AS `total`,`f`.`clientefullname` AS `clientefullname`,ifnull(sum(`p`.`monto`),0) AS `pagos` from (((`facturastienda` `f` join `creditos` `c` on((`f`.`creditoid` = `c`.`id`))) join `avalestienda` `a` on((`c`.`aval` = `a`.`id`))) left join `pagos` `p` on((`c`.`id` = `p`.`credito`))) group by `c`.`id`,`f`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `empleadostienda`
--

/*!50001 DROP VIEW IF EXISTS `empleadostienda`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `empleadostienda` AS select `p`.`id` AS `id`,`p`.`nombres` AS `nombres`,`p`.`apellidos` AS `apellidos`,`p`.`dni` AS `dni`,`p`.`direccion` AS `direccion`,`p`.`departamento` AS `departamento`,`p`.`municipio` AS `municipio`,`p`.`barrio` AS `barrio`,`p`.`lugarTrabajo` AS `lugarTrabajo`,`p`.`telefono` AS `telefono`,`p`.`foto` AS `foto`,`e`.`id` AS `idempleado` from (`persona` `p` join `empleados` `e` on((`p`.`id` = `e`.`persona`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `facturastienda`
--

/*!50001 DROP VIEW IF EXISTS `facturastienda`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `facturastienda` AS select `f`.`id` AS `id`,`f`.`fecha` AS `fecha`,date_format(`f`.`fecha`,'%d-%m-%Y, %r') AS `f`,`f`.`empleado` AS `empleadoid`,`f`.`credito` AS `creditoid`,`f`.`comprador` AS `comprador`,`cl`.`idCliente` AS `clienteid`,`c`.`aval` AS `avalid`,(select sum(`detalles`.`importe`) from `detalles` where (`detalles`.`factura` = `f`.`id`)) AS `total`,concat(`e`.`nombres`,' ',`e`.`apellidos`) AS `empleadofullname`,`cl`.`nombreCompleto` AS `clientefullname`,concat(`a`.`nombres`,' ',`a`.`apellidos`) AS `avalfullname` from (((((`facturas` `f` join `detalles` `d` on((`f`.`id` = `d`.`factura`))) left join `creditos` `c` on((`f`.`credito` = `c`.`id`))) join `empleadostienda` `e` on((`f`.`empleado` = `e`.`idempleado`))) left join `clientestienda` `cl` on((`c`.`cliente` = `cl`.`idCliente`))) left join `avalestienda` `a` on((`c`.`aval` = `a`.`id`))) group by `f`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `inventariotienda`
--

/*!50001 DROP VIEW IF EXISTS `inventariotienda`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `inventariotienda` AS select `p`.`id` AS `id`,`p`.`codigoBarra` AS `codigoBarra`,`p`.`descripcion` AS `descripcion`,`p`.`precioCosto` AS `precioCosto`,`p`.`precioVenta` AS `precioVenta`,`p`.`stock` AS `stock`,`m`.`id` AS `idmarca`,`m`.`nombre` AS `marca`,`p`.`estado` AS `estado`,`p`.`modelo` AS `modelo` from (`productos` `p` left join `marca` `m` on((`p`.`marca` = `m`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `pagostienda`
--

/*!50001 DROP VIEW IF EXISTS `pagostienda`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `pagostienda` AS select `p`.`id` AS `id`,`p`.`fecha` AS `fecha`,date_format(`p`.`fecha`,'%d-%m-%Y, %r') AS `f`,`p`.`monto` AS `monto`,`p`.`credito` AS `credito`,`cl`.`id` AS `cliente` from ((`pagos` `p` join `creditos` `c` on((`p`.`credito` = `c`.`id`))) join `clientes` `cl` on((`c`.`cliente` = `cl`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `pedidostienda`
--

/*!50001 DROP VIEW IF EXISTS `pedidostienda`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `pedidostienda` AS with `pedidoswith` as (select `p`.`id` AS `id`,`p`.`fecha` AS `fecha`,`p`.`estado` AS `estado`,`pr`.`nombre` AS `nombreProveedor`,`pr`.`id` AS `idProveedor`,sum(`d`.`importe`) AS `total` from ((`pedidos` `p` join `proveedores` `pr` on((`pr`.`id` = `p`.`proveedor`))) join `productoproveedor` `d` on((`d`.`pedido` = `p`.`id`))) group by `p`.`id`,`p`.`fecha`,`p`.`estado`,`pr`.`nombre`,`pr`.`id`), `pagospedidoswith` as (select `pp`.`pedido` AS `pedido`,sum(`pp`.`monto`) AS `pagado` from `pagospedidos` `pp` group by `pp`.`pedido`) select `p`.`id` AS `id`,`p`.`fecha` AS `fecha`,`p`.`estado` AS `estado`,`p`.`nombreProveedor` AS `nombreProveedor`,`p`.`idProveedor` AS `idProveedor`,`p`.`total` AS `total`,`ppw`.`pagado` AS `pagado` from (`pedidoswith` `p` left join `pagospedidoswith` `ppw` on((`p`.`id` = `ppw`.`pedido`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `usuariostienda`
--

/*!50001 DROP VIEW IF EXISTS `usuariostienda`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `usuariostienda` AS select `u`.`id` AS `id`,`u`.`usuario` AS `usuario`,`u`.`permiso` AS `permiso`,`e`.`idempleado` AS `empleado`,`e`.`nombres` AS `nombres`,`e`.`apellidos` AS `apellidos` from (`usuarios` `u` join `empleadostienda` `e` on((`u`.`empleado` = `e`.`idempleado`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-12 11:49:03
