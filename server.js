const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db/connection');
require('console.table');

let departments = [];
let roles = [];
let employees = [];

db.connect(async (err) => {
    if (err) throw err;
    departments = await getDepts();
    roles = await getRoles();
    employees = await getEmployees();
    setTimeout(mainMenu, 400);
})

function getDepts() {
    return new Promise((resolve) => {
        db.query("SELECT * FROM department", (err, values) => {
            if (err) {
                throw err;
            }
            resolve(values);
        })
    })
};

function getRoles() {
    return new Promise((resolve) => {
        db.query("SELECT * FROM role", (err, values) => {
            if (err) {
                throw err;
            }
            resolve(values);
        })
    })
};

function getEmployees() {
    return new Promise((resolve) => {
        db.query("SELECT * FROM employee", (err, values) => {
            if (err) {
                throw err;
            }
            resolve(values);
        })
    })
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the name of the department:",
            name: "departmentName"
        }
    ])
    .then(function (res) {
        const departmentName = res.departmentName;
        const query = `INSERT INTO department (name) VALUES ("${departmentName}")`;
        db.query(query, function (err, res) {
            if (err) {
                throw err;
            } else {
                console.table(res);
                mainMenu();
            }
        })
    })
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the employee's first name:",
            name: "firstName"
        },
        {
            type: "input",
            message: "Enter the employee's last name:",
            name: "lastName"
        },
        {
            type: "input",
            message: "Enter the ID number for the employee's role:",
            name: "addEmployeeRole"
        },
        {
            type: "input",
            message: "Enter the ID number of the employee's manager:",
            name: "addEmployeeManager"
        }
    ])
    .then(function (res) {
        const firstName = res.firstName;
        const lastName = res.lastName;
        const employeeRoleID = res.addEmployeeRole;
        const employeeManagerID = res.addEmployeeManager;
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${employeeRoleID}", "${employeeManagerID}")`;
        db.query(query, function (err, res) {
            if (err) {
                throw err;
            } else {
                console.table(res);
                mainMenu();
            }
        })
    })
};

const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the title of the role:",
            name: "roleName"
        },
        {
            type: "input",
            message: "Enter the annual salary for the role. Please use format '$00000.00':",
            name: "rolePay"
        },
        {
            type: "input",
            message: "Enter the ID of the department for the role:",
            name: "deptID"
        }
    ])
    .then(function (res) {
        const roleName = res.roleName;
        const rolePay = res.rolePay;
        const deptID = res.deptID;
        const query = `INSERT INTO role (title, salary, department_id) VALUES ("${roleName}", "${rolePay}", "${deptID}")`;
        db.query(query, function (err, res) {
            if (err) {
                throw err;
            } else {
                console.table(res);
                mainMenu();
            }
        })
    })
};

const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID number of the employee whose role you would like to update:",
            name: "currentID"
        },
        {   type: "input",
            message: "Enter the ID number of the new role the employee will be transitioning to:",
            name: "newRoleID"
        }
    ])
    .then(function (res) {
        const currentID = res.currentID;
        const newID = res.newRoleID;
        const query = `UPDATE employee SET role_id = "${newID}" WHERE id = "${currentID}"`;
        db.query(query, function (err, res) {
            if (err) {
                throw err;
            } else {
                console.table(res);
                mainMenu();
            }
        })
    })
};

const updateEmployeeManager = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID number of the employee who will be transitioning to a new manager:",
            name: "currentID"
        },
        {   type: "input",
            message: "Enter the ID number of the manager the employee will be transitioning to:",
            name: "newManagerID"
        }
    ])
    .then(function (res) {
        const currentID = res.currentID;
        const newManagerID = res.newManagerID;
        const query = `UPDATE employee SET manager_id = "${newManagerID}" WHERE id = "${currentID}"`;
        db.query(query, function (err, res) {
            if (err) {
                throw err;
            } else {
                console.table(res);
                mainMenu();
            }
        })
    })
};

// Main Menu
const mainMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenuOptions',
            message: 'Welcome to TeamView Plus! What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update An Employee Role', "Update An Employee's Manager", 'Exit'],
            default: 'View All Departments'
        }
    ]).then(res => {
        switch (res.mainMenuOptions) {
            case 'View All Departments': {
                return viewDepartments();
            }
            case 'View All Roles': {
                return viewRoles();
            }
            case 'View All Employees': {
                return viewEmployees();
            }
            case 'Add Department': {
                return addDepartment();
            }
            case 'Add Role': {
                return addRole();
            }
            case 'Add Employee': {
                return addEmployee();
            }
            case 'Update An Employee Role': {
                return updateEmployeeRole();
            }
            case "Update An Employee's Manager": {
                return updateEmployeeManager();
            }
            case 'Exit': {
                db.end();
            }
        }
    }
)};

const viewDepartments = () => {
    console.table(departments);
    setTimeout(mainMenu, 400);
};

const viewRoles = () => {
    console.table(roles);
    setTimeout(mainMenu, 400);
};

const viewEmployees = () => {
    console.table(employees);
    setTimeout(mainMenu, 400);
};