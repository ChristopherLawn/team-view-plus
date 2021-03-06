# TeamView Plus (TVP)

## Description
Create and keep track of your employee database straight from the command line!  Whether you're a small startup or a large corporation, TeamView Plus provides a simple interface for the user to efficiently view, add, and delete departments, job roles, and employees - all with the click of a button.  In addition, the user can quickly update an employee's job position if they switch roles within the company and update which manager each employee reports to. Increase productivity and streamline HR by using TeamView Plus!

## Screenshot
![TeamViewPlus sample screenshot](./assets/team-view-plus-screenshot.jpg)

## **Table of Contents**
* [Programs](#programs)
* [Installation](#installation)
* [Usage](#usage)
* [Demo](#demo)
* [License](#license)
* [Questions](#questions)

## **Programs**
* Console.Table package
* Inquirer package
* JavaScript
* MySQL2 package
* Node.js

## **Installation**
1. In order to run the application, download & install [Node.js](https://nodejs.org/en/download/) on your local device.  ***Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.***
2. After installing Node, clone the [TeamView Plus Repo](https://github.com/ChristopherLawn/team-view-plus) to a project folder on your local device.
3. Open Bash and navigate to the root directory of the project folder.
4. Install all required dependencies for the project by entering the command:
    `npm install`.

## **Usage**
1. Before using the app, check the connection settings in the `connection.js` file - located in the `db` folder
2. Set up the seed files to populate your database:
    * Navigate to the root directory in Bash
    * Log into MySQL by entering the command `mysql -u root -p` then entering the password
    * Enter the following commands to run the SQL seed files:
        * `source db/db.sql;`
        * `source db/schema.sql;`
        * `source db/seeds.sql;`
    * Once the seed files are initiated without any error(s), run the command `quit;` to exit MySQL
    * Make sure to include a semicolon(`;`) at the end of each SQL command
3. Run the app in Bash by entering the command:
    `node server.js`.  This will initiate a series of prompts.
4. Use the 'Up' and 'Down' arrows to navigate all list options. Type in answers when adding new information such as departments, roles, and employees.  ***NOTE: All input is case-sensitive, so it is recommended that you double-check all of your work before submitting each answer.***
5. Select `Exit` from the Main Menu or type `Ctrl`+`c` to exit out of the app
6. Click the link below to watch the TeamView Plus Demo Video for more detailed instructions on navigating the interface

## **Demo**
['TeamView Plus' Demo Video](https://drive.google.com/file/d/1Z7DH3JH-P6zQh6Swt32TmEDfXSNNGUEX/view?usp=sharing)

## **License**
The project is distributed under the [Creative Commons License](https://creativecommons.org/publicdomain/zero/1.0/)

## **Questions**
Please contact me directly with any additional questions:
* [GitHub](https://github.com/ChristopherLawn)
* [Email](mailto:christopher.lawn@yahoo.com)