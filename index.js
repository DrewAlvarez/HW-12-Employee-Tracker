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
        funcs.viewAllEmployees();
        start();
      }else if(startRes.choice === "Add Employee"){
        funcs.addEmployee();
        start();
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

  module.exports = { start }