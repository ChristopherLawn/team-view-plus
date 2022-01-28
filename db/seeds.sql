INSERT INTO department (name)
VALUES
    ('Marketing'),
    ('Sales'),
    ('HR'),
    ('IT');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Marketing Manager', 100000.00, 1),
    ('Marketing Coordinator', 50000.00, 1),
    ('Sales Manager', 100000.00, 2),
    ('Sales Representative', 75000.00, 2),
    ('HR Manager', 100000.00, 3),
    ('HR Coordinator', 60000.00, 3),
    ('IT Manager', 100000.00, 4),
    ('IT Specialist', 75000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Chris', 'Simpson', 1, NULL),
    ('Steve', 'Herbert', 2, 1),
    ('Amy', 'Kenton', 3, NULL),
    ('Claire', 'Redborn', 4, 3),
    ('Kim', 'Chan', 5, NULL),
    ('Jim', 'Simmons', 6, 5),
    ('Lisa', 'Jones', 7, NULL),
    ('Todd', 'Smith', 8, 7);