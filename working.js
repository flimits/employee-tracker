const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'companyzyx',
});

// Function to query the database and gather all Employees or roles or departments

function viewAll(table, callback) {
    const query = `SELECT * FROM ${table}`;
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }
  
      console.table(results);
      callback(null, results);
    });
  }

// Function to handle user input
function goAskTheQuestions() {
    // Array of questions for user input
    const choices = [
        "View All Employees",
        "Add Employee",
        "View All Roles",
        "Update Employee Role",
        "View All Departments",
        "Add Department"
    ];

    inquirer
        .prompt([
            {
                name: "choice",
                message: "What would you like to do?",
                type: "list",
                choices: choices,
            },
        ])
        .then((data) => {
            if (data.choice === "View All Employees") {
                viewAll("employee", (err, results) => {
                    goAskTheQuestions(); // Continue prompting after viewing data
                });
            } else if (data.choice === "Add Employee") {
                addEmployee((err, results) => {
                    goAskTheQuestions(); // Continue prompting after adding an employee
                });
            } else if (data.choice === "View All Departments") {
                viewAll("department", (err, results) => {
                    goAskTheQuestions(); // Continue prompting after viewing data
                });
            } else if (data.choice === "Update Employee Role") {
                updateRole((err, results) => {
                    goAskTheQuestions(); // Continue prompting after updating an employee role
                });
            } else if (data.choice === "View All Roles") {
                viewAll("roles", (err, results) => {
                    goAskTheQuestions(); // Continue prompting after viewing data
                });
            } else if (data.choice === "Add Department") {
                addDepartment((err, results) => {
                    goAskTheQuestions(); // Continue prompting after adding a department
                });
            } else {
                console.log("Gotta choose something");
                goAskTheQuestions(); // Continue prompting
            }
            
        });
}

// Function to initialize the app
function startThis() {
    goAskTheQuestions();
}

// Function call to initialize the app
startThis();
