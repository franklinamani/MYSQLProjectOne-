-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 13, 2016 at 01:04 PM
-- Server version: 5.5.46-0ubuntu0.14.04.2
-- PHP Version: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Lab1`
--

-- --------------------------------------------------------

--
-- Table structure for table `A`
--

CREATE TABLE IF NOT EXISTS `A` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Word` varchar(16) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=20 ;

--
-- Dumping data for table `A`
--

INSERT INTO `A` (`ID`, `Word`) VALUES
(1, 'FLUTES'),
(2, 'STEAKS'),
(3, 'IDES'),
(4, 'TEST'),
(5, 'IDEA'),
(6, 'ECLAIR'),
(7, 'TAU'),
(8, 'FAQ'),
(9, 'AMORETTO'),
(10, 'TOAST'),
(11, 'RIB'),
(12, 'ELK'),
(13, 'STORE'),
(14, 'TBSP'),
(15, 'BETAS'),
(16, 'ORCA'),
(17, 'OPT'),
(18, 'SPLAT'),
(19, 'SANTA');

-- --------------------------------------------------------

--
-- Table structure for table `B`
--

CREATE TABLE IF NOT EXISTS `B` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Word` varchar(16) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=20 ;

--
-- Dumping data for table `B`
--

INSERT INTO `B` (`ID`, `Word`) VALUES
(1, 'CADET'),
(2, 'LAST'),
(3, 'TWEET'),
(4, 'TIE'),
(5, 'PREYS'),
(6, 'UPKEEP'),
(7, 'BALSA'),
(8, 'OMIT'),
(9, 'CIG'),
(10, 'ASIAN'),
(11, 'RSVP'),
(12, 'FULL'),
(13, 'GNAW'),
(14, 'ARENA'),
(15, 'BABU'),
(16, 'FLEE'),
(17, 'BERMUDATRIANGLE'),
(18, 'BACKTOSQUAREONE'),
(19, 'ANNE');

-- --------------------------------------------------------

--
-- Table structure for table `C`
--

CREATE TABLE IF NOT EXISTS `C` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Word` varchar(16) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=119 ;

--
-- Dumping data for table `C`
--

INSERT INTO `C` (`ID`, `Word`) VALUES
(100, 'ASAP'),
(101, 'SACS'),
(102, 'SAKE'),
(103, 'TALE'),
(104, 'FEST'),
(105, 'HERR'),
(106, 'DARNS'),
(107, 'LEER'),
(108, 'ROOFTOP'),
(109, 'CABAL'),
(110, 'OGLE'),
(111, 'LICK'),
(112, 'HOAR'),
(113, 'CIRCLEOFFRIENDS'),
(114, 'EMMET'),
(115, 'TURGENEV'),
(116, 'ASEA'),
(117, 'SALES'),
(118, 'ARAMAIC');

-- --------------------------------------------------------

--
-- Table structure for table `D`
--

CREATE TABLE IF NOT EXISTS `D` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Word` varchar(16) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=9019 ;

--
-- Dumping data for table `D`
--

INSERT INTO `D` (`ID`, `Word`) VALUES
(9000, 'ITS'),
(9001, 'ANTES'),
(9002, 'SOLO'),
(9003, 'OSCARS'),
(9004, 'RASP'),
(9005, 'LOGOFF'),
(9006, 'THERE'),
(9007, 'BOOST'),
(9008, 'LORE'),
(9009, 'ONTO'),
(9010, 'RNA'),
(9011, 'ALI'),
(9012, 'ERIN'),
(9013, 'TOOL'),
(9014, 'THIRSTY'),
(9015, 'NOSH'),
(9016, 'YEAH'),
(9017, 'IFFY'),
(9018, 'ANNA');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
