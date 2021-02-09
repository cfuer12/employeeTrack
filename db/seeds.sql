USE tracker_db;

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

