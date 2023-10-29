const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Connect to database
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password
        password: 'password',
        database: 'companyzyx'
    },
    console.log(`Connected to the books_db database.`)
);


const runThroughChoices = function () {
    const listOChoices = [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Department",
        "Exit"
    ];

    function promptUser() {
        inquirer
            .prompt([
                {
                    name: "todoChoice",
                    message: "What would you like to do?",
                    type: "list",
                    choices: listOChoices,
                }
            ])
            .then(answers => {
                switch (answers.todoChoice) {
                    case "View All Employees":
                        viewAllEmployees();
                        break;
                    case "Add Employee":
                        addEmployee();
                        break;
                    case "Update Employee Role":
                        updateEmployeeRole();
                        break;
                    case "View All Roles":
                        viewAllRoles();
                        break;
                    case "Add Department":
                        addDepartment();
                        break;
                    case "Exit":
                        console.log("You asked to leave. Have a good day.");
                        break;
                    default:
                        console.log("Invalid choice. Please try again.");
                        promptUser(); // Allow the user to try again
                }
            });
    }

    promptUser(); // Start the initial prompt
};

const viewAllEmployees = function () {
    // Query database
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) {
            console.error(err);
        } else {
            console.log(results);
        }
        // After the query is complete, go back to the menu prompt
        runThroughChoices();
    });
};

const addEmployee = function () {
    console.log("Adding Employee Here.");
};

const updateEmployeeRole = function () {
    console.log("Updating Employee Role Here.");
};

const viewAllRoles = function () {
    console.log("Viewing all Roles Here.");
};

const addDepartment = function () {
    console.log("Adding Department Here.");
};

runThroughChoices();
