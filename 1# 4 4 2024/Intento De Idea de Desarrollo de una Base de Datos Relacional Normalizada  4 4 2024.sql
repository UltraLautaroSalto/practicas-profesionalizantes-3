-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Primer_Intento_Trabajo_4_4_2024
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Primer_Intento_Trabajo_4_4_2024
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Primer_Intento_Trabajo_4_4_2024` DEFAULT CHARACTER SET utf8 ;
USE `Primer_Intento_Trabajo_4_4_2024` ;

-- -----------------------------------------------------
-- Table `Primer_Intento_Trabajo_4_4_2024`.`Provincia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Primer_Intento_Trabajo_4_4_2024`.`Provincia` (
  `id_Prov` INT NOT NULL,
  `Nombre_Prov` VARCHAR(45) NULL,
  PRIMARY KEY (`id_Prov`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Primer_Intento_Trabajo_4_4_2024`.`Departamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Primer_Intento_Trabajo_4_4_2024`.`Departamento` (
  `id_Dep` INT NOT NULL,
  `Nombre_Dep` VARCHAR(45) NULL,
  `Provincia_id_Prov` INT NOT NULL,
  PRIMARY KEY (`id_Dep`),
  INDEX `fk_Departamento_Provincia1_idx` (`Provincia_id_Prov` ASC) VISIBLE,
  CONSTRAINT `fk_Departamento_Provincia1`
    FOREIGN KEY (`Provincia_id_Prov`)
    REFERENCES `Primer_Intento_Trabajo_4_4_2024`.`Provincia` (`id_Prov`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Primer_Intento_Trabajo_4_4_2024`.`Municipio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Primer_Intento_Trabajo_4_4_2024`.`Municipio` (
  `id_Mun` INT NOT NULL,
  `Nombre_Mun` VARCHAR(45) NULL,
  `Departamento_id_Dep` INT NOT NULL,
  PRIMARY KEY (`id_Mun`),
  INDEX `fk_Municipio_Departamento1_idx` (`Departamento_id_Dep` ASC) VISIBLE,
  CONSTRAINT `fk_Municipio_Departamento1`
    FOREIGN KEY (`Departamento_id_Dep`)
    REFERENCES `Primer_Intento_Trabajo_4_4_2024`.`Departamento` (`id_Dep`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Primer_Intento_Trabajo_4_4_2024`.`Localidad`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Primer_Intento_Trabajo_4_4_2024`.`Localidad` (
  `id_Loc` INT NOT NULL,
  `Nombre_Loc` VARCHAR(45) NULL,
  `Longitud` VARCHAR(45) NULL,
  `Latitud` VARCHAR(45) NULL,
  `Codigo_UTA_2010` VARCHAR(45) NULL,
  `Codigo_UTA_2020` VARCHAR(45) NULL,
  `Municipio_id_Mun` INT NOT NULL,
  PRIMARY KEY (`id_Loc`),
  INDEX `fk_Localidad_Municipio_idx` (`Municipio_id_Mun` ASC) VISIBLE,
  CONSTRAINT `fk_Localidad_Municipio`
    FOREIGN KEY (`Municipio_id_Mun`)
    REFERENCES `Primer_Intento_Trabajo_4_4_2024`.`Municipio` (`id_Mun`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
