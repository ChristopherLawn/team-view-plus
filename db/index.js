// Required dependency
const connection = require('./connection');

// Creates class constructor functions for 'server.js' to refer to and utilize
class DB {
    // Keeping a reference to the connection on the class in case it is needed later
    constructor(connection) {
        this.connection = connection;
    }

    // Find and display all departments
    findAllDepartments() {
        return this.connection.promise().query(
            `SELECT * FROM department;`
        );
    }

    // Find all roles and join with departments to display the role titles, ID numbers, department names, and salaries
    findAllRoles() {
        return this.connection.promise().query("SELECT role.title, role.id, department.dept_name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id");
    }

    // Find all employees and join with roles and departments to display their roles, salaries, departments, and managers
    findAllEmployees() {
        return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.dept_name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id;");
    }

    // Inserts the data for the newly created role into the 'role' table
    createRole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?", role)
    }

    // Inserts the data for the newly created employee into the 'employee' table
    createEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee)
    }
}

// Exports the class constructor functions
module.exports = new DB(connection);