const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'companyzyx',
});

// Function to query the database and gather all Employees
function viewAllEmployees(callback) {
  db.query('SELECT * FROM employee', (err, results) => {
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
        viewAllEmployees((err, results) => {
          goAskTheQuestions(); // Continue prompting after viewing data
        });
      } else 
      if (data.choice === "Add Employee") {
        addEmployee((err, results) => {
          goAskTheQuestions(); // Continue prompting after viewing data
        });
      } else
        if (data.choice === "View All Roles") {
        viewAllRoles((err, results) => {
          goAskTheQuestions(); // Continue prompting after viewing data
        });
      } else
      if (data.choice === "Update Employee Role") {
        updateRole((err, results) => {
          goAskTheQuestions(); // Continue prompting after viewing data
        });
      } else
      if (data.choice === "View All Departments") {
        viewAllDepartments((err, results) => {
          goAskTheQuestions(); // Continue prompting after viewing data
        });
      } else
      if (data.choice === "Add Department") {
        addDepartment((err, results) => {
          goAskTheQuestions(); // Continue prompting after viewing data
        });
      }
      
      
      
      {
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
