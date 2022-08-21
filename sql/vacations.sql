-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `current_deals`
--

DROP TABLE IF EXISTS `current_deals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `current_deals` (
  `vacation_id` bigint NOT NULL AUTO_INCREMENT,
  `image` varchar(500) NOT NULL,
  `location` varchar(45) NOT NULL,
  `description` varchar(500) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`vacation_id`),
  UNIQUE KEY `_UNIQUE` (`vacation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `current_deals`
--

LOCK TABLES `current_deals` WRITE;
/*!40000 ALTER TABLE `current_deals` DISABLE KEYS */;
INSERT INTO `current_deals` VALUES (10,'https://wallpapercave.com/wp/wp4201149.jpg','Bariloche , Argentina','Come to GreeceLocated in Argentina\'s Río Negro province, Bariloche is a city surrounded by thousand-year-old forests, mountains covered in snow and crystal clear lakes. It\'s quintessentially Patagonian. A city that is home to excellence and surrounded by some of the country\'s most beautiful natural spots.','2021-08-23','2021-08-30',4000),(11,'https://deih43ym53wif.cloudfront.net/santorini-greece-picturesq-view-traditional-cycladic-houses-shutterstock_1040803156_c93c4510dc.jpeg','Greece ,Santorini','Santorini is the most popular Greek destination and a worldwide famous island! Once you set your foot in Santorini, you’ll feel like entering a whole new world.','2021-08-08','2021-08-10',800),(13,'https://wallpapertag.com/wallpaper/full/1/d/7/508800-backgrounds-for-computer-screen-1920x1080-for-tablet.jpg','Isla Mujeres , Mexico','You\'re going to fall in love with Isla Mujeres a place where time passes slowly and your dream vacation becomes a reality.','2021-08-24','2021-08-30',4000),(15,'https://coolwallpapers.me/picsup/3333736-canal-sunrise-amsterdam-netherlands.jpg','Paris , France','Paris offers something for everyone. It boasts rich culture and art, both in museums and galleries as well as on streets and in theatres. Get captivated by rich palaces and romantic gardens. Explore the wide avenues and narrow cobbled streets where a new gem waits for travellers around every corner. While sightseeing, don’t forget to enjoy life or, as the French would say: Joie de vivre.','2021-08-08','2021-08-10',1233),(19,'https://www.puntacaracol.com.pa/wp-content/uploads/2019/08/DJI_0070-2.jpg','Bocas , Panama','Come and enjoy from the tropic panama.','2021-08-21','2021-08-24',1200),(21,'https://steemitimages.com/DQmQx64gw5vmQUT31g3VgoacbxWegyyXy2nG7y49unb53SU/rio_de_janeiro-christo_redentor-1500x850.jpg','Rio de janeiro , Brazil','io de Janeiro\'s setting between the mountains and the sea is so spectacular that UNESCO cited \"the staggeringly beautiful location for one of the world\'s biggest cities\" in naming Rio a World Heritage Site. UNESCO\'s accolades weren\'t just for the natural setting but also for the urban cultural landscape and the mix of architecture and planned green space that characterized the city\'s growth.','2021-08-23','2021-08-31',3800),(22,'https://img2.goodfon.ru/original/1920x1080/f/ec/amsterdam-amsterdam-nederland.jpg','Amsterdam , Netherlands','Amsterdam is one of the greatest small cities in the world. From Amsterdam canals to world-famous Amsterdam museums and historical Amsterdam sights, it is one of the most romantic and beautiful cities in Europe. Canal cruises are a popular way to see the city from the perspective of its canals.','2021-08-22','2021-08-31',1200);
/*!40000 ALTER TABLE `current_deals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `user_id` varchar(500) NOT NULL,
  `vacation_id` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`,`vacation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES ('15','10'),('15','11'),('15','12'),('15','15'),('15','21'),('15','22'),('15','9'),('19','11'),('19','12'),('19','13'),('19','15'),('25','15'),('25','19'),('26','12'),('26','15');
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `user_type` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'bar','ja','admin','ja@gmail.com','01963a652a30d6e53b6ce14000d9c648','ADMIN'),(15,'user','cohen','user555','user@gmail.com','bed4844dd35362b23473cfbb40448861','USER'),(17,'tal','james','tal','tal@gmail.com','766342084f4872910acc23a16dcf14c1','USER'),(18,'stav','harari','stav1','stav@gmail.com','766342084f4872910acc23a16dcf14c1','USER'),(19,'user','dude','user666','user2@gmail.com','a50ca7a7e61e5d2408b6d6575e6a512d','USER'),(20,'bar','james','jaja','barjames@gmail.com','766342084f4872910acc23a16dcf14c1','USER'),(21,'bar','jam','talr','hello@gmail.com','766342084f4872910acc23a16dcf14c1','USER'),(22,'bar','ja','tal1','barjames@gmail.com','766342084f4872910acc23a16dcf14c1','USER'),(23,'as','as','as','user@gmail.com','766342084f4872910acc23a16dcf14c1','USER'),(24,'user','user','user7777','777@gmail.com','689484aa27252ddd61bada3dfb688001','USER'),(25,'omri','yaacobi','omri1','omri@gmail.com','766342084f4872910acc23a16dcf14c1','USER'),(26,'itay','portal','itaychuk','itay@gmail.com','766342084f4872910acc23a16dcf14c1','USER'),(27,'yosi','mosi','yosi1','yosi@gmail.com','766342084f4872910acc23a16dcf14c1','USER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-24 22:47:29
