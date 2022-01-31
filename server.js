// Required dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db/connection');
const base = require('./db')
require('console.table');

// Main Menu
function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenuOptions',
            message: 'Welcome to TeamView Plus! What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', "Update An Employee's Role", "Update An Employee's Manager", 'Delete A Department', 'Delete A Role', 'Delete An Employee', 'Exit'],
            default: 'View All Departments'
        }
    ]).then(res => {
        switch (res.mainMenuOptions) {
            case 'View All Departments':
                getDepts()
                break;
            case 'View All Roles':
                getRoles();
                break;
            case 'View All Employees':
                getEmployees()
                break;
            case 'Add A Department':
                addDepartment();
                break;
            case 'Add A Role':
                addRole();
                break;
            case 'Add An Employee':
                addEmployee();
                break;
            case "Update An Employee's Role":
                updateEmployeeRole();
                break;
            case "Update An Employee's Manager":
                updateEmployeeManager();
                break;
            case 'Delete A Department':
                deleteDepartment();
                break;
            case 'Delete A Role':
                deleteRole();
                break;
            case 'Delete An Employee':
                deleteEmployee();
                break;
            default:
                db.end();
        }
    }
    )
};
mainMenu();

// Find and display departments
function getDepts() {
    base.findAllDepartments().then(([depts]) => {
        console.table(depts)
    }).then(() => mainMenu())
};

// Find and display roles
function getRoles() {
    base.findAllRoles().then(([roles]) => {
        console.table(roles)
    }).then(() => mainMenu())
};

// Find and display employees
function getEmployees() {
    base.findAllEmployees().then(([Emps]) => {
        console.table(Emps)
    }).then(() => mainMenu())
};

// Add a new department
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
            const query = `INSERT INTO department (dept_name) VALUES ("${departmentName}")`;
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

// Add a new employee
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
                        message: "Select the employee's role:",
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

                        managers.unshift({ name: "None", value: null })

                        inquirer.prompt([
                            {
                                type: "list",
                                message: "Select the employee's manager:",
                                name: "addEmployeeManager",
                                choices: managers
                            }
                        ]).then((res) => {
                            let employee = {
                                manager_id: res.addEmployeeManager,
                                role_id: employeeRoleID,
                                first_name: firstName,
                                last_name: lastName
                            }


                            base.createEmployee(employee).then(() => mainMenu())
                        })


                    })
                })
            })
        })
};

// Add a new role
const addRole = () => {
    base.findAllDepartments().then(([depts]) => {
        const deptChoices = depts.map(({ id, dept_name }) => ({
            name: `${dept_name}`,
            value: id
        }))
        inquirer.prompt([
            {
                type: "input",
                message: "Enter the title of the new role:",
                name: "title"
            },
            {
                type: "input",
                message: "Enter the annual salary for the new role. (Please use format '$00000.00'):",
                name: "salary"
            },
            {
                type: "list",
                message: "Select the department for the new role:",
                name: "department_id",
                choices: deptChoices
            }
        ])
            .then(function (res) {
                const roleTitle = res.title;
                const roleSalary = res.salary;
                const roleDept = res.department_id;
                const query = `INSERT INTO role (title, salary, department_id) VALUES ('${roleTitle}', '${roleSalary}', '${roleDept}')`;
                db.query(query, function (err, res) {
                    if (err) {
                        throw err;
                    } else {
                        console.table(res);
                        mainMenu();
                    }
                })
            })
    })
};

// Update an existing employee's role/title
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
                message: "Select the employee who is switching roles:",
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
                        message: "Select the employee's new role:",
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
    )
};

// Change an existing employee's manager
const updateEmployeeManager = () => {
    base.findAllEmployees().then(([emps]) => {
        const employeeChoices = emps.map(({ id, first_name, last_name, manager_id }) => ({
            name: `${first_name} ${last_name}`,
            manager: manager_id,
            value: id
        }))
        inquirer.prompt([
            {
                type: "list",
                message: "Select the employee who will be switching to a new manager:",
                name: "updateEmployeeManager",
                choices: employeeChoices
            }
        ]).then((data) => {
            base.findAllEmployees().then(([emps]) => {
                const managerChoices = emps.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                }));

                inquirer.prompt([
                    {
                        type: "list",
                        message: "Select the employee's new manager:",
                        name: "selectNewManager",
                        choices: managerChoices
                    }
                ])
                    .then(function (res) {
                        const currentID = data.updateEmployeeManager;
                        const newID = res.selectNewManager;
                        const query = `UPDATE employee SET manager_id = "${newID}" WHERE id = "${currentID}"`;
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
    )
};

// Delete a department
const deleteDepartment = () => {
    base.findAllDepartments().then(([depts]) => {
        const deptChoices = depts.map(({ id, dept_name }) => ({
            name: `${dept_name}`,
            value: id
        }))
        inquirer.prompt([
            {
                type: "list",
                message: "Select the department you would like to delete:",
                name: "deleteDept",
                choices: deptChoices
            }
        ])
            .then(function (data) {
                const deptID = data.deleteDept;
                const query = `DELETE FROM department WHERE id = "${deptID}"`;
                db.query(query, function (err, res) {
                    if (err) {
                        throw err;
                    } else {
                        console.table(res);
                        mainMenu();
                    }
                })
            })
    })
};

// Delete a role
const deleteRole = () => {
    base.findAllRoles().then(([roles]) => {
        const roleChoices = roles.map(({ id, title }) => ({
            name: `${title}`,
            value: id
        }))
        inquirer.prompt([
            {
                type: "list",
                message: "Select the role you would like to delete:",
                name: "deleteRole",
                choices: roleChoices
            }
        ])
            .then(function (data) {
                const roleID = data.deleteRole;
                const query = `DELETE FROM role WHERE id = "${roleID}"`;
                db.query(query, function (err, res) {
                    if (err) {
                        throw err;
                    } else {
                        console.table(res);
                        mainMenu();
                    }
                })
            })
    })
};

// Delete an employee
const deleteEmployee = () => {
    base.findAllEmployees().then(([emps]) => {
        const employeeChoices = emps.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }))
        inquirer.prompt([
            {
                type: "list",
                message: "Select the employee you would like to delete:",
                name: "deleteEmployee",
                choices: employeeChoices
            }
        ])
            .then(function (data) {
                const employeeID = data.deleteEmployee;
                const query = `DELETE FROM employee WHERE id = "${employeeID}"`;
                db.query(query, function (err, res) {
                    if (err) {
                        throw err;
                    } else {
                        console.table(res);
                        mainMenu();
                    }
                })
            })
    })
};