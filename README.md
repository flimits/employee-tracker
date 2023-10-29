## Psuedo Coding Exercise

* Create repo with the following:
* Nodejs package.json that include inquirer 8.2.4 and mysql. 
* Create a server.js file that include the whole setup for express (even though there might not be a website.)
* Create a video of the exercise for viewing, adding, updating employee information.
* create commandline options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

- all departments
    - formatted table showing department names and department ids
- view all roles
    - job title, role id, the department that role belongs to, and the salary for that role
- view all employees
    - formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- add a department
    - prompted to enter the name of the department and that department is added to the database
- add a role
    - prompted to enter the name, salary, and department for the role and that role is added to the database
- add an employee
    - prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
- choose to update an employee role
    - prompted to select an employee to update and their new role and this information is updated in the database

* I will need to create a company name for the database, that has
* 3 tables: department, employees and roles.
* There will need to be links in the employee tables for employee department to point to department.
* followed by link for employee role to be lined to associated roles table.
* A link for the employee department to point to associated department table.
* Create some kind of id for each employee that can be referenced in the departments, roles and/or employee tables.
