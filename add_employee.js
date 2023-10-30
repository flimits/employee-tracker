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

  const [myRoles] = await connection.execute('SELECT id,title FROM roles');
  const [myMgrs] = await connection.execute('SELECT id,first_name,last_name FROM employee');
  connection.end();
  return {
    myRoles,
    myMgrs
  };
}

// Function to dispay choice to get the role for an Employee
async function addEmployee() {

  const { gotRolesFromDB,gotMgrsFromDB }  = await getDataFromDatabase();

  const roleChoices = gotRolesFromDB.map(item => ({
    name: item.title,
    value: item.id,
  }));

  const mgrChoices = gotRolesFromDB.map(item => ({
    name: item.first_name + " " + item.last_name,
    value: item.id,
  }));


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
        name: "role",
        message: "What is your role?",
        type: "list",
        roleChoices,
      }
    ])
    .then(answers => {
      console.log(answers)
      console.log('selected ID: ' + answers.role);
      console.log('User first and last name' + answers.first_name + answers.last_name);

    });
};

addEmployee(); // Start the initial prompt

// module.exports = addEmployee;