const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');

const start = async () => {
  // Create a connection to the database
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'companyzyx'
  });

  console.log('Connected to the companyzyx database.');

  // Function to display a list of choices
  const runThroughChoices = async () => {
    const choices = [
      "View All Employees",
      "Add Employee",
      "View All Roles",
      "Update Employee Role",
      "View All Departments",
      "Add Department",
      "Exit"
    ];

    while (true) {
      const { choice } = await inquirer.prompt({
        name: "choice",
        message: "What would you like to do?",
        type: "list",
        choices: choices
      });

      switch (choice) {
        case "View All Employees":
          await viewAllEmployees();
          break;
        case "Add Employee":
          await addEmployee(connection); // Pass the connection object
          break;
        case "Update Employee Role":
          await updateEmployeeRole();
          break;
        case "View All Roles":
          await viewAllRoles();
          break;
        case "View All Departments":
          await viewAllDepartments();
          break;
        case "Add Department":
          await addDepartment();
          break;
        case "Exit":
          console.log("You asked to leave. Have a good day.");
          return; // Exit the loop and the program
        default:
          console.log("Invalid choice. Please try again.");
      }
    }
  };

  const viewAllEmployees = async () => {
    // Query database and gather all Employees
    const [rows] = await connection.execute('SELECT * FROM employee');
    console.table(rows);
  };

  const addEmployee = async (connection) => {
    const { myRoles, myMgrs } = await getDataFromDatabase(connection);

    const roleChoices = myRoles.map(item => ({
      name: item.title,
      value: item.id,
    }));

    const mgrChoices = myMgrs.map(item => ({
      name: item.first_name + " " + item.last_name,
      value: item.id,
    }));

    // Function to retrieve data from the companyzyx database tables roles
    async function getDataFromDatabase(connection) {
      const [myRoles] = await connection.execute('SELECT id, title FROM roles');
      const [myMgrs] = await connection.execute('SELECT id, first_name, last_name FROM employee');
      return {
        myRoles,
        myMgrs
      };
    }

    // Function to insert an employee into the database
    async function insertEmployee(connection, data) {
      const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      await connection.execute(sql, [data.first_name, data.last_name, data.role_id, data.mgr_id]);
    }

    inquirer
      .prompt([
        {
          name: "first_name",
          message: "Enter the Employee first name",
          type: "input",
        },
        {
          name: "last_name",
          message: "Enter the Employee last name",
          type: "input",
        },
        {
          name: "role_id",
          message: "What is the employee's role?",
          type: "list",
          choices: roleChoices,
        },
        {
          name: "mgr_id",
          message: "Who is the Manager for this new Employee?",
          type: "list",
          choices: mgrChoices,
        }
      ])
      .then(answers => {
        console.log(answers);
        console.log('Selected role ID: ' + answers.role_id);
        console.log('User first and last name: ' + answers.first_name + " " + answers.last_name);
        console.log('Manager ID: ' + answers.mgr_id);

        insertEmployee(connection, answers)
          .then(() => {
            console.log('Employee inserted successfully.');
            connection.end(); // Close the database connection
          })
          .catch(error => {
            console.error('Error inserting employee:', error);
            connection.end(); // Close the database connection even in case of an error
          });
      });
  }

  const viewAllRoles = async () => {
    console.log("Viewing all Roles Here.");
    // Query database for all Roles
    const [rows] = await connection.execute('SELECT * FROM roles');
    console.table(rows);
  };

  const updateEmployeeRole = async () => {
    console.log("Updating Employee Role Here.");
    // Implement the logic to update an employee's role
  };

  const viewAllDepartments = async () => {
    console.log("Viewing All Departments in Companyzyx.");
    // Query database for all Departments
    const [rows] = await connection.execute('SELECT * FROM department');
    console.table(rows);
  };

  const addDepartment = async () => {
    console.log("Adding Department Here.");
    // Implement the logic to add a department
  };

  await runThroughChoices();
  connection.end(); // Close the database connection when the program exits
};

start(); // Start the application
