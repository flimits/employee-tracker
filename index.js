const mysql = require('mysql2');
const inquirer = require('inquirer');
// const addEmployee = require('./add_employee');
const clear = require('clear');


console.log("oooooooooooo                              oooo                                            ");
console.log("\`888\'     \`8                              \`888                                            ");
console.log(" 888         ooo. .oo.  .oo.   oo.ooooo.   888   .ooooo.  oooo    ooo  .ooooo.   .ooooo.  ");
console.log(" 888oooo8    \`888P\"Y88bP\"Y88b   888\' \`88b  888  d88\' \`88b  \`88.  .8\'  d88\' \`88b d88\' \`88b ");
console.log(" 888    \"     888   888   888   888   888  888  888   888   \`88..8\'   888ooo888 888ooo888 ");
console.log(" 888       o  888   888   888   888   888  888  888   888    \`888\'    888    .o 888    .o ");
console.log("o888ooooood8 o888o o888o o888o  888bod8P\' o888o \`Y8bod8P\'     .8\'     \`Y8bod8P\' \`Y8bod8P\' ");
console.log("ooo        ooooo                888                       .o..P\'                          ");
console.log("\`88.       .888\'               o888o                      \`Y8P\'                           ");
console.log(" 888b     d\'888   .oooo.   ooo. .oo.    .oooo.    .oooooooo  .ooooo.  oooo d8b            ");
console.log(" 8 Y88. .P  888  \`P  )88b  \`888P\"Y88b  \`P  )88b  888\' \`88b  d88\' \`88b \`888\"\"8P            ");
console.log(" 8  \`888\'   888   .oP\"888   888   888   .oP\"888  888   888  888ooo888  888                ");
console.log(" 8    Y     888  d8(  888   888   888  d8(  888  \`88bod8P\'  888    .o  888                ");
console.log("o8o        o888o \`Y888\"\"8o o888o o888o \`Y888\"\"8o \`8oooooo.  \`Y8bod8P\' d888b               ");
console.log("                                                 d\"     YD                                ");
console.log("                                                 \"Y88888P\'                                ");


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
                type: "rawlist",
                choices: choices,
            },
        ])
        .then((data) => {
            doWork(data.choice);
        });
    }
    
    function doWork(choice){

    
    if (choice === "View All Employees") {
        viewAll("employee", (err, results) => {
            goAskTheQuestions(); // Continue prompting after viewing data
        });
    } else if (choice === "Add Employee") {
            addEmployee();
            goAskTheQuestions(); // Continue prompting after adding an employee
    } else if (choice === "View All Departments") {
        viewAll("department", (err, results) => {
            goAskTheQuestions(); // Continue prompting after viewing data
        });
    } else if (choice === "Update Employee Role") {
        updateRole((err, results) => {
            goAskTheQuestions(); // Continue prompting after updating an employee role
        });
    } else if (choice === "View All Roles") {
        viewAll("roles", (err, results) => {
            goAskTheQuestions(); // Continue prompting after viewing data
        });
    } else if (choice === "Add Department") {
        addDepartment((err, results) => {
            goAskTheQuestions(); // Continue prompting after adding a department
        });
    } else {
        console.log("Gotta choose something");
        goAskTheQuestions(); // Continue prompting
    }
}
// Function to initialize the app
function startThis() {
    goAskTheQuestions();
}

// Function call to initialize the app
startThis();
