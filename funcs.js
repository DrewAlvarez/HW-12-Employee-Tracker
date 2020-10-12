    const start = require("./index")
    function viewAllEmployees(){
        connection.query("SELECT employee.id, employee.first_name, employee.last_name, title, name AS department, salary, CONCAT_WS('', emp.first_name, ' ', emp.last_name) as manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id INNER JOIN employee as emp ON employee.manager_id = emp.id;", function(err, data){
            if (err) throw err;
            console.table(data)
        });
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