const mysql = require('mysql2');
const inquirer = require('inquirer');
// const db = require('./db/connection.js');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Ru$$1anV0dka',
        database: 'company'
    },
    console.log('Connected to the company database.')
);

// app();
db;
// Main Menu
const mainMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenuOptions',
            message: 'Welcome to TeamView Plus! What would you like to do?',
            choices: ['View All Deparments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update An Employee Role', 'Exit'],
            default: 'View All Departments'
        }
    ]).then(function(answer) {
        switch (answer.action) {
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

mainMenu();

const viewDepartments = () => {
    const sql = `SELECT * FROM department;`;
    db.query(sql, function(err, res) {
        if (err) throw err;
        console.table('All Departments: ', res);
    })
    mainMenu();
};

const viewRoles = () => {

};

const viewEmployees = () => {

};

const addDepartment = () => {

};

const addRole = () => {

};

const addEmployee = () => {

};

const updateRole = () => {

};

const exitApp = () => {

};