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
      funcs.removeEmployee();
      start();
    }else if(startRes.choice === "Update Employee Role"){
      funcs.updateEmployeeRole();
      start();
    }else if(startRes.choice === "Update Empoyee Manager"){
      funcs.updateEmployeeManager();
      start();
    }else if(startRes.choice === "Update Employee Department"){
      funcs.updateEmployeeDepartment();
      start();
    }else if(startRes.choice === "Add Role"){
      funcs.addRole();
      start();
    }else if(startRes.choice === "Remove Role"){
      funcs.removeRole();
      start();
    }else if(startRes.choice === "View Roles"){
      funcs.viewRoles();
      start();
    }else if(startRes.choice === "Add Department"){
      funcs.addDepartment();
      start();
    }else if(startRes.choice === "Remove Department"){
      funcs.removeDepartment();
      start();
    }else if(startRes.choice === "View Departments"){
      funcs.viewDepartment();
      start();
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
    let addLastName = addName.LastName;

    chooseRole();
  })
};
function removeEmployee(){
  console.log("remove employee");
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

function chooseRole(){
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
      let addEmpRole
      for(var i =0; i < data.length; i++){
        if(data[i].title === role.chooseRole){
          addEmpRole = data[i].id
          return
        }
      }
      chooseManager();
    })

  })
};
function chooseManager(){
  connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS manager FROM employee;", function(err, manData){
    if (err) throw err;
    let manChoices = ["No Manager"];
    for(var i=0; i < manData.length; i++){
      manChoices.push(manData[i].manager)
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
    .then(function(role){
      let addEmpMan
      for(var i =0; i < data.length; i++){
        if(manData[i].manager === role.chooseMan){
          addEmpRole = manData[i].id
          return
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