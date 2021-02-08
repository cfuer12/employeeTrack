USE tracker_db;

INSERT INTO department (name) VALUES ("Corporate");
INSERT INTO department (name) VALUES ("Data Analyst");
INSERT INTO department (name) VALUES ("Development");

INSERT INTO role (title, salary, department_id) VALUES ("Senior Director", "200000", "1");
INSERT INTO role (title, salary, department_id) VALUES ("Analyst Intern", "40000", "2");
INSERT INTO role (title, salary, department_id) VALUES ("Senior Analyst", "150000", "3");
INSERT INTO role (title, salary, department_id) VALUES ("Director", "120000", "4");
INSERT INTO role (title, salary, department_id) VALUES ("Junior Developer", "70000", "5");

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Carlos", "Fuerte", "5", "4");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Tate", "Kinsella", "2", "3");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Julia", "Catherine", "1", NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Tafari", "Deguma", "3", "1");
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Alan", "Figueroa", "4", "1");

