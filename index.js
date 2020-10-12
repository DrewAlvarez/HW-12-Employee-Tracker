const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table")
const config = require("./logs/config.json")
const funcs = require("./funcs")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: config.myPW,
  database: "employee_trackerDB"
});
  
connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Update Employee Department",
        "Add Role",
        "Remove Role",
        "View Roles",
        "Add Department",
        "Remove Department",
        "View Departments",
        "EXIT"],
      name: "choice"
    }
  ]).then(function(startRes){
    if(startRes.choice === "View All Employees"){
      viewAllEmployees();
    }else if(startRes.choice === "Add Employee"){
      addEmployee();
    }else if(startRes.choice === "Remove Employee"){
      removeEmployee();
    }else if(startRes.choice === "Update Employee Role"){
      updateEmployeeRole();
    }else if(startRes.choice === "Update Empoyee Manager"){
      updateEmployeeManager();
    }else if(startRes.choice === "Update Employee Department"){
      updateEmployeeDepartment();
    }else if(startRes.choice === "Add Role"){
      addRole();
    }else if(startRes.choice === "Remove Role"){
      removeRole();
    }else if(startRes.choice === "View Roles"){
      viewRoles();
    }else if(startRes.choice === "Add Department"){
      addDepartment();
    }else if(startRes.choice === "Remove Department"){
      removeDepartment();
    }else if(startRes.choice === "View Departments"){
      viewDepartment();
    }else{
      connection.end();
    }
  })
}

function viewAllEmployees(){
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, title, name AS department, salary, CONCAT_WS('', emp.first_name, ' ', emp.last_name) as manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee as emp ON employee.manager_id = emp.id;", function(err, data){
    if (err) throw err;
    console.log("\nAll Employees \n")
    console.table(data)
    start();
  });
};
function addEmployee(){
  inquirer
  .prompt([
    {
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
  .then(function(addName){
    let addFirstName = addName.firstName;
    let addLastName = addName.lastName;

    chooseRole(addFirstName, addLastName);
  })
};
function removeEmployee(){
  connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS emp FROM employee;", function(err, data){
    if (err) throw err;
    let empChoices = [];
    for(var i=0; i < data.length; i++){
      empChoices.push(data[i].emp)
    };
    inquirer
    .prompt([
      {
        type: "list",
        message: "Which Employee would you like to remove?",
        choices: empChoices,
        name: "chooseEmp"
      }
    ])
    .then(function(removeEmp){
      let empId = ""
      for(var i =0; i < data.length; i++){
        if (data[i].emp === removeEmp.chooseEmp){
          empId = data[i].id
        }
      }
      connection.query(
        "DELETE FROM employee Where ?",
        {
          id: empId
        },
        function(err,res){
          if(err) throw err;
          console.log(`Employee ${removeEmp.chooseEmp} removed!`)
          start();
        })
    })
  })
};
function updateEmployeeRole(){
  console.log("update employee role");
};
function updateEmployeeManager(){
  console.log("update employee manager");
};
function updateEmployeeDepartment(){
  console.log("update employee department");
};
function addRole(){
  console.log("add role");
};
function removeRole(){
  console.log("remove role");
};
function viewRoles(){
  console.log("view roles");
};
function addDepartment(){
  console.log("add department");
};
function removeDepartment(){
  console.log("remove department");
};
function viewDepartment(){
  console.log("view department");
};

function chooseRole(addFirstName, addLastName){
  connection.query("SELECT id, title FROM role;", function(err, data){
    if (err) throw err;
    let roleChoices = [];
    for(var i=0; i < data.length; i++){
      roleChoices.push(data[i].title)
    }
    inquirer
    .prompt([
      {
        type: "list",
        message: "What is the Employee's Role?",
        choices: roleChoices,
        name: "chooseRole"
      }
    ])
    .then(function(role){
      let addEmpRole = "";
      for(var i =0; i < data.length; i++){
        if(data[i].title === role.chooseRole){
          addEmpRole = data[i].id
        }
      }
      chooseManager(addFirstName, addLastName, addEmpRole);
    })

  })
};
function chooseManager(addFirstName, addLastName, addEmpRole){
  connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS manager FROM employee;", function(err, data){
    if (err) throw err;
    let manChoices = ["No Manager"];
    for(var i=0; i < data.length; i++){
      manChoices.push(data[i].manager)
    }
    inquirer
    .prompt([
      {
        type: "list",
        message: "Who is the Employee's Manager?",
        choices: manChoices,
        name: "chooseMan"
      }
    ])
    .then(function(manager){
      let addEmpMan = null
      for(var i =0; i < data.length; i++){
        if(data[i].manager === manager.chooseMan){
          addEmpMan = data[i].id
        }
      }
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: addFirstName,
          last_name: addLastName,
          role_id: addEmpRole,
          manager_id: addEmpMan
        },
        function(err){
          if (err) throw err;
          start();
        }
      );
    })

  })
}