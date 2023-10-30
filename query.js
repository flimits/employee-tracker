const inquirer = require('inquirer');
const mysql = require('mysql2/promise');



// Function to retreive data from companyzyx
async function getDataFromDatabase() {

  const connection = await mysql.createConnection({

    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'companyzyx',

  })

  const [rows] = await connection.execute('SELECT id,title FROM roles');
  console.log("the roles in db are ..:" + rows);
  connection.end();
  return rows;
}

// Function to dispay choice to get the role for an Employee
async function promptUser() {

  const gotDataFromDB = await getDataFromDatabase();

  const choices = gotDataFromDB.map(item => ({
    name: item.title,
    value: item.id,
  }));


  inquirer
    .prompt([
      // {
      //   name: "first_name",
      //   message: "Enter your first name",
      //   type: "input",
      // },
      // {
      //   name: "last_name",
      //   message: "Enter your first name",
      //   type: "input",
      //   },
      {
        name: "role",
        message: "What is your role?",
        type: "list",
        choices,
      }
    ])
    .then(answers => {
      console.log('selected ID: ', answers.role)

    });
};

promptUser(); // Start the initial prompt