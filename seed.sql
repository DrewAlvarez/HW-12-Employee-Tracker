--Initialize the database with MYSQL
DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;
USE employee_trackerDB;

CREATE TABLE department(
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role(
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT
);

CREATE TABLE employee(
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL
);

--Some starter departments/roles/emplyoees should you wish to use them

INSERT INTO department (name) VALUE ("Sales");
INSERT INTO department (name) VALUE ("Payroll");

INSERT INTO role (title, salary, department_id) VALUE ("Checker", 25000.00, 1);
INSERT INTO role (title, salary, department_id) VALUE ("Clerk", 35000.00, 2);
INSERT INTO role (title, salary, department_id) VALUE ("Manager", 45000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("Kiera", "Marks", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("Jeb", "Lynx", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("Katherine", "Ford", 2, 1);