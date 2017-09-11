CREATE DATABASE  IF NOT EXISTS `midterm` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `midterm`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: midterm
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `postCode` int(11) NOT NULL,
  `comment` text NOT NULL,
  `commentor` char(30) NOT NULL,
  KEY `postCode_FK_idx` (`postCode`),
  CONSTRAINT `postCode_FK` FOREIGN KEY (`postCode`) REFERENCES `post` (`postID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (7,'Your silly words, I won\'t live inside your world','FlamurUk'),(6,'Bumtiyaya bumtiyaya bumyeye','shaymitch'),(7,'Cause your punches and your name, all your jokes and stupid games','shaymitch'),(8,'She won the contest X Factor!','shaymitch'),(6,'appear disappear ','rachelmaiden'),(8,'Oh my God!','rachelmaiden'),(7,'Heart!','sashapieterse09'),(8,'TS6 is coming!','sashapieterse09'),(8,'The old Taylor can\'t come to the phone right now, because she\'s dead','rachelmaiden'),(9,'My wig is gone!','lucyhale');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `senderName` char(30) NOT NULL,
  `receiverName` char(30) NOT NULL,
  `messageContent` text NOT NULL,
  `sentTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (2,'AshleyBenzo','shaymitch','You so pretty shay!','2017-08-19 03:57:00'),(3,'AshleyBenzo','shaymitch','Let\'s Hangout','2017-08-19 03:58:00'),(5,'shaymitch','AshleyBenzo','sure when?','2017-08-19 05:16:00'),(6,'shaymitch','AshleyBenzo','Shaycation on Greece are we counting you in?','2017-08-19 09:39:04'),(7,'sashapieterse09','shaymitch','Shaycation in Greece soon! see you','2017-08-19 10:31:19'),(8,'shaymitch','sashapieterse09','Ok see you sasha xoxo','2017-08-19 10:42:23'),(10,'sashapieterse09','shaymitch','Thank you Shay! loveeess','2017-08-19 11:27:37'),(11,'rachelmaiden','shaymitch','You\'re perfect. xoxo','2017-08-25 05:10:51'),(12,'shaymitch','rachelmaiden','I know right!','2017-08-25 05:11:52');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `postID` int(11) NOT NULL AUTO_INCREMENT,
  `author` char(30) NOT NULL,
  `postCategoryCode` int(11) NOT NULL,
  `postSubject` char(50) NOT NULL,
  `postContent` varchar(140) NOT NULL,
  `postDate` date NOT NULL,
  `isDeleted` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`postID`),
  UNIQUE KEY `ID_UNIQUE` (`postID`),
  KEY `postCategoryCode_FK` (`postCategoryCode`),
  KEY `author_FK_idx` (`author`),
  CONSTRAINT `postCategoryCode_FK` FOREIGN KEY (`postCategoryCode`) REFERENCES `post_category` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'FlamurUk',1,'All about roses','Roses are red violets are blue.','2016-08-10',0),(2,'Michelle Dy',1,'Sunflowers mamshie','Mamshies ang ganda ng mga sunflower','2017-08-07',1),(3,'user',1,'Gumamelas','Gumamelas are such beautiful flowers, and i love red gumamelas mamshie','2017-08-12',1),(4,'user',1,'Example','mamshie ronan shuking ina','2017-08-14',1),(5,'user',1,'jonaaa','hello hello','2017-08-15',1),(6,'rachelmaiden',1,'Flower Mo to','Bubuka ang bulaklak papasok ang reyna sasayaw ng chacha ang saya saya','2017-08-16',0),(7,'shaymitch',1,'Greek Flowers','Flowers on Greece','2017-08-16',0),(8,'shaymitch',2,'New Taylor Swift!','Grace VanderWaal is the next Taylor Swift','2017-08-18',0),(9,'rachelmaiden',2,'First Single','Look what you made me do, released 12pm in PhT. Make sure you buy/stream :) I\'m shookt','2017-08-25',0);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_category`
--

DROP TABLE IF EXISTS `post_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_category` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryName` char(30) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_category`
--

LOCK TABLES `post_category` WRITE;
/*!40000 ALTER TABLE `post_category` DISABLE KEYS */;
INSERT INTO `post_category` VALUES (1,'Flowers'),(2,'Taylor Swift');
/*!40000 ALTER TABLE `post_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` char(30) NOT NULL,
  `password` char(20) NOT NULL,
  `email` char(30) NOT NULL,
  `birthday` date NOT NULL,
  `userType` char(6) NOT NULL,
  `isDeleted` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  UNIQUE KEY `Username_UNIQUE` (`Username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (0,'admin','admin','admin@admin.com','1999-11-12','Admin',0),(1,'userNames','pass','users@example.com','2012-12-12','Normal',1),(2,'rachelmaiden','rachelrachel','rachelmaidenflores@gmail.com','1999-02-09','Normal',0),(3,'shaymitch','shaycation','shaymitchell@gmail.com','1987-04-10','Normal',0),(4,'luigi','0909hhh','luigilacsina@rocketmail.com','1996-10-18','Normal',0),(5,'undefined','piolo','piolosales@gmail.com','1999-10-10','Normal',1),(9,'sashapieterse09','sasha','sashapieterse@forum.com','1980-12-10','Normal',0),(10,'lucyhale','landi','ariamariemontgomery@pll.com','1995-02-12','Normal',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-09 23:38:05
