-- Create mock data for departments
INSERT INTO department (dept_name)
VALUES
    ('Executive Leadership'),
    ('Marketing'),
    ('Sales'),
    ('HR'),
    ('IT');

-- Create mock data for job roles
INSERT INTO role (title, salary, department_id)
VALUES
    ('CEO', 500000.00, 1),
    ('CTO', 400000.00, 1),
    ('Marketing Manager', 100000.00, 2),
    ('Marketing Coordinator', 50000.00, 2),
    ('Sales Manager', 100000.00, 3),
    ('Sales Representative', 75000.00, 3),
    ('HR Manager', 100000.00, 4),
    ('HR Coordinator', 60000.00, 4),
    ('IT Manager', 100000.00, 5),
    ('IT Specialist', 75000.00, 5);

-- Create mock data for employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Sandra', 'Unetti', 1, NULL),
    ('Bonnie', 'Peterman', 2, 1),
    ('Chris', 'Simpson', 3, NULL),
    ('Steve', 'Herbert', 4, 3),
    ('Amy', 'Kenton', 5, NULL),
    ('Claire', 'Redborn', 6, 5),
    ('Kim', 'Chan', 7, NULL),
    ('Jim', 'Simmons', 8, 7),
    ('Lisa', 'Jones', 9, NULL),
    ('Todd', 'Smith', 10, 9);