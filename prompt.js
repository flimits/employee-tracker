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
    console.log("Add employee Here.");

  }

  const viewAllRoles = async () => {
    console.log("Viewing all Roles Here.");
    // Query database for all Roles
    // const [rows] = await connection.execute('SELECT * FROM roles');
    // console.table(rows);
    const [rows] = connection.query("SELECT * FROM roles", function (err, result) {
      if (err) {
        console.log("err:")
        console.log(err);
      }
      // console.log("results:", result)
      
    });
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
