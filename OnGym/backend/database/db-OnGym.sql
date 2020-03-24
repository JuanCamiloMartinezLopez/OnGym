SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema proyectoFIS
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema proyectoFIS
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ongymdb` DEFAULT CHARACTER SET utf8 ;
USE `ongymdb` ;

-- -----------------------------------------------------
-- Table `proyectoFIS`.`Trainer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ongymdb`.`Trainer` ;

CREATE TABLE IF NOT EXISTS `ongymdb`.`Trainer` (
  `idTrainer` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `names` VARCHAR(30) NOT NULL,
  `surname` VARCHAR(20) NOT NULL,
  `secondsurname` VARCHAR(20) NOT NULL,
  `mail` VARCHAR(40) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idTrainer`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectoFIS`.`Athlete`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ongymdb`.`Athlete` ;

CREATE TABLE IF NOT EXISTS `ongymdb`.`Athlete` (
  `idAthlete` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `names` VARCHAR(30) NOT NULL,
  `surname` VARCHAR(20) NOT NULL,
  `secondsurname` VARCHAR(20) NOT NULL,
  `mail` VARCHAR(40) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `address` VARCHAR(50) NULL DEFAULT NULL,
  `phone` VARCHAR(15) NULL DEFAULT NULL,
  `weight` FLOAT(5,2) UNSIGNED NULL DEFAULT NULL,
  `height` FLOAT(3,2) UNSIGNED NULL DEFAULT NULL,
  `Trainer_idTrainer` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`idAthlete`),
  INDEX `fk_Athlete_Trainer_idx` (`Trainer_idTrainer` ASC) VISIBLE,
  CONSTRAINT `fk_Athlete_Trainer`
    FOREIGN KEY (`Trainer_idTrainer`)
    REFERENCES `ongymdb`.`Trainer` (`idTrainer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectoFIS`.`Routines`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ongymdb`.`Routines` ;

CREATE TABLE IF NOT EXISTS `ongymdb`.`Routines` (
  `idRoutines` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `price` INT NOT NULL,
  `Athlete_idAthlete` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idRoutines`),
  INDEX `fk_Routines_Athlete1_idx` (`Athlete_idAthlete` ASC) VISIBLE,
  CONSTRAINT `fk_Routines_Athlete1`
    FOREIGN KEY (`Athlete_idAthlete`)
    REFERENCES `ongymdb`.`Athlete` (`idAthlete`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectoFIS`.`Routines_has_Athlete`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ongymdb`.`Routines_has_Athlete` ;

CREATE TABLE IF NOT EXISTS `ongymdb`.`Routines_has_Athlete` (
  `Athlete_idAthlete` INT UNSIGNED NOT NULL,
  `Routines_idRoutines` INT UNSIGNED NOT NULL,
  INDEX `fk_Routines_has_Athlete_Athlete1_idx` (`Athlete_idAthlete` ASC) VISIBLE,
  INDEX `fk_Routines_has_Athlete_Routines1_idx` (`Routines_idRoutines` ASC) VISIBLE,
  CONSTRAINT `fk_Routines_has_Athlete_Athlete1`
    FOREIGN KEY (`Athlete_idAthlete`)
    REFERENCES `ongymdb`.`Athlete` (`idAthlete`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Routines_has_Athlete_Routines1`
    FOREIGN KEY (`Routines_idRoutines`)
    REFERENCES `ongymdb`.`Routines` (`idRoutines`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectoFIS`.`Trainer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ongymdb`.`Trainer` ;

CREATE TABLE IF NOT EXISTS `ongymdb`.`Trainer` (
  `idTrainer` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `names` VARCHAR(30) NOT NULL,
  `surname` VARCHAR(20) NOT NULL,
  `secondsurname` VARCHAR(20) NOT NULL,
  `mail` VARCHAR(40) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idTrainer`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectoFIS`.`Athlete`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ongymdb`.`Athlete` ;

CREATE TABLE IF NOT EXISTS `ongymdb`.`Athlete` (
  `idAthlete` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `names` VARCHAR(30) NOT NULL,
  `surname` VARCHAR(20) NOT NULL,
  `secondsurname` VARCHAR(20) NOT NULL,
  `mail` VARCHAR(40) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `address` VARCHAR(50) NULL DEFAULT NULL,
  `phone` VARCHAR(15) NULL DEFAULT NULL,
  `weight` FLOAT(5,2) UNSIGNED NULL DEFAULT NULL,
  `height` FLOAT(3,2) UNSIGNED NULL DEFAULT NULL,
  `Trainer_idTrainer` INT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`idAthlete`),
  INDEX `fk_Athlete_Trainer_idx` (`Trainer_idTrainer` ASC) VISIBLE,
  CONSTRAINT `fk_Athlete_Trainer`
    FOREIGN KEY (`Trainer_idTrainer`)
    REFERENCES `ongymdb`.`Trainer` (`idTrainer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectoFIS`.`Routines`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ongymdb`.`Routines` ;

CREATE TABLE IF NOT EXISTS `ongymdb`.`Routines` (
  `idRoutines` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `price` INT NOT NULL,
  `Athlete_idAthlete` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idRoutines`),
  INDEX `fk_Routines_Athlete1_idx` (`Athlete_idAthlete` ASC) VISIBLE,
  CONSTRAINT `fk_Routines_Athlete1`
    FOREIGN KEY (`Athlete_idAthlete`)
    REFERENCES `ongymdb`.`Athlete` (`idAthlete`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectoFIS`.`Exercises`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ongymdb`.`Exercises` ;

CREATE TABLE IF NOT EXISTS `ongymdb`.`Exercises` (
  `idExercises` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `image` VARCHAR(200) NOT NULL,
  `description` VARCHAR(140) NOT NULL,
  `repetitions` INT NOT NULL,
  `set` INT NOT NULL,
  PRIMARY KEY (`idExercises`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectoFIS`.`Routines_has_Exercises`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ongymdb`.`Routines_has_Exercises` ;

CREATE TABLE IF NOT EXISTS `ongymdb`.`Routines_has_Exercises` (
  `Routines_idRoutines` INT UNSIGNED NOT NULL,
  `Exercises_idExercises` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`Routines_idRoutines`),
  INDEX `fk_Routines_has_Exercises_Routines1_idx` (`Routines_idRoutines` ASC) VISIBLE,
  INDEX `fk_Routines_has_Exercises_Exercises1_idx` (`Exercises_idExercises` ASC) VISIBLE,
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
