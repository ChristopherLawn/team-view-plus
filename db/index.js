const connection = require('./connection');

class DB {
    // Keeping a reference to the connection on the class in case we need it later
    constructor(connection) {
      this.connection = connection;
    }
  
    // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
findAllDepartments() {
    return this.connection.promise().query(
        `SELECT department.id, department.name FROM department;`
     );
   }
}
  
  module.exports = new DB(connection);