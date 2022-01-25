CREATE DATABASE  IF NOT EXISTS `nftmarketplace` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `nftmarketplace`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: nftmarketplace
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `activeusers`
--

DROP TABLE IF EXISTS `activeusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activeusers` (
  `email` varchar(45) NOT NULL,
  `refresh_token` varchar(255) NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `refresh_token_UNIQUE` (`refresh_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activeusers`
--

LOCK TABLES `activeusers` WRITE;
/*!40000 ALTER TABLE `activeusers` DISABLE KEYS */;
INSERT INTO `activeusers` VALUES ('nikhil@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibmlraGlsQGdtYWlsLmNvbSIsImlhdCI6MTY0MDAyNDU0NCwiZXhwIjoxNjQwMDI1NzQ0fQ.iPpmW9tSyJekGqE9VupHv2xbaqLmrkopClMPJL3iywg'),('tiwarin540@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGl3YXJpbjU0MEBnbWFpbC5jb20iLCJpYXQiOjE2NDAwMjQ3NDgsImV4cCI6MTY0MDAyNTk0OH0.6AQNgydA7bM1JhZN1XBZiKMu_4I7sO9BPvAkIeGlkBo');
/*!40000 ALTER TABLE `activeusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments_table`
--

DROP TABLE IF EXISTS `comments_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments_table` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `Group_id` int NOT NULL,
  `webpage_id` int NOT NULL,
  `Comment` varchar(500) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments_table`
--

LOCK TABLES `comments_table` WRITE;
/*!40000 ALTER TABLE `comments_table` DISABLE KEYS */;
INSERT INTO `comments_table` VALUES (1,4,1,'new comment from group id=4\n',1),(2,4,1,'hello 4',1),(3,4,1,'4',1),(4,1,1,'hello',1),(5,1,1,'czdvfb',3);
/*!40000 ALTER TABLE `comments_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_info`
--

DROP TABLE IF EXISTS `group_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_info` (
  `Group_id` int NOT NULL AUTO_INCREMENT,
  `Group_name` varchar(45) NOT NULL,
  `collection_name` varchar(45) NOT NULL,
  `Group_thumbnail` varchar(500) NOT NULL,
  `Group_wallpaper` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`Group_id`),
  UNIQUE KEY `Group_id_UNIQUE` (`Group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_info`
--

LOCK TABLES `group_info` WRITE;
/*!40000 ALTER TABLE `group_info` DISABLE KEYS */;
INSERT INTO `group_info` VALUES (1,'Bored Apes','BAYC','https://lh3.googleusercontent.com/YinTK0CUDPGnoE-7RPOuSlDSO8-3WyNrpkzcOXPtKRl36yuhMGoJjLfzrCyx15bh8gCYZf33SxALC_FxxnW-tNJpUIubv4CUeAcnLDQ','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbemrIAMWhnv6o-lR7o6Srtbb5lXrV0EiMNg&usqp=CAU'),(3,'Hash Mask','HM','https://lh3.googleusercontent.com/6m-4wKToLflNSyNkIRQasgiRxwUsBCMReyq2rQqEUYoOVKQ2ZzczKnLlW6ck3bkaYuFINmpQlrF7c30IIK_VQaAiP-2wbEODDH7WIVg','https://hrishioa.github.io/assets/img/Hashmasks/cover2.png'),(4,'Kryptokitties','Kryptokitty','https://cdn.vox-cdn.com/thumbor/_rw6XhJ3hVZ7_ThnekECYB0qhFo=/0x0:1252x974/1200x800/filters:focal(526x387:726x587)/cdn.vox-cdn.com/uploads/chorus_image/image/68904499/Screen_Shot_2021_03_02_at_3.21.50_PM.0.png','https://i.pinimg.com/originals/74/eb/1f/74eb1f1d460d5420931e8ed63325c895.jpg');
/*!40000 ALTER TABLE `group_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hapebeast`
--

DROP TABLE IF EXISTS `hapebeast`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hapebeast` (
  `idhapebeast` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `info` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`idhapebeast`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hapebeast`
--

LOCK TABLES `hapebeast` WRITE;
/*!40000 ALTER TABLE `hapebeast` DISABLE KEYS */;
/*!40000 ALTER TABLE `hapebeast` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `Img_id` int NOT NULL AUTO_INCREMENT,
  `Group_id` int NOT NULL,
  `user_id` int NOT NULL,
  `Webpage_id` int NOT NULL,
  `Image_link` varchar(255) DEFAULT NULL,
  `dns_protocol_1` varchar(255) DEFAULT NULL,
  `dns_protocol_2` varchar(255) DEFAULT NULL,
  `dns_protocol_3` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Img_id`),
  UNIQUE KEY `Img_id_UNIQUE` (`Img_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lazymintednfts`
--

DROP TABLE IF EXISTS `lazymintednfts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lazymintednfts` (
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `blockchain` varchar(45) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `collectionName` varchar(255) DEFAULT NULL,
  `hash` varchar(400) DEFAULT NULL,
  `public_key` varchar(255) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `primary_sale_done` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lazymintednfts`
--

LOCK TABLES `lazymintednfts` WRITE;
/*!40000 ALTER TABLE `lazymintednfts` DISABLE KEYS */;
INSERT INTO `lazymintednfts` VALUES ('Hemisphere','sjabd','1.2','Solana','upload/hemispe.png-1642950052591.png','kjasd','794a792cca4efc5eea423d68ead9cd6fe9d599cc2b4d1ac4ac2e6142d042ad1d','2r4tiqH4Gwo8ESsnDkYRVs81qqbqp9UUYn1tr1EWqxao',1,0,NULL),('fjdv','jfd','1.2','Solana','upload/venturi_graph.png-1642951726900.png','jsakdh','5f9f5f5495c06a79069f7784113eb28083446586c621f7132edcbf19dae202a9','8yRhm6Tm21UZgj1hsKxJCfuPG2yahQzkSRNXgzxbiiSU',2,0,20);
/*!40000 ALTER TABLE `lazymintednfts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes_counter`
--

DROP TABLE IF EXISTS `likes_counter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes_counter` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `No_of_likes` int NOT NULL DEFAULT '0',
  UNIQUE KEY `Group_id_UNIQUE` (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes_counter`
--

LOCK TABLES `likes_counter` WRITE;
/*!40000 ALTER TABLE `likes_counter` DISABLE KEYS */;
INSERT INTO `likes_counter` VALUES (1,19),(2,11),(3,11),(4,21),(5,11),(6,25),(7,10),(8,7),(9,4),(10,3),(11,0),(12,0),(13,1),(14,1),(15,1),(16,0),(17,5),(18,2),(19,1),(20,1),(21,0),(22,0),(23,0),(24,0),(25,0),(26,0),(27,0),(28,0),(29,0),(30,0),(31,0),(32,0);
/*!40000 ALTER TABLE `likes_counter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `merchandise`
--

DROP TABLE IF EXISTS `merchandise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `merchandise` (
  `idmerchandise` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `info` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`idmerchandise`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchandise`
--

LOCK TABLES `merchandise` WRITE;
/*!40000 ALTER TABLE `merchandise` DISABLE KEYS */;
/*!40000 ALTER TABLE `merchandise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metaverse`
--

DROP TABLE IF EXISTS `metaverse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metaverse` (
  `idmetaverse` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `info` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`idmetaverse`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metaverse`
--

LOCK TABLES `metaverse` WRITE;
/*!40000 ALTER TABLE `metaverse` DISABLE KEYS */;
/*!40000 ALTER TABLE `metaverse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nft_images`
--

DROP TABLE IF EXISTS `nft_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nft_images` (
  `nft_id` int NOT NULL AUTO_INCREMENT,
  `image_location` varchar(255) NOT NULL,
  `setFileUrl` varchar(255) NOT NULL,
  PRIMARY KEY (`nft_id`),
  UNIQUE KEY `metadataUrl_UNIQUE` (`nft_id`),
  UNIQUE KEY `setFileUrl_UNIQUE` (`setFileUrl`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nft_images`
--

LOCK TABLES `nft_images` WRITE;
/*!40000 ALTER TABLE `nft_images` DISABLE KEYS */;
INSERT INTO `nft_images` VALUES (1,'upload/feather.jpeg-1640868902014.jpeg','https://bafybeie7ktytt7ar5oqrosjz3uvtjbvggkhgln32vpeswat25nrexkjjre.ipfs.dweb.link/feather.jpeg'),(2,'upload/colors.jfif-1640868943970.jpeg','https://bafybeicdh7s6nwruuiw3cic5ejchx7zovpzlk5sjp4gobmjm5xy3525wim.ipfs.dweb.link/colors.jfif'),(3,'upload/nft_image.png-1640869290691.png','https://bafybeiedsamq26oxbiz6fp7qufjkongk5oczy77eleocs7wjodxebnfbiq.ipfs.dweb.link/nft_image.png'),(5,'upload/alien.jpeg-1640869893334.jpeg','https://bafybeifi55q6nrq5lbwp2h6vowv6hgurxfuynswxlva44hguvgs2ptsuii.ipfs.dweb.link/alien.jpeg'),(7,'upload/25035ba87d13540773badbb04c41d247.jpg-1641550916338.jpeg','https://bafybeigj5ghotu7n37gywnrn5dr2p5aa2pw2tkajejg35hbobpemaslmzm.ipfs.dweb.link/25035ba87d13540773badbb04c41d247.jpg');
/*!40000 ALTER TABLE `nft_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nft_token_ids`
--

DROP TABLE IF EXISTS `nft_token_ids`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nft_token_ids` (
  `metadataUrl` varchar(255) NOT NULL,
  `public_mint_address` varchar(255) NOT NULL,
  PRIMARY KEY (`metadataUrl`),
  UNIQUE KEY `idnfts_created_UNIQUE` (`metadataUrl`),
  UNIQUE KEY `token_id_UNIQUE` (`public_mint_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nft_token_ids`
--

LOCK TABLES `nft_token_ids` WRITE;
/*!40000 ALTER TABLE `nft_token_ids` DISABLE KEYS */;
/*!40000 ALTER TABLE `nft_token_ids` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nftowners`
--

DROP TABLE IF EXISTS `nftowners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nftowners` (
  `idnfts_created` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `collection_name` varchar(45) NOT NULL,
  `public_mint_address` varchar(255) NOT NULL,
  PRIMARY KEY (`idnfts_created`),
  UNIQUE KEY `nft_id_UNIQUE` (`idnfts_created`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nftowners`
--

LOCK TABLES `nftowners` WRITE;
/*!40000 ALTER TABLE `nftowners` DISABLE KEYS */;
INSERT INTO `nftowners` VALUES (1,1,'LKSHD','RX4DdtK6rETESkZHQKEWPVL9hRN9TxihtaNdmK5Vrs9'),(2,1,'Scarface','DhZqsCM28NbcfGabffXhnoJ5bCQenrB8Pn3q6jD55k7u');
/*!40000 ALTER TABLE `nftowners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nfts_created`
--

DROP TABLE IF EXISTS `nfts_created`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nfts_created` (
  `idnfts_created` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name_of_nft` varchar(45) NOT NULL,
  `description_of_nft` varchar(500) DEFAULT NULL,
  `fileUrl_onIPFS` varchar(255) NOT NULL,
  `metadataUrl_on_IPFS` varchar(255) NOT NULL,
  `price` varchar(10) NOT NULL,
  `public_mint_address` varchar(255) NOT NULL,
  `is_sold` tinyint NOT NULL DEFAULT '0',
  `Sold_to_publickey` varchar(255) DEFAULT NULL,
  `no_of_likes` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`idnfts_created`),
  UNIQUE KEY `nfts_createdcol_UNIQUE` (`metadataUrl_on_IPFS`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nfts_created`
--

LOCK TABLES `nfts_created` WRITE;
/*!40000 ALTER TABLE `nfts_created` DISABLE KEYS */;
INSERT INTO `nfts_created` VALUES (1,1,'nikhil','','https://bafybeifi55q6nrq5lbwp2h6vowv6hgurxfuynswxlva44hguvgs2ptsuii.ipfs.dweb.link/alien.jpeg','https://bafybeifikgm2ri7a4enh7wjb4r3eyx5yh2mvlxqim7k6g2f4wecyltouye.ipfs.dweb.link','0','RX4DdtK6rETESkZHQKEWPVL9hRN9TxihtaNdmK5Vrs9',0,'',2),(2,1,'Tony Montana','Al Pacino in and as Tony Montana','https://bafybeigj5ghotu7n37gywnrn5dr2p5aa2pw2tkajejg35hbobpemaslmzm.ipfs.dweb.link/25035ba87d13540773badbb04c41d247.jpg','https://bafybeihvq42qhorcvw663yi7ed5etlz5sfmfr3ina47yr66bpwjp4oyewa.ipfs.dweb.link','2','DhZqsCM28NbcfGabffXhnoJ5bCQenrB8Pn3q6jD55k7u',0,'',2);
/*!40000 ALTER TABLE `nfts_created` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `party_album`
--

DROP TABLE IF EXISTS `party_album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `party_album` (
  `id_partyalbum` int NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `info` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id_partyalbum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `party_album`
--

LOCK TABLES `party_album` WRITE;
/*!40000 ALTER TABLE `party_album` DISABLE KEYS */;
/*!40000 ALTER TABLE `party_album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_info` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `isKYCdone` tinyint NOT NULL DEFAULT '0',
  `fullname` varchar(45) DEFAULT NULL,
  `Contact_number` varchar(15) NOT NULL,
  `is_email_verified` tinyint NOT NULL DEFAULT '0',
  `is_contactnumber_verified` tinyint NOT NULL DEFAULT '0',
  `wallet_pub_key` varchar(255) NOT NULL,
  `wallet_private_key` varchar(255) NOT NULL,
  `time_of_registration` varchar(45) DEFAULT NULL,
  `id_chosen` varchar(45) DEFAULT NULL,
  `id_no.` varchar(45) DEFAULT NULL,
  `id_status` varchar(45) DEFAULT NULL,
  `fullname_as_per_id` varchar(100) DEFAULT NULL,
  `matic_wallet_pub_key` varchar(255) DEFAULT NULL,
  `matic_wallet_private_key` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `user_infocol_UNIQUE` (`wallet_private_key`),
  UNIQUE KEY `wallet_pub_key_UNIQUE` (`wallet_pub_key`),
  UNIQUE KEY `matic_wallet_pub_key_UNIQUE` (`matic_wallet_pub_key`),
  UNIQUE KEY `matic_wallet_private_key_UNIQUE` (`matic_wallet_private_key`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,'nikhil@gmail.com','$2b$10$lrmKCWiCxPnX0XeQwWR8cOorV85p8XUsMZGz/luDSvxl1xWrkM1eu',0,'Nikhil Tiwari','1234567890',0,0,'AkU6YTF1RJcTaMKKxb2KgWNspeSGW4jVB15MSPWTRiQq','26,151,148,57,207,235,67,85,29,32,120,147,120,193,30,171,139,188,242,6,106,177,3,155,211,164,151,55,66,211,138,204,144,219,203,78,201,63,59,69,145,88,209,67,70,110,124,54,78,68,15,245,55,1,144,249,97,236,101,42,92,72,118,170',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'tiwarin540@gmail.com','$2b$10$nuLrz/uITFbcbOmeyB2h2eSvFV5la189gOR2kwj1HbPsTWemX9dvu',0,'Nikhil Nikhil','9876543210',0,0,'8PBV11Hu8PxkkZZyepfTJRQwsomM2RPF1HBikH3V87xT','226,3,21,145,91,156,125,168,251,58,187,122,141,200,121,158,64,28,149,150,170,252,239,85,90,239,161,8,155,135,68,57,109,176,112,110,5,5,72,109,51,211,121,141,226,32,65,98,167,216,88,150,111,251,7,90,190,151,189,48,148,171,128,0',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'200010050@iitb.ac.in','$2b$10$50uwyC2sr79zTA7E5rkmu.B/F9fyo8M1k07LcGsEbOiHqjtNNsN8q',0,'Nikhil Tiwari','9834747573',0,0,'2r4tiqH4Gwo8ESsnDkYRVs81qqbqp9UUYn1tr1EWqxao','208,61,37,241,25,179,122,36,48,100,128,230,59,231,115,64,12,171,47,99,5,140,27,235,142,58,148,238,250,121,218,131,27,109,140,7,0,217,59,113,136,18,130,63,116,206,198,66,175,19,113,82,169,34,184,191,71,216,134,240,173,97,135,84',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,'nikhiltiwari@gmail.com','$2b$10$a0/5RnzfJgoConPYb/LgiuoOFBfpGLUWZmQUo1mnqiIWfCIuo9Mwi',0,'Nikhil','23875743',0,0,'6eveZBt9vmZAxQE9mfBi1Jn6bM4MVGYKcKN8NWP8r2FF','150,98,165,137,203,127,53,255,220,67,152,197,174,39,248,125,200,112,186,214,224,162,78,41,79,23,141,119,156,201,136,80,84,1,149,128,67,22,245,227,217,143,10,129,174,176,254,136,90,92,159,212,248,251,14,98,175,216,118,126,123,217,67,246',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'123@gmail.com','$2b$10$xtK2fBM17miRcmenWQ9FV.j3JPIMV1CsN0g6NAnVUJc4l/qNY.h8K',0,'Nikhil','923534',0,0,'CrRfTrrQZuawozNiZpVrrtVaVoq3FEoHA3dxEkTvf6AN','250,218,39,41,138,80,17,129,130,218,222,70,189,152,127,231,210,86,55,21,105,61,168,180,232,51,37,13,189,229,146,0,176,25,231,13,213,233,99,51,253,119,92,178,25,85,152,27,134,57,86,183,239,126,133,177,68,172,62,20,177,185,48,147',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'nikhiltiwari1912@gmail.com','$2b$10$MAfOPEJExQ7BsyhXY9k.CuuyxiPaHgaRRnTfUzvrF/oAWbnMeUnnq',0,'Nikhil Tiwari','+917388062462',1,1,'FnkURY2n37Q9U3VGGgaXvYc3fPGprwxVnUTSHcDMyZy4','117,61,23,219,149,97,117,205,112,216,44,3,82,219,110,158,135,122,171,22,184,240,23,230,1,58,12,83,22,137,153,167,219,187,232,130,123,176,120,0,61,75,127,239,142,241,228,4,133,150,189,164,132,64,33,22,189,18,79,74,96,188,230,115',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'nikhil.tiwari1@rediffmail.com','$2b$10$JZrQeQxwiJ8eUQhPMDyJB.xZHR5MdyaP50JcjcXbjiQPlryflM6YO',0,'Nikhil Tiwari','84375834',0,0,'EZdatCHatszWouyLF7tM9dh3jYKoVewFZt388ogPo7vZ','17,207,151,183,126,158,163,102,3,22,56,241,54,78,122,120,168,48,93,155,171,79,126,12,61,253,151,240,62,17,245,247,201,131,225,189,191,131,51,241,63,66,11,219,83,111,32,141,87,162,45,248,223,242,135,7,112,112,142,51,62,248,200,234','1640441442993',NULL,NULL,NULL,NULL,NULL,NULL),(8,'nikhiltiwari19122002@rediffmail.com','$2b$10$YnRe1RfPMH869Bo1iJpYJ.bFfpdhEzEkHP8xlIYBcmSS8tisK7uWG',0,'Nikhil Tiwari','356734',0,0,'89g91AhjEwLqzLYuru19dSNoaQGCZGvbJBsf1UzjAE5w','68,65,64,120,101,170,208,189,147,250,71,64,25,78,34,172,205,228,184,4,58,216,16,193,208,190,254,162,183,52,165,61,106,58,181,90,141,216,23,104,55,249,64,165,72,169,71,32,202,209,88,16,128,31,139,118,112,245,79,21,189,19,159,90','1640443353060',NULL,NULL,NULL,NULL,NULL,NULL),(9,'siddharth@electroshoe.com','$2b$10$ehdVeRm5a/i9/NFTMIngeOcUhUiCX5B1m77btuYUc06v3SAeVLiD.',0,'Siddharth Mandala','+919246183636',1,1,'7d1vtnZ4yDhn3AmCrZVAcGrqpGkfHxKVSkAHkC43Xzt9','234,184,88,6,8,197,176,247,188,192,247,196,5,223,84,228,229,1,203,212,86,41,157,188,253,222,47,235,44,215,113,32,98,96,20,209,99,121,43,222,221,227,41,169,148,255,227,89,248,137,85,246,221,24,82,31,211,218,135,234,85,96,26,138','1640585167207',NULL,NULL,NULL,NULL,NULL,NULL),(10,'nikhil@hotmail.com','$2b$10$cBNDMBwffC3SiEAaLPl3POhby5/4hUIgp41b7BqQra1M1mzlGCm2e',0,'Nikhil Tiwari','+917388062462',0,1,'7HMKzZiK8UD8tF3Q7VioixE9sxoFxebmXkqsREe958G7','176,146,244,38,226,154,66,151,120,52,199,175,91,21,170,8,93,209,163,163,192,93,54,178,6,17,173,202,23,175,70,198,93,86,102,25,214,186,209,186,165,223,39,176,152,126,79,148,100,113,68,190,2,237,202,0,103,92,184,170,139,42,171,232','1640676672882',NULL,NULL,NULL,NULL,NULL,NULL),(11,'nikhil@dhf.es','$2b$10$I6/gAjUMDhlAi5xled0HE.j/KvA3djlhH9FaTOqUWw3IYU.VDSX4a',0,'Nikhil Tiwari','+917388062462',0,1,'BUafk1ScSfmq8UbQs4tkKd1mjV9Ck3AStv8DTd7hFJYq','105,114,89,50,30,142,168,241,138,78,105,41,201,48,165,123,185,147,130,49,169,210,253,224,82,221,40,17,62,98,109,24,155,165,158,157,98,51,242,151,91,151,133,84,158,196,171,80,10,101,181,41,127,9,58,161,249,80,219,237,150,198,145,10','1640686103531',NULL,NULL,NULL,NULL,NULL,NULL),(12,'jdfjd@jf.com','$2b$10$IlKkgvVqChT9wpFFDKU74OhPVcaEEOT/eHcfbPGwNLw59LGwtwWFG',0,'nikhil nikhil','sdhgd',0,0,'AbvfxtiNF335Ta6X2Q8Fqwrz4N51GoAJkv1Z9mqDEQbv','235,163,109,242,147,129,155,187,224,49,39,205,232,72,66,213,94,145,204,17,200,220,120,17,45,22,248,55,251,86,46,212,142,171,157,225,240,88,255,168,1,229,213,4,146,101,220,48,17,15,18,55,71,212,45,86,191,51,87,161,245,2,119,237','1640686240786',NULL,NULL,NULL,NULL,NULL,NULL),(13,'jdfjd@jdf.com','$2b$10$3IkSiRpQYs7I3aN0dGvTGOr2KO5HrrNGYT/aqoZ85e8x4LWwoaZVK',0,'Tiwari Nikhil','+917388062462',0,1,'vTEKqQAvu4668YxaGT4oe9XuYiJKKyotFt76MrNQ7Cq','239,29,173,80,63,177,210,245,250,204,72,137,14,200,45,179,162,39,157,48,14,143,36,191,46,42,235,71,73,100,17,156,13,177,112,225,94,246,47,188,36,63,234,66,55,200,98,130,133,201,212,144,153,148,47,34,43,115,87,126,82,58,246,142','1640686609132',NULL,NULL,NULL,NULL,NULL,NULL),(14,'nikhil.iitb24@gmail.com','$2b$10$aKew.sV.MDzq0clRpcECveXsZbcB6I8hcjVQ3WMyN65HcUsqnxu3K',0,'Nikhil Tiwari','+917388062462',1,1,'AyPgTU6uJoYUnSGMCuKLvrtBfVTwVhQDa8GNEqtQHS2E','158,30,176,63,188,31,134,88,71,204,34,138,1,61,110,56,255,214,191,239,19,204,191,118,160,189,69,17,49,178,211,15,148,43,90,49,190,83,172,210,160,89,77,106,71,219,209,219,16,114,92,191,116,197,181,205,165,90,205,243,78,168,26,27','1640686756433',NULL,NULL,NULL,NULL,NULL,NULL),(15,'ewjhfsdaahwes@ushbj.com','$2b$10$80Rf20khKAjoJaf2ibfaWeaMMJsAOGD6jdhSvjmSlf1s2A8L4wxVG',0,'Nikhil Tiwari','sdhgd',0,0,'ADQeq9o2x7Nc64Wc2GaDQAhsbF1yxLM5STUPa9WoPo8Z','14,227,196,225,248,115,161,249,86,227,96,58,43,26,138,78,245,116,232,115,227,187,175,48,68,247,197,139,208,110,220,202,136,230,229,78,52,123,176,143,110,71,103,65,181,190,68,115,19,160,214,205,110,54,135,11,116,49,175,255,144,80,122,30','1641055392347','Driving License','UP1620210015943','verified','Nikhil',NULL,NULL),(16,'cha454376758587nge@gmail.com','$2b$10$iKqGacUlneC0VQzVEBtKnu6914ZkdoZ6D6uUXN0WOgKrKTr2Mxu3W',0,'Nikhil Tiwari','sdhgd',0,0,'7ozxihXRDfUvDqcfXGcdx2xcRHJ6to5Ty9wrDRXquHi2','99,209,4,72,120,46,155,156,233,70,98,51,8,122,188,190,210,84,92,13,8,254,58,228,161,122,115,197,165,122,255,44,101,48,96,7,148,234,90,122,91,182,84,236,204,186,116,160,234,89,104,211,76,122,227,241,155,94,84,3,208,88,136,107','1642151639009','Driving License','UP1620210015943','not verified','Nikhil Tiwari','0x5e0493c709af8d79862fa5130a100cc00bdcece4','0xda2c7c4757468b26609220c7cc07111f72ad0485b327f2867a190001caa37d72'),(17,'cha45437675er8587nge@gmail.com','$2b$10$gfSQK3aNCtADHKz.3oYk8ehw2b6JIFN06WfNLZnTKs4CSKog4slTi',0,'Nikhil Tiwari','sdhgd',0,0,'2HhMVkEHkaFjR8mZVrN77MH8DG1D5RuFhQt9v53N7ZsN','21,139,124,102,130,11,8,155,213,60,151,189,116,65,71,65,92,89,231,35,43,81,215,82,134,228,136,51,96,33,120,186,19,34,155,138,15,111,16,161,28,210,173,204,77,32,56,61,64,60,16,117,157,79,41,30,242,98,157,5,215,90,193,233','1642151840469','Driving License','UP1620210015943','not verified','Nikhil Tiwari','0xdda90334a9ba0bbe4ebe9f6bec5b6c8d5466e481','0x64a776c553342b86807e7555568a15fc77d83cf2ae0e5ed15ea27135855ab716'),(18,'cha45437675efsd8587nge@gmail.com','$2b$10$hzjDQ4IRKc6WINb/z2oVdOw5pOCsrPmmpV2BUIvH8jNYr8L.8Xaam',0,'dgf','sdhgd',0,0,'8UtSc7gsWUCFereF2m2op3vuYU8d1Pu1u3gRknuLXrMw','244,251,147,24,246,6,89,128,61,27,178,235,107,240,142,208,153,141,4,72,172,143,39,37,197,96,133,56,197,63,5,162,111,38,167,199,138,67,222,72,14,61,152,55,20,60,13,104,94,119,213,117,112,93,95,118,114,95,8,123,149,14,8,194','1642154895550','Driving License','UP1620210015943','not verified','dgf','0x99d60734ad01cc7550a5b4430e7bc784dfa45d39','0xea3c3bda9751a5119c4f9d138e8ff40faf90f26dc1fe56fd6049cdf6c5201b62'),(19,'tiwarinfxcbgn540@gmail.com','$2b$10$RJMKgaWQzvUMz3t7t0loyOZVvLHrBPq6YuryfpOLkK3V9D1dzPt5m',0,'gdf','sdhgd',0,0,'5y4bDL2oyLk6hY96oAEVdH8gtxE3M3pw4qgREGa8y4sZ','53,94,106,51,142,212,88,199,225,33,132,230,102,188,176,199,125,203,250,149,81,6,146,60,193,3,21,162,54,9,64,99,73,203,85,4,35,85,160,128,108,163,137,149,85,234,201,47,159,61,117,148,226,123,59,222,203,201,178,96,240,252,156,240','1642155044851','Driving License','UP1620210015943','not verified','gdf','0xef8f096227df445fd2a5a69dc2cda19be6f384cc','0x0372e7f2f5770475fcd30ca335ce30be486ffeee9fe661fdaffd39a307fd4f13'),(20,'tiwsdfgfhgjhvjfgh34567arin540@gmail.com','$2b$10$ZHl3EjMa0QDV3Rw1MPNXSO6L7GqacWbm3qPf6g2/5S81IshTw49b6',0,'Nikhil Tiwari','dsfg',0,0,'8yRhm6Tm21UZgj1hsKxJCfuPG2yahQzkSRNXgzxbiiSU','82,58,173,58,179,48,69,203,193,75,57,214,94,120,216,146,243,156,43,206,149,245,217,206,85,201,129,216,165,210,78,162,118,118,67,234,106,101,81,40,112,155,225,91,226,151,153,145,244,155,22,59,204,189,38,62,245,97,21,51,46,236,104,49','1642155117640','Driving License','UP1620210015943','verified','AYUSHMAN CHOUDHARY','0x3cc0066b7e929359c040941792bc4d5f470bce3f','0xe479a882a96a784b47e013894314f38f316882dae96ed46d246fdce437bc31c0'),(21,'tiwarinqwasd540@gmail.com','$2b$10$taozPLquNm9aLYSOLl0X6u8KBSpxFq1iy0V5fD1LwyWRH7W9/qAeO',0,'wesdgf','asd',0,0,'F66zPsfCb8t9JYumfLDDdBpU1iPsLj8LRBLSd4xt93jb','17,34,19,156,231,97,104,19,61,79,228,18,149,165,88,131,134,5,179,10,225,169,221,148,201,215,71,223,196,192,80,141,209,82,75,30,45,167,144,211,56,35,184,71,23,100,101,254,233,153,86,73,218,60,193,45,250,89,247,144,190,161,224,126','1642165002928','Aadhar','374511890888','not verified','wesdgf','0x401ed04b4e8a0ac217958e46f82c044371727ac9','0x20b3371f81885f74099d7483f77c81a75980e592129bae16d4f0da50b7b57f28'),(22,'sdfgh@sdfv.rdf','$2b$10$mkA7P6JvyGS0ajfByYkCbOholzo7Qp12nvVOpeIvVIxhHqGvZZ41O',0,'Nikhil Tiwari','sdhgd',0,0,'J9XjcRxuAuSHtVXGQHJCvHDhBzUPoSSEeNFoxcrqcgqg','86,96,159,237,139,169,80,122,76,129,5,124,52,212,54,197,85,183,124,65,254,104,8,116,24,177,154,223,247,116,131,234,254,198,19,118,61,23,107,130,149,87,100,207,61,14,225,202,161,42,58,109,84,139,85,23,116,229,204,55,174,196,87,219','1642167053609','Aadhar','374511890888','not verified','Nikhil Tiwari','0x63458ddf372f35b77fc0bec6b0200c52a37c885f','0xcfc0a3074f2c07564410823272a9c6871bb6dac08a179a74a40da6d347e16ed8'),(23,'jdh@lksjdnbx.opdisjch','$2b$10$EZ4sfab0RoYxAsDuifOGluRDaO5mrDOKrP4YP45nsWl..dLaESGci',0,'rklfdsjvhc@kjsd.com','slkdj',0,0,'CZPATA1Dj3qY2x11B9oJ3x3aeeojUPhjihUjtaaXgCdP','142,19,190,224,162,162,97,186,74,186,229,95,7,62,105,229,203,177,177,117,124,212,51,211,33,127,213,31,84,89,71,156,171,188,51,169,123,169,133,3,218,78,198,27,245,12,216,246,200,112,187,123,220,197,183,126,191,200,181,53,155,138,188,34','1642167203020','Aadhar','374511890888','not verified','rklfdsjvhc@kjsd.com','0xe2fa1c492908f364b813d7b14562f48a2a393c10','0x982f3807fb3ce06051434a1b6ca360c2c8c5f774c7597e1bfd5729941f60e8e9'),(24,'asdfgbn.@dxfcvb','$2b$10$ajBxmkJ62aeth6I9EqFtaua1WO6FEGthEiNj3qQEdZhrLZcQ8NzHe',0,'fgcv','457',0,0,'pQRykJtNiuL6muiUArpFWRCz6WJ5bdDB5TiNSR1MfkQ','55,211,1,126,166,254,75,131,194,43,122,14,148,170,231,78,117,122,94,114,232,146,24,231,10,164,174,148,34,109,50,71,12,36,202,137,125,67,170,92,23,10,159,191,178,206,164,179,69,181,1,229,252,140,96,106,221,138,38,174,149,249,85,13','1642167289913','Aadhar','374511890888','not verified','fgcv','0x1fa058123cbe16d9b6044da7989e294de6a9c8d4','0x5ea9d1b06d290b05f6586c43e291d3f9625c1696fc51d6599f4051be2c6a9cc4'),(25,'iadsfhj@ejifkdh.sicdc','$2b$10$J9CAd9syQ8DN2wsFr2yaaueahzk8tEwoZKOYEkLRbeRgqOc5a/rGG',0,'hbjx','dskaj',0,0,'3aTmhgtPjmXJhDMkD9rjffvgvhu4oqdzRcdAivK7bdhg','222,38,201,17,16,163,236,248,67,121,45,250,103,228,120,141,203,225,97,151,128,93,81,8,45,42,26,182,50,4,85,7,38,73,207,111,158,245,19,254,131,163,153,32,8,56,40,71,196,233,168,92,159,3,19,108,189,15,225,145,23,133,53,247','1642167371716','Aadhar','374511890888','not verified','hbjx','0x45c245bbfc9bb7877fcc268fe0cc0f860427d0cd','0xa3d7fccf67ccbe0e330433bfffe46b38ab204224deeb5065f9561214a71d7c04'),(26,'sdkfj@kdfj.com','$2b$10$QCOPaasneT.Qk0J5zzZ5/uBDxHAJt/w7xUCfwWloE0aRyb5sOuSXi',0,'Nikhil Tiwari','ksdjx',0,0,'57TcfJhvDM2WKxgd1GZaeKKdqPdBb69etYWZNGTA2jH','7,26,228,145,250,36,2,5,112,0,75,171,49,58,143,101,20,59,92,189,131,13,211,118,109,178,81,141,80,155,76,86,1,13,160,85,238,91,42,65,111,116,21,8,14,67,97,19,82,51,35,254,137,183,177,0,140,43,37,82,96,190,164,96','1642167417323','Aadhar','374511890888','not verified','Nikhil Tiwari','0x23e1449ae880c332d3e9ebbab7a09c894e921737','0x4c588b990eedd60b6ee1215d0c62ca5e3f7c7e85042df243963318a66695e8c8'),(27,'200010050@iitb.ac.insah','$2b$10$PsV6lLl3xvHLTFf8CUtl5.1hR7mZPWHNpOV4k5fxFga6jesOr7aAy',0,'Nikhil Tiwari','457',0,0,'4bDAEEoPs5eZBRt1uEdyJ3VtqDGNtwiewRZd5hgmF9Tg','36,228,118,242,252,184,118,178,31,214,91,210,55,93,178,102,95,206,170,83,163,178,220,129,252,50,27,183,20,234,133,4,53,86,142,127,151,100,27,219,239,52,241,122,118,221,74,57,82,62,210,6,67,140,76,8,74,192,210,161,140,181,79,123','1642167644924','Aadhar','','not verified','Nikhil Tiwari','0x802e3bea790c5ae5d7f0e5b08a4fa8b2d2fd29f8','0xc823912c4af626843342abfe974500139a7a914ee2e7172c5b18dde24c08f6f7'),(28,'200010050@iitb.ac.insahfg','$2b$10$CyAPPrcDcrPo9Zcw/Rb3guTNVZa2g9BPO3v56uTZE8IH1x2bPKaAy',0,'Nikhil Tiwari','457',0,0,'Hqi7msjYgaMcJF1TD4cdWTVE785VZUBRBuSTr7RNycA5','118,128,148,131,197,140,92,30,120,78,171,49,41,168,159,31,139,213,244,144,48,36,88,2,27,205,168,192,127,217,158,38,250,53,92,77,128,223,105,201,226,49,253,135,156,10,213,230,217,221,25,70,138,124,194,97,215,92,217,14,122,120,236,10','1642167703309','Aadhar','374511890888','not verified','Nikhil Tiwari','0x0e636f8d55a956d42d4a19f0eb280b9e69926093','0x920168009c0173c503864fb48550372b2ec16b38a0c4c2ae60869ef91c447a75'),(29,'200010050@iitb.ac.inestrdtfyguk','$2b$10$Hc2/XypTGGdlmNO7CIevbOZamu4yVME49ja2Wnoy4zsMmsiuTn1vW',0,'Nikhil Tiwari','sdhgd',0,0,'7gLJyqA9HcFcTUM8G1Wwu18keZnY1B2S4J6fR19vrbRf','159,12,161,44,130,140,246,130,14,77,249,110,40,143,117,97,4,213,166,124,22,225,9,3,243,175,136,195,60,215,22,188,99,57,155,100,12,194,115,163,248,29,254,39,26,243,55,170,193,38,146,109,196,124,134,148,168,16,146,104,208,204,119,86','1642167794005','Aadhar','374511890888','not verified','Nikhil Tiwari','0x3c988f3e291b3c9b2c6fc390301902b31b187a8a','0xd8f8d0d006ac9552395a113a3c4dbd44bb7b1d77dee9b94e06fc918b1d38192c'),(30,'nikhil@gmail.comasdgf','$2b$10$bI3ebsw2iTJpd7xe2QP.mOX6Ii/n/jwjywY5.KNWKVLTXbARi0kg6',0,'Nikhil Tiwari','sdhgd',0,0,'5srUT8u1UYpV3XWQzNqyHhxBcRYhKq1uzKCdnn6ntAZv','216,220,225,246,146,166,122,84,83,179,80,17,35,160,86,61,177,216,138,116,30,234,183,121,212,238,42,209,199,30,103,43,72,117,186,79,247,4,254,166,115,34,87,111,54,32,103,209,76,207,160,19,141,18,146,5,249,252,63,112,118,17,15,97','1642168141675','Aadhar','374511890888','not verified','Nikhil Tiwari','0x81e1cdcc3adbe618bc54b7e8e7deb0e761b5db2e','0x763678d3de730aa070666b1ea8664885c8f3aa3a2cf7523484ea3eeb66f9c712'),(31,'nikhil@gmail.comytu','$2b$10$fEVZLG10eFQ7J6BJUMusJOdVH56jZyRp.NmyctjRqWdy6iqTUUSJy',0,'sfdgf','457',0,0,'J1t7XGpAgELcWeFnpVR4fkvwxPEsha6aq5CixbfZPC3i','169,51,129,235,134,30,244,180,62,139,190,36,221,19,55,123,189,251,163,73,167,81,223,157,49,241,96,236,138,152,227,15,252,208,120,132,204,235,121,88,36,86,169,221,90,23,98,193,158,212,11,103,49,97,80,190,17,103,221,202,238,245,229,89','1642168335445','Aadhar','374511890888','not verified','sfdgf','0x5460ca0b56f146b5a1cab9c64de7629f3eee52db','0x77a9c2eda0c36e2b075b7084ee3d45f3f8bc7cbb2f8938df1d475f5b902f21d0'),(32,'200010050@iitb.afsdghc.in','$2b$10$dHD4zsPzDrudQx7FqdVWhuy/cbuhEk7UJ41JkvDzafHz8yY9c/KDq',0,'sdgfh','sdhgd',0,0,'kGacszt9F3SHh694ACRXqC9qNoHxT3GR1AeEWaXwKtE','58,185,240,7,169,220,157,134,166,100,185,176,14,180,143,96,159,159,36,212,211,32,130,238,113,56,233,147,32,68,162,195,11,21,151,58,110,178,5,71,108,20,115,174,151,247,185,248,224,214,163,19,27,254,243,208,81,66,126,160,57,53,106,211','1642168460721','Aadhar','374511890888','not verified','sdgfh','0x14382fb68e8059c54be2270c72206ffa080b9329','0x3de7bdeee939bb65fa5729a5feb221a39f98c3906a34f9e8d96c71f054595b66'),(33,'200010050@iitb.ac.incv','$2b$10$4R4e8L/tpbwODSZBflj98OqHSzgiiXwseG7TB5z.C4tp11reGiWca',0,'Nikhil Tiwari','sdhgd',0,0,'2ew4MFMGjx44XLdenPMHibDsxo4o22pvM7EySWSCci4P','5,189,76,4,209,217,107,165,147,4,73,232,38,172,39,8,1,128,79,154,134,193,133,164,53,199,17,127,130,81,144,186,24,147,76,214,110,215,91,97,104,134,168,3,127,244,204,239,18,33,71,169,103,182,97,74,72,42,64,231,10,26,201,16','1642168579011',NULL,NULL,'not verified','Nikhil Tiwari','0xfdead9a1e801ffe2275d86f960ca128dbde2cc0f','0x45d22ba379d96c3b3be023bedc1a03fca6d45480140eb2d820573a9d1c4855db'),(34,'nikhil@gmail.comasdfghf','$2b$10$MEs8UokRswG7qngYFa5AhOHvtW2fYIUrf62tH2qFnLj0xAzrbDjMW',0,'Nikhil Tiwari','sdhgd',0,0,'FPzeNz3XvNXBH9ho47CYkLmvNirQDvb2ivK8nDG76f9n','176,2,106,232,248,201,103,5,131,163,155,73,1,247,106,172,116,113,31,241,77,84,104,183,17,43,221,232,155,201,240,220,213,231,146,213,191,169,131,170,23,248,83,186,178,233,90,177,42,25,153,23,197,59,116,49,19,43,157,155,243,234,181,93','1642168597965',NULL,NULL,'not verified','Nikhil Tiwari','0xb7f400374f76c99dc62a6e26e08cd8ec8e194e33','0x0e52bf4b4d9d77796ee43ff90acb3c615a14b28c4eca0468409a0a27fe3edc35'),(35,'nikhil@gmail.cxcvbnomasdfghf','$2b$10$MTE2esJF8ypmXWIjabq34O3mqjoVSHusASTwPY9E0ifOKr2jhkmMy',0,'Nikhil Tiwari','sdhgd',0,0,'2cumuNNnJFoZUbASMpkY4YDRvkUtjG1zhftrLmjZCZbX','144,104,98,211,102,19,197,38,214,187,219,42,10,109,190,225,33,70,159,128,32,56,52,44,200,176,54,235,87,160,158,97,24,14,175,236,231,139,37,95,46,140,216,199,58,148,129,136,103,159,225,174,96,167,116,19,45,31,79,117,252,42,27,202','1642168766959',NULL,NULL,'not verified','Nikhil Tiwari','0x9629f5f542fd9e382ff60153e3bd41e7e764d18b','0xc0077e50c60f3d6ad9dffde4c0567021c048b99e7da134fb79a1be9b966a2e2b'),(36,'200010050@iitbdasfdgfh.ac.in','$2b$10$D97X37B4QRveu9Ausz9y7Od0eNhFCX.MFMXabEnhQoNa99GetimTO',0,'ertfyg','sdhgd',0,0,'Gn3xN5s2uednqS6kUdkmzXAqctNWLLWymC68ML4kXzo2','221,212,96,125,211,74,107,97,12,100,225,127,166,230,107,149,47,7,158,86,252,241,17,183,26,205,213,185,90,187,48,128,234,105,199,240,178,54,215,142,131,26,234,39,149,46,244,134,142,115,111,136,112,177,214,82,115,119,115,167,21,48,184,113','1642168860188','Aadhar','dfsgh','not verified','ertfyg','0xd96e31173a5866f78ad4935251b6ae76c422a142','0x260a0e796ae3454a25e5b5d314be7899fb34762f74e7428f94727e6d666ff35e'),(37,'200010050@iitb.ac.wafsedgfhjin','$2b$10$zB/nLyWguVmZC.KzV22cLOe2xFbFDe6eLmTJGIU1VapZP7oiLnVm2',0,'efgrthfyhg','sdhgd',0,0,'F1QhggHGbHh9NwAPP7zNDpi1Kwd24nHoMVdnUxQRCA3m','81,188,26,238,252,199,115,185,89,83,12,79,204,148,68,166,206,235,243,175,205,156,251,211,251,144,48,191,253,63,80,71,208,30,106,145,145,145,159,228,187,173,33,103,183,62,55,239,120,59,42,175,161,5,194,188,159,28,234,175,37,68,153,188','1642168907568',NULL,NULL,'not verified','efgrthfyhg','0x8c7f816e3b0a3a6646aa9edc86074cdcc8e48580','0x903f1feb57ada7b2118f3139c6ebc3de6ad26a61dbbf7b0473bc67a6881aa5b6'),(38,'200010050@iitb.ac.wcxvafsedgfhjin','$2b$10$pIZDevaOS81G6DXPZ6L7Ye/v8SlrMiA5cn8QaEfhpwxsUza67o3hq',0,'efgrthfyhg','sdhgd',0,0,'BarPvCoX4qEvyTZhtzJSe5piMVtJvCN9otfdaYtVrD4z','84,82,0,85,42,192,42,225,45,186,4,230,238,165,66,14,73,233,55,24,133,95,191,134,29,12,34,55,180,77,255,61,157,64,227,32,48,20,183,44,49,207,0,48,31,159,208,109,128,66,84,32,51,182,198,13,163,251,35,87,185,16,53,31','1642168929299',NULL,NULL,'not verified','efgrthfyhg','0x6cfbbb11284815048248f49f2098211702e80e8e','0x48bae9c846b2570221282a7471eeb7a44d8071e80d4acdb3a5d60dfe4a067dee'),(39,'200010050@iitb.ac.intyguiuytr','$2b$10$.tZ2qX5K9M/qz6rG9/5lhOQ/T.Y0vXWarQDH/AsiP/2op106nFi0.',0,'Nikhil Tiwari','sdhgd',0,0,'DbiBDHEDJRENRxrMxViVeLoLjfFDXTUM64XjGhhXuLb2','24,137,95,211,186,180,213,95,201,164,241,195,174,68,180,23,248,207,134,6,180,44,69,36,188,221,95,38,54,153,6,179,187,48,140,109,180,12,56,85,208,13,254,178,123,185,137,166,135,225,232,165,68,2,30,156,183,142,88,183,47,114,123,225','1642169038224',NULL,NULL,'not verified','Nikhil Tiwari','0x54aad9ef4f5f8a9d741892369a50ab7e435133c0','0x65606e033ffbf0cb81ff6f513d3dd7ecfe143f2fb1c6386d81c055edef133e4c'),(40,'200010050@iitb.ac.insdfg','$2b$10$6PXo5WfkCWF6e8FPePOVO.gD1Jh.SwoDa3T0CiQLtGahfVcgPbmYy',0,'ertfg','sdhgd',0,0,'99ap278C83MnpBZq1hfdxa3HY8Yc19p5RcruN23pipaV','196,153,199,176,102,193,209,30,132,209,7,236,189,60,138,24,97,102,151,181,174,99,44,129,230,156,101,206,227,14,70,232,121,16,95,41,242,73,64,216,18,177,61,39,26,30,7,250,219,203,48,178,170,58,247,19,117,249,193,154,13,237,175,138','1642169081879',NULL,NULL,'not verified','ertfg','0xaf2924e6f3c19e935a1bcb303fc27a5ae084f028','0xa2d5bfc75e7f5f1de9f524929ef63ccbd4d04ca88bfdaa8c5dd6b12a981d03ff'),(41,'sdj','$2b$10$uGw/8RNIdWoQrx/vmQ1iBe50B7OvaK5lc1NYBsOwy0C6mH.Un3B12',0,'Nikhil tieajahda','+917388062462',0,0,'DzdJYpneUK9JjXkqJJ4f34VLPavmZonmg7eZqNPDWFYz','194,58,160,112,172,3,30,195,244,199,125,175,139,96,125,22,130,186,52,162,137,177,181,144,127,91,96,90,124,113,38,10,193,15,101,140,92,229,34,160,133,13,45,75,255,186,100,109,92,121,152,13,177,228,188,12,112,222,227,110,237,154,251,127','1642172626118','Aadhar','374511890888','unverified','Nikhil tieajahda','0xaf1c25e752ca2547d308ab3d557c235fcb990819','0xc8764ebd4a61da057f4cdd07cef1b28400d21f2f7de8d9fe8ce31a0b419ad8a7'),(42,'sasshdfdj','$2b$10$njJSB8mdK6mDW3dbox7JfuFOpT2kFgLqf2KlHNPZB1.WPlkXTp8.e',0,'Nikhil nikhil nilhil','+917388062462',0,0,'DiAk9b2YRBMjJtvjHMrnHAQXH9vo4wRmgcrvwG1yNVf','93,2,161,156,53,43,150,43,226,181,127,137,105,3,157,104,216,253,41,63,195,39,228,14,21,18,253,150,242,150,87,37,3,65,132,189,78,48,14,5,138,186,26,162,210,43,255,221,14,109,105,211,177,241,97,7,252,38,73,224,167,65,176,146','1642173172748','Aadhar','374511890888','unverified','Nikhil nikhil nilhil','0xc1fbb20073e55ea82638e552a0ee4082865a78dd','0x05aad664a6a7635b678c5ec44799d21a1948a4357bcdcb9a519fd991b00ab6fb'),(43,'200010050@iitb.ac.insdfgh','$2b$10$8.w9IOM/OYwY4aKnKLJ6wuNOo4suNl7XdbmRXaJyETlADwwnPZq1m',0,'sdgf','asdfgh',0,0,'6WsqnPWRx3VH75bLZ7DNXvZtcPqGe2LXaGhnrqwFy9W7','114,194,96,250,254,140,187,76,28,76,235,221,71,94,213,35,172,158,188,81,110,136,15,239,56,121,42,228,177,171,54,33,81,241,195,168,57,162,190,158,177,232,227,36,246,48,76,139,121,14,138,118,230,24,29,233,152,240,183,109,209,186,94,152','1642173383838','Aadhar','234567','unverified','sdgf','0x6c4fb457f59cec370a9dd1f5aecb9d824d8abe8c','0x1de121480e2b0352d4dad7ff7e8db69c24f5da0198277bb15267cf4669007ea4'),(44,'sdjsdf','$2b$10$JyRlV6dRSgIPW.z/WcfQleVfDTX8lDLZ.T5.DV4IKiNuepYKUaEA2',0,'Pragya Patel','+917388062462',0,0,'CgG4eWDrZ7ccS8KdUNBBiMt345t8AT5PXU5gQyxZiJJu','75,226,100,25,22,85,115,103,44,142,187,87,51,176,75,195,52,178,251,79,132,118,206,67,242,27,76,16,56,83,58,38,173,127,61,72,140,234,70,91,179,67,217,165,121,105,19,63,184,179,108,210,203,129,179,197,78,96,82,243,67,198,21,186','1642174294446','Aadhar','514921456859','unverified','Pragya Patel','0x1fdc6720d3a03c862d0f5c46a2c681f27da6e832','0x16a4869504f5680cec216ce0826887bb060bd761d87c1ed606076cae654feb02'),(45,'pragya.sarc@gmail.com','$2b$10$fwzGmsZBLUv6F46Hcmu.WuRFD2ze7vLK.8JK80GXHdQzw2KRRJ0XC',0,'Nikhil Tiwari','+917388062462',1,0,'6QQtfzfhfZxTPp9afZheu6JzcKMjSUS15dUF3odxpk4c','153,192,61,57,56,67,125,207,178,235,205,61,201,159,75,180,112,176,165,226,32,235,187,194,192,60,37,44,214,199,65,169,80,73,206,136,113,203,55,232,50,49,198,194,135,10,29,104,49,93,8,184,45,183,6,153,76,187,184,8,152,186,76,165','1642174518525','Aadhar','514921456859','unverified','Nikhil Tiwari','0xf042e3cbdb33fd297290e620becf34cdc397ce9f','0x8f31292e0b987ec2111d9a88ad95876bf8a06c623d972c01202c5166fb4f31bc'),(46,'nikhil.mech.iitb@gmail.com','$2b$10$C8pe6rVojKrJSfCzTH7ZauTj.lhT.OS0p1opXZnTKEAbKuJiqu9Ri',0,'Nikhil Tiwari','+917388062462',1,0,'6owsryYYhyRCE6Z1D27Rg8hrbR2LohbTcKKfJ5eMSuPo','160,129,46,0,140,26,239,33,190,176,223,162,192,5,185,227,218,245,73,138,66,198,61,103,96,119,138,204,160,2,152,208,86,81,51,142,6,9,74,66,39,202,151,176,205,26,199,244,83,132,234,195,179,121,93,32,131,214,179,41,138,218,169,66','1642175127932','Aadhar','374511890888','unverified','Nikhil Tiwari','0x2bb75e4d745f483423ae792115f399b1bdd228f1','0x6f27b231b01de59c22d600ee507e09ef65fff2bea2b78f753ecd4b45d3aa6e32'),(47,'200010050@iitb.ac.inasfd','$2b$10$x/pX8fw6cq7s6oe4jvnFMeHJ8Z/KBZO7H9NCkmA.lSUH7tckgTrsO',0,'hsadgdf','sdfg',0,0,'wuKsGquPwwipiBpF3pxPgEfhYTeK8Whz9pd7zE5X5Z8','203,131,177,28,192,198,91,159,43,25,12,227,156,178,81,143,218,127,167,115,244,146,122,53,129,213,207,38,54,81,0,87,14,16,135,48,119,9,101,229,224,87,245,127,225,100,225,3,245,229,229,92,197,250,56,77,38,247,98,117,28,165,239,39','1642231088901','Aadhar','374511890888','unverified','hsadgdf','0x671dcf8a811f0cb3fc1beeb63c24ff96d227e2c3','0x814fd4ac278bb20f32c55684dff871c4f6b48863f20b2af1d47d7014d6ceeccd'),(48,'200010050@iitb.ac.inarestdhtfjmhfdgsf','$2b$10$BcV7sNJkucf56eWVEx7RjOyS6/59FZRYrcfSWhlSpJWnqMnQV60C6',0,'sdfgh','sdf',0,0,'DR4quwmYhLhsHk1Xy2kEUCRR5XcJdmDqQ61D4z752VXP','199,253,108,78,225,217,185,154,164,98,122,11,16,208,200,126,197,209,113,16,81,53,18,189,152,130,78,66,54,70,157,164,184,118,135,55,203,146,77,99,167,108,111,80,208,21,218,0,160,221,77,106,16,224,209,14,84,164,144,157,23,255,194,186','1642231357859','Aadhar','374511890888','unverified','sdfgh','0x730a18c223c0442082d5f2bddfd0b92469c6298b','0xf228a369e91ba091337a1f92c2f3a1bd3b3fa07950564ab0685b69cc1a034a22'),(49,'200010050@iitb.ac.inEAWRSzdhgjgfd','$2b$10$AVcBTAm3ygCenp/K4EpGB.Nfj.RXbsa8W3Lr7LumxGDf6jEctBng2',0,'rettyjfhrerw','dfg',0,0,'5nYiN9RxeUnafv5ghA3qRGiXXDfHiEvsVWcQ1c4Usn6e','92,196,123,209,100,230,117,181,125,21,47,135,89,200,44,189,84,179,2,118,0,220,136,63,83,59,35,43,148,30,7,38,71,25,190,8,231,99,173,110,147,226,83,29,167,161,211,214,120,231,94,184,45,37,97,116,91,5,2,172,242,212,97,187','1642231402718','Aadhar','374511890888','unverified','rettyjfhrerw','0xa7c36b9d2842d6a413918e418cd399458660c712','0xaa44ab5cc7ab8b85babff12ab661644afadebead627be6fd671545336146d182'),(50,'200010050@iitb.ac.inearestrye57t68okhg','$2b$10$Y2YOKCdDglLY9c17Rsszsup1mPwsTIigWA58.5dJ3I34GVrOAhG7W',0,'dsfghh','sdf',0,0,'7TdGNZNijzyjQNKTqvXzJ6g5FMmtZDLnMqX2bHdKcGep','98,172,49,87,151,165,11,60,59,101,206,126,59,52,59,65,133,135,163,55,177,159,203,248,88,248,109,165,141,225,43,164,95,248,58,67,141,208,109,220,62,52,48,122,118,36,116,54,153,102,184,7,164,248,116,76,161,219,249,86,71,247,60,197','1642231447907','Aadhar','374511890888','unverified','dsfghh','0x5a084398d5e6ea6b799b9cc46805f6629d292201','0x5fa6e623cf0c6770fc3c64f9a3657fef68c9613becb008922d2e5f03285b64e9'),(51,'200010050@iitb.ac.inwaet56756e','$2b$10$gjoBpwJ3lzeFKUD/3QAf5uMwWMSRXLN11lLe6jkzotDg0rp1V0G0G',0,'sdfgh','dsf',0,0,'ANBhhQJMcy1JLGd2kGHSguXpiXxtFmXpfbMwx9poKL97','98,56,153,173,199,23,65,33,82,182,92,141,180,28,116,164,227,176,49,59,112,252,33,198,62,4,194,70,201,161,90,85,139,38,122,208,47,123,98,37,106,86,34,148,252,112,124,177,67,26,199,26,167,249,30,156,15,123,38,27,17,81,61,18','1642231543139','Aadhar','374511890888','b4c6ffc3-2fe3-41ce-a31c-12c5eee48dae','sdfgh','0x680115c14caecb8eb13a91e3680f23cde828f6e9','0xeb2a03c28043d1a175bf20a4c9ed9cc16697ca99b7fd78d01a7f83cbb667f3b2');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-23 22:14:35
