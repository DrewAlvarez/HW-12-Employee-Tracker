const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table")
const funcs = require("./funcs")
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQLPW,
    database: "employee_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
});
console.log("-------------------------------------------");
console.log(" WELCOME TO THE EMPLOYEE MANAGEMENT SYSTEM")
console.log("-------------------------------------------")

function start() {
    inquirer
        .prompt([{
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View Employees by Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "Add Role",
                "Remove Role",
                "View Roles",
                "Add Department",
                "Remove Department",
                "View Departments",
                "View total utilized budget from a Department",
                "EXIT"
            ],
            name: "choice"
        }]).then(function(startRes) {
            if (startRes.choice === "View All Employees") {
                viewAllEmployees();
            } else if (startRes.choice === "View Employees by Manager") {
                viewEmpManager();
            } else if (startRes.choice === "Add Employee") {
                addEmployee();
            } else if (startRes.choice === "Remove Employee") {
                removeEmployee();
            } else if (startRes.choice === "Update Employee Role") {
                updateEmployeeRole();
            } else if (startRes.choice === "Update Employee Manager") {
                updateEmployeeManager();
            } else if (startRes.choice === "Add Role") {
                addRole();
            } else if (startRes.choice === "Remove Role") {
                removeRole();
            } else if (startRes.choice === "View Roles") {
                viewRoles();
            } else if (startRes.choice === "Add Department") {
                addDepartment();
            } else if (startRes.choice === "Remove Department") {
                removeDepartment();
            } else if (startRes.choice === "View Departments") {
                viewDepartment();
            } else if (startRes.choice === "View total utilized budget from a Department") {
                viewDepartmentBudget();
            } else {
                connection.end();
            }
        })
};

function viewAllEmployees() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, title, name AS department, salary, CONCAT_WS('', emp.first_name, ' ', emp.last_name) as manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee as emp ON employee.manager_id = emp.id;", function(err, data) {
        if (err) throw err;
        console.log("\nAll Employees \n")
        console.table(data)
        start();
    });
};

function viewEmpManager() {
    connection.query("SELECT CONCAT(emp.first_name, ' ', emp.last_name) as manager, employee.id, employee.first_name, employee.last_name, title, name AS department, salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee as emp ON employee.manager_id = emp.id ORDER BY manager DESC;", function(err, data) {
        if (err) throw err;
        console.log("\nAll Employees by Manager\n")
        console.table(data)
        start();
    });
};

function addEmployee() {
    inquirer
        .prompt([{
                type: "input",
                message: "What is the Employee's First Name?",
                name: "firstName"
            },
            {
                type: "input",
                message: "What is the Employee's Last Name?",
                name: "lastName"
            },
        ])
        .then(function(addName) {
            let addFirstName = addName.firstName;
            let addLastName = addName.lastName;

            chooseRole(addFirstName, addLastName);
        })
};

function removeEmployee() {
    connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS emp FROM employee;", function(err, data) {
        if (err) throw err;
        let empChoices = [];
        for (var i = 0; i < data.length; i++) {
            empChoices.push(data[i].emp)
        };
        inquirer
            .prompt([{
                type: "list",
                message: "Which Employee would you like to remove?",
                choices: empChoices,
                name: "chooseEmp"
            }])
            .then(function(removeEmp) {
                let empId = ""
                for (var i = 0; i < data.length; i++) {
                    if (data[i].emp === removeEmp.chooseEmp) {
                        empId = data[i].id
                    }
                }
                connection.query(
                    "DELETE FROM employee Where ?", {
                        id: empId
                    },
                    function(err, res) {
                        if (err) throw err;
                        console.log(`\nEmployee ${removeEmp.chooseEmp} removed!\n`)
                        start();
                    })
            })
    })
};

function updateEmployeeRole() {
    connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS emp FROM employee;", function(err, data) {
        if (err) throw err;
        let empChoices = [];
        for (var i = 0; i < data.length; i++) {
            empChoices.push(data[i].emp)
        };
        inquirer
            .prompt([{
                type: "list",
                message: "Which Employee do you wish to update Role?",
                choices: empChoices,
                name: "updateEmp"
            }])
            .then(function(newRole) {
                let empId = "";
                for (var i = 0; i < data.length; i++) {
                    if (data[i].emp === newRole.updateEmp) {
                        empId = data[i].id
                    }
                }
                updateRole(empId);
            })
    })
};

