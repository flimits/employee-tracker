const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const addEmployee = require('./add_employee')

// Connect to database
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'companyzyx'
    },
    console.log(`Connected to the companyzyx database.`)
);


const runThroughChoices = function () {
    const listOChoices = [
        "View All Employees",
        "Add Employee",
        "View All Roles",
        "Update Employee Role",
        "View ALL Departments",
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
                    case "View ALL Departments":
                        viewAllDepartments();
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
    // Query database and gather al Employees
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) {
            console.error(err);
        } else {
            console.table(results);
        }
        // After the query is complete, go back to the menu prompt
        runThroughChoices();
    });
};

// const addEmployee = function () {
//     console.log("Adding Employee Here.");
// };


const viewAllRoles = function () {
    console.log("Viewing all Roles Here.");
    // Query database for all Roles
    db.query('SELECT * FROM roles', function (err, results) {
        if (err) {
            console.error(err);
        } else {
            console.table(results);
        }
        // After the query is complete, go back to the menu prompt
        runThroughChoices();
    });
};

const updateEmployeeRole = function () {
    console.log("Updating Employee Role Here.");
};

const viewAllDepartments = function () {
    console.log("Viewing All Departments in Companyzyx.");
    // Query database using a parameterized query
    const sql = 'SELECT * FROM department';
    db.query(sql, function (err, results) {
        if (err) {
            console.error(err);
        } else {
            console.table(results);
        }
        // After the query is complete, go back to the menu prompt
        runThroughChoices();
    });
};

const addDepartment = function () {
    console.log("Adding Department Here.");
    runThroughChoices();
};

runThroughChoices();
