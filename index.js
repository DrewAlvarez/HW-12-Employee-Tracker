var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table")
var config = require("./logs/config.json")

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
      console.log(startRes.choice)
      // if(startRes.choice === "View All Employees"){
      //   viewAllEmployees();
      // }else if(startRes.choice === "Add Employee"){
      //   addEmployee();
      // }else if(startRes.choice === "Remove Employee"){
      //   removeEmployee();
      // }else if(startRes.choice === "Update Employee Role"){
      //   updateEmployeeRole();
      // }else if(startRes.choice === "Update Empoyee Manager"){
      //   updateEmployeeManager();
      // }else if(startRes.choice === "Update Employee Department"){
      //   updateEmployeeDepartment();
      // }else if(startRes.choice === "Add Role"){
      //   addRole();
      // }else if(startRes.choice === "Remove Role"){
      //   removeRole();
      // }else if(startRes.choice === "View Roles"){
      //   viewRoles();
      // }else if(startRes.choice === "Add Department"){
      //   addDepartment();
      // }else if(startRes.choice === "Remove Department"){
      //   removeDepartment();
      // }else if(startRes.choice === "View Departments"){
      //   viewDepartment();
      // }else{
      //   connection.end();
      // }
    })
  }