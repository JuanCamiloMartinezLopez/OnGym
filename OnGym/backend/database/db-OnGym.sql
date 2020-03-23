
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `ongymdb` DEFAULT CHARACTER SET utf8 ;
USE `ongymdb` ;

DROP TABLE IF EXISTS `ongymdb`.`Trainer` ;

CREATE TABLE IF NOT EXISTS `ongymdb`.`Trainer` (
  `idTrainer` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `names` VARCHAR(30) NOT NULL,
  `surname` VARCHAR(20) NOT NULL,
  `secondsurname` VARCHAR(20) NOT NULL,
  `mail` VARCHAR(40) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `nAthletes` INT UNSIGNED,
  PRIMARY KEY (`idTrainer`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `ongymdb`.`Athlete` ;

CREATE TABLE IF NOT EXISTS `ongymdb`.`Athlete` (
  `idAthlete` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `names` VARCHAR(30) NOT NULL,
  `surname` VARCHAR(20) NOT NULL,
  `secondsurname` VARCHAR(20) NOT NULL,
  `mail` VARCHAR(40) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `address` VARCHAR(50) NULL,
  `phone` VARCHAR(15) NULL,
  `weight` FLOAT(5,2) UNSIGNED NULL,
  `height` FLOAT(3,2) UNSIGNED NULL,
  `idTrainerA` INT UNSIGNED NULL,
  PRIMARY KEY (`idAthlete`),
  INDEX `idTrainerA` (`idTrainerA` ASC) VISIBLE,
  CONSTRAINT `idTrainerA`
    FOREIGN KEY (`idTrainerA`)
    REFERENCES `ongymdb`.`Trainer` (`idTrainer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `ongymdb`.`Routines` ;

CREATE TABLE IF NOT EXISTS `ongymdb`.`Routines` (
  `idRoutines` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `price` INT NOT NULL,
  `idTrainerR` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idRoutines`),
  INDEX `idTrainerR` (`idTrainerR` ASC) VISIBLE,
  CONSTRAINT `idTrainerR`
    FOREIGN KEY (`idTrainerR`)
    REFERENCES `ongymdb`.`Trainer` (`idTrainer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `ongymdb`.`Exercises` ;

CREATE TABLE IF NOT EXISTS `ongymdb`.`Exercises` (
  `idExercises` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `image` MEDIUMBLOB NOT NULL,
  `repetitions` INT NULL,
  `set` INT NULL,
  `description` VARCHAR(140) NOT NULL,
  PRIMARY KEY (`idExercises`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS `ongymdb`.`Routines_has_Exercises` ;

CREATE TABLE IF NOT EXISTS `ongymdb`.`Routines_has_Exercises` (
  `Routines_idRoutines` INT UNSIGNED NOT NULL,
  `Exercises_idExercises` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`Routines_idRoutines`, `Exercises_idExercises`),
  INDEX `fk_Routines_has_Exercises_Exercises1` (`Exercises_idExercises` ASC) VISIBLE,
  INDEX `fk_Routines_has_Exercises_Routines1` (`Routines_idRoutines` ASC) VISIBLE,
  CONSTRAINT `fk_Routines_has_Exercises_Routines1`
    FOREIGN KEY (`Routines_idRoutines`)
    REFERENCES `ongymdb`.`Routines` (`idRoutines`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Routines_has_Exercises_Exercises1`
    FOREIGN KEY (`Exercises_idExercises`)
    REFERENCES `ongymdb`.`Exercises` (`idExercises`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;