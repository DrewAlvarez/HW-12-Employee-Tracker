    const start = require("./index")
    function viewAllEmployees(){
        console.log("view employees");
    };
    function addEmployee(){
        console.log("add employee");
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

module.exports = { viewAllEmployees, addEmployee, removeEmployee, updateEmployeeRole, updateEmployeeManager, updateEmployeeDepartment, addRole, removeRole, viewRoles, addDepartment, removeDepartment, viewDepartment }