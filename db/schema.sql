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

SELECT employee.id AS `ID`, CONCAT_WS(', ', employee.last_name, employee.first_name) AS `Name`, role.title AS `Role`, role.salary AS `Salary`, department.name AS `Department`, CONCAT_WS(', ', managerInfo.last_name, managerInfo.first_name) AS `Manager`
FROM employee
RIGHT JOIN role ON employee.role_id = role.id
LEFT JOIN department on role.department_id = department.id
LEFT JOIN employee AS managerInfo on employee.manager_id = managerInfo.id;

SELECT role.id AS `ID`,  role.title AS `Role`, role.salary AS `Salary`, department.name AS `Department`
FROM role
INNER JOIN department on role.department_id = department.id;

-- SELECT * FROM department;
-- SELECT * FROM role;
-- SELECT * FROM employee;