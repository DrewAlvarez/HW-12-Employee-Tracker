--Some starter departments/roles/emplyoees should you wish to use them

INSERT INTO department (name) VALUE ("Sales");
INSERT INTO department (name) VALUE ("Payroll");

INSERT INTO role (title, salary, department_id) VALUE ("Checker", 25000.00, 1);
INSERT INTO role (title, salary, department_id) VALUE ("Clerk", 35000.00, 2);
INSERT INTO role (title, salary, department_id) VALUE ("Manager", 45000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("Kiera", "Marks", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("Jeb", "Lynx", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("Katherine", "Ford", 2, 1);