function updateEmployeeManager() {
    connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS emp FROM employee;", function(err, data) {
        if (err) throw err;
        let empChoices = [];
        for (var i = 0; i < data.length; i++) {
            empChoices.push(data[i].emp)
        };
        inquirer
            .prompt([{
                type: "list",
                message: "Which Employee do you wish to update the Manager?",
                choices: empChoices,
                name: "updateEmp"
            }])
            .then(function(newRole) {
                let empId = "";
                for (var i = 0; i < data.length; i++) {
                    if (data[i].emp === newRole.updateEmp) {
                        empId = data[i].id
                    }
                }
                updateManager(empId);
            })
    })
};

function addRole() {
    connection.query("SELECT * FROM department;", function(err, data) {
        if (err) throw err;
        let depoChoices = [];
        for (var i = 0; i < data.length; i++) {
            depoChoices.push(data[i].name)
        }
        inquirer
            .prompt([{
                    type: "input",
                    message: "What is the Role Title?",
                    name: "title"
                },
                {
                    type: "Input",
                    message: "What is the Salary for the Role?",
                    name: "salary"
                },
                {
                    type: "list",
                    message: "Which Department does the Role belong?",
                    choices: depoChoices,
                    name: "chooseDepo"
                }
            ])
            .then(function(addRole) {
                let roleDepoId = "";
                for (var i = 0; i < data.length; i++) {
                    if (addRole.chooseDepo === data[i].name) {
                        roleDepoId = data[i].id
                    }
                }
                connection.query(
                    "INSERT INTO role SET ?", {
                        title: addRole.title,
                        salary: addRole.salary,
                        department_id: roleDepoId
                    },
                    function(err, res) {
                        if (err) throw err;
                        console.log(`\n${addRole.title} added to Roles!\n`);
                        start();
                    })
            })
    })
};

function removeRole() {
    connection.query("SELECT id, title FROM role;", function(err, data) {
        if (err) throw err;
        let roleChoices = [];
        for (var i = 0; i < data.length; i++) {
            roleChoices.push(data[i].title)
        }
        inquirer
            .prompt([{
                type: "list",
                message: "Which Role would you like to remove?",
                choices: roleChoices,
                name: "removeRole"
            }])
            .then(function(remRole) {
                let roleId = ""
                for (var i = 0; i < data.length; i++) {
                    if (data[i].title === remRole.removeRole) {
                        roleId = data[i].id
                    }
                }
                connection.query(
                    "DELETE FROM role Where ?", {
                        id: roleId
                    },
                    function(err, res) {
                        if (err) throw err;
                        console.log(`\nRole of ${remRole.removeRole} removed!\n`)
                        start();
                    })
            })
    })
};

function viewRoles() {
    connection.query("SELECT * FROM role;", function(err, data) {
        if (err) throw err;
        console.table(data)
        start();
    })
};

function addDepartment() {
    inquirer
        .prompt([{
            type: "input",
            message: "What is the Name of the Department you wish to add?",
            name: "addDepo"
        }])
        .then(function(depoAdd) {
            connection.query(
                "INSERT INTO department SET ?", { name: depoAdd.addDepo },
                function(err, data) {
                    if (err) throw err;
                    console.log(`\n${depoAdd.addDepo} added to Departments\n`);
                    start();
                })
        })
};

function removeDepartment() {
    connection.query("SELECT id, name FROM department;", function(err, data) {
        if (err) throw err;
        let depoChoices = [];
        for (var i = 0; i < data.length; i++) {
            depoChoices.push(data[i].name)
        }
        inquirer
            .prompt([{
                type: "list",
                message: "Which Department would you like to remove?",
                choices: depoChoices,
                name: "removeDepo"
            }])
            .then(function(remDepo) {
                let depoId = ""
                for (var i = 0; i < data.length; i++) {
                    if (data[i].name === remDepo.removeDepo) {
                        depoId = data[i].id
                    }
                }
                connection.query(
                    "DELETE FROM department Where ?", {
                        id: depoId
                    },
                    function(err, res) {
                        if (err) throw err;
                        console.log(`\nDepartment of ${remDepo.removeDepo} removed!\n`)
                        start();
                    })
            })
    })
};

function viewDepartment() {
    connection.query("SELECT * FROM department;", function(err, data) {
        if (err) throw err;
        console.table(data)
        start();
    })
};

