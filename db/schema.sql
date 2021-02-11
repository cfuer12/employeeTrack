drop database if exists tracker_db;

create database tracker_db;

use tracker_db;

CREATE TABLE department (
  id INT auto_increment,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT auto_increment,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (10,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT auto_increment,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);

INSERT INTO department (name) VALUES ("Corporate");
INSERT INTO department (name) VALUES ("Data Analyst");
INSERT INTO department (name) VALUES ("Development");

INSERT INTO role (title, salary, department_id) VALUES ("Senior Director", "90000", "1");
INSERT INTO role (title, salary, department_id) VALUES ("Analyst Intern", "40000", "2");
INSERT INTO role (title, salary, department_id) VALUES ("Senior Analyst", "80000", "2");
INSERT INTO role (title, salary, department_id) VALUES ("Director", "85000", "3");
INSERT INTO role (title, salary, department_id) VALUES ("Junior Developer", "70000", "3");

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Carlos", "Fuerte", "5", "5");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Tate", "Kinsella", "2", "4");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Julia", "Catherine", "1", NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Tafari", "Deguma", "3", "3");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Alan", "Figueroa", "4", "3");

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;