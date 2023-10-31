const inquirer = require('inquirer');
const mysql = require('mysql2/promise');

// Function to create and return a database connection
async function createDatabaseConnection() {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'companyzyx',
  });

  return connection;
}


async function addEmployee() {
  const connection = await createDatabaseConnection();
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

addEmployee(); // Start the initial prompt

// module.exports = addEmployee;