function chooseRole(addFirstName, addLastName) {
    connection.query("SELECT id, title FROM role;", function(err, data) {
        if (err) throw err;
        let roleChoices = [];
        for (var i = 0; i < data.length; i++) {
            roleChoices.push(data[i].title)
        }
        inquirer
            .prompt([{
                type: "list",
                message: "What is the Employee's Role?",
                choices: roleChoices,
                name: "chooseRole"
            }])
            .then(function(role) {
                let addEmpRole = "";
                for (var i = 0; i < data.length; i++) {
                    if (data[i].title === role.chooseRole) {
                        addEmpRole = data[i].id
                    }
                }
                chooseManager(addFirstName, addLastName, addEmpRole);
            })

    })
};

function chooseManager(addFirstName, addLastName, addEmpRole) {
    connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS manager FROM employee;", function(err, data) {
        if (err) throw err;
        let manChoices = ["No Manager"];
        for (var i = 0; i < data.length; i++) {
            manChoices.push(data[i].manager)
        }
        inquirer
            .prompt([{
                type: "list",
                message: "Who is the Employee's Manager?",
                choices: manChoices,
                name: "chooseMan"
            }])
            .then(function(manager) {
                let addEmpMan = null
                for (var i = 0; i < data.length; i++) {
                    if (data[i].manager === manager.chooseMan) {
                        addEmpMan = data[i].id
                    }
                }
                connection.query(
                    "INSERT INTO employee SET ?", {
                        first_name: addFirstName,
                        last_name: addLastName,
                        role_id: addEmpRole,
                        manager_id: addEmpMan
                    },
                    function(err) {
                        if (err) throw err;
                        console.log(`\n${addFirstName} ${addLastName} added to Employees!\n`)
                        start();
                    }
                );
            })

    })
};

function updateRole(empId) {
    connection.query("SELECT id, title FROM role;", function(err, data) {
        if (err) throw err;
        let roleChoices = [];
        for (var i = 0; i < data.length; i++) {
            roleChoices.push(data[i].title)
        }
        inquirer
            .prompt([{
                type: "list",
                message: "What is the Role You wish to update the Employee to?",
                choices: roleChoices,
                name: "chooseRole"
            }])
            .then(function(role) {
                let addEmpRole = "";
                for (var i = 0; i < data.length; i++) {
                    if (data[i].title === role.chooseRole) {
                        addEmpRole = data[i].id
                    }
                }
                connection.query(
                    "UPDATE employee SET ? WHERE ?", [{
                            role_id: addEmpRole
                        },
                        {
                            id: empId
                        }
                    ],
                    function(err, res) {
                        if (err) throw err;
                        console.log(`\nEmployee role updated to ${role.chooseRole}!\n`)
                        start();
                    })
            })

    })
};

function updateManager(empId) {
    connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS manager FROM employee;", function(err, data) {
        if (err) throw err;
        let manChoices = ["No manager"];
        for (var i = 0; i < data.length; i++) {
            if (data[i].id !== empId) {
                manChoices.push(data[i].manager)
            }
        }
        inquirer
            .prompt([{
                type: "list",
                message: "Who is the new Manager for the Employee?",
                choices: manChoices,
                name: "chooseMan"
            }])
            .then(function(man) {
                let addEmpMan = null;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].manager === man.chooseMan) {
                        addEmpMan = data[i].id
                    }
                }
                connection.query(
                    "UPDATE employee SET ? WHERE ?", [{
                            manager_id: addEmpMan
                        },
                        {
                            id: empId
                        }
                    ],
                    function(err, res) {
                        if (err) throw err;
                        console.log(`\nEmployee manager updated to ${man.chooseMan}!\n`)
                        start();
                    })
            })

    })
};

function viewDepartmentBudget() {
    connection.query("SELECT id, name FROM department;", function(err, data) {
        if (err) throw err;
        let depoChoices = [];
        for (var i = 0; i < data.length; i++) {
            depoChoices.push(data[i].name)
        }
        inquirer
            .prompt([{
                type: "list",
                message: "Which Department budget would you like to view?",
                choices: depoChoices,
                name: "depoBudget"
            }])
            .then(function(budget) {
                let totalBudget = 0;
                connection.query(
                    "SELECT employee.id, name, salary FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id",
                    function(err, res) {
                        if (err) throw err;
                        for (var i = 0; i < res.length; i++) {
                            if (budget.depoBudget === res[i].name) {
                                totalBudget += res[i].salary
                            }
                        }

                        console.log(`\nTotal Utilised budget for ${budget.depoBudget} is $${totalBudget}!\n`)
                        start();
                    })
            })
    })
}