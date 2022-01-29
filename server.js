const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db/connection');
const base = require('./db')
require('console.table');

let departments = [];
let roles = [];
let employees = [];

mainMenu()

function getDepts() {
    base.findAllDepartments().then(([depts]) => {
        console.table(depts)
    }).then(() => mainMenu())
};

function getRoles() {
    base.findAllRoles().then(([roles]) => {
        console.table(roles)
    }).then(() => mainMenu())
};

function getEmployees() {
    base.findAllEmployees().then(([Emps]) => {
        console.table(Emps)
    }).then(() => mainMenu())
};

function addDepartment() {
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
    ])
        .then(function (res) {
            const firstName = res.firstName;
            const lastName = res.lastName;

            base.findAllRoles().then(([roles]) => {
                const roleChoices = roles.map(({ id, title }) => ({
                    name: title,
                    value: id
                }))

                inquirer.prompt([
                    {
                        type: "list",
                        message: "Please select the users Role:",
                        name: "addEmployeeRole",
                        choices: roleChoices
                    }
                ]).then((data) => {
                    const employeeRoleID = data.addEmployeeRole;

                    base.findAllEmployees().then(([emps]) => {
                        const managers = emps.map(({ id, first_name, last_name }) => ({
                            name: `${first_name} ${last_name}`,
                            value: id
                        }));

                        managers.unshift({name: "None", value: null})

                        inquirer.prompt([
                            {
                                type: "list",
                                message: "Please choose the employees Manager:",
                                name: "addEmployeeManager",
                                choices: managers
                            }
                        ]).then((res)=>{
                            let employee= {
                                manager_id: res.addEmployeeManager, 
                                role_id: employeeRoleID,
                                first_name: firstName, 
                                last_name: lastName
                            }


                            base.createEmployee(employee).then(()=> mainMenu())
                        })


                    })
                })
            })
        })
};

const addRole = () => {

    new Promise((resolve) => {
        db.query("SELECT * FROM department", (err, values) => {
            if (err) {
                throw err;
            }
            resolve(values);
        })
    }).then((depts) => {
        const departments = depts.map(({ id, name }) => ({
            name: name,
            value: id
        }))

        inquirer.prompt([
            {
                type: "input",
                message: "Enter the title of the role:",
                name: "title"
            },
            {
                type: "input",
                message: "Enter the annual salary for the role. Please use format '$00000.00':",
                name: "salary"
            },
            {
                type: "list",
                message: "Choose Department",
                name: "department_id",
                choices: departments
            }
        ])
            .then(function (res) {

                base.createRole(res).then(() => mainMenu())

            })
    })

};

const updateEmployeeRole = () => {
            base.findAllEmployees().then(([emps]) => {
                const employeeChoices = emps.map(({ id, first_name, last_name, role_id }) => ({
                    name: `${first_name} ${last_name}`,
                    role: role_id,
                    value: id
                }))
            inquirer.prompt([
                {
                    type: "list",
                    message: "Select the employee whose role you would like to update:",
                    name: "updateEmployeeRole",
                    choices: employeeChoices
                }
                
            ]).then((data) => {
                base.findAllRoles().then(([roles]) => {
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }))
                
                    inquirer.prompt([
                        {
                            type: "list",
                            message: "Please select the users role:",
                            name: "selectNewRole",
                            choices: roleChoices
                        }
                    ])
                    .then(function (res) {
                    const currentID = data.updateEmployeeRole;
                    const newID = res.selectNewRole;
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
            });
        })
    }
)};

const updateEmployeeManager = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the ID number of the employee who will be transitioning to a new manager:",
            name: "currentID"
        },
        {
            type: "input",
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
function mainMenu() {
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
            case 'View All Departments':
                getDepts()
                break;
            case 'View All Roles':
                //viewRoles();
                getRoles();
                break;
            case 'View All Employees':
                //viewEmployees();
                getEmployees()
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update An Employee Role':
                updateEmployeeRole();
                break;
            case "Update An Employee's Manager":
                updateEmployeeManager();
                break;
            default:
                db.end();

        }
    }
    )
};