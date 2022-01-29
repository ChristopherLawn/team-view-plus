const connection = require('./connection');

class DB {
    // Keeping a reference to the connection on the class in case we need it later
    constructor(connection) {
      this.connection = connection;
    }
  
    // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
findAllDepartments() {
    return this.connection.promise().query(
        `SELECT * FROM department;`
     );
   }

   findAllRoles(){
       return this.connection.promise().query("SELECT role.title, role.id, department.name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id");
   }

   findAllEmployees(){
    return this.connection.promise().query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id;");
   }

   createRole(role){
       return this.connection.promise().query("INSERT INTO role SET ?", role)
   }

   createEmployee(employee){
       return this.connection.promise().query("INSERT INTO employee SET ?", employee)
   }
}
  
  module.exports = new DB(connection);