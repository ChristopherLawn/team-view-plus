const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db');
const { connection } = require('./db');
const consoleTable = require('console.table');

// Main Menu
const mainMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenuOptions',
            message: 'Welcome to TeamView Plus! What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update An Employee Role', 'Exit'],
            default: 'View All Departments'
        }
    ]).then(res => {
        switch (res.choices) {
            case 'View All Departments': viewDepartments();
            break;
            case 'View All Roles': viewRoles();
            break;
            case 'View All Employees': viewEmployees();
            break;
            case 'Add Department': addDepartment();
            break;
            case 'Add Role': addRole();
            break;
            case 'Add Employee': addEmployee();
            break;
            case 'Update An Employee Role': updateRole();
            break;
            case 'Exit App': exitApp();
            break;
        }
    }
)};




function viewDepartments() {
    connection.findAllDepartments()
      .then(([rows]) => {
        let departments = rows;
        console.log("\n");
        console.table(departments);
      })
      .then(() => mainMenu());
};


mainMenu();

// const viewDepartments = () => {
//     const sql = `SELECT * FROM department`;
//     db.query(sql, function(err, res) {
//         if (err) throw err;
//         console.table('All Departments: ', res);
//     })
//     mainMenu();
// };

// const viewRoles = () => {
//     const sql = `SELECT * FROM role`;
// };

// const viewEmployees = () => {
//     const sql = `SELECT * FROM employee`;
// };

// const addDepartment = () => {

// };

// const addRole = () => {

// };

// const addEmployee = () => {

// };

// const updateRole = () => {

// };

// const exitApp = () => {

// };