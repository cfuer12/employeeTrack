// dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const express = require("express");
const cTable = require("console.table");
// find a way to make pass private??

// Express
const app = express();

// Connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "cFuer@12",
  database: "tracker_db",
});

// Parse request as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connetion ID
connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected as ID ${connection.threadId}`);
    start();
  });

  // Initial startup for "node app.js" so it runs in terminal
function start() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "What would you like to do?",
          name: "choice",
          choices: [
            "View All Employees",
            "View All Employee's By Roles",
            "View all Emplyees By Deparments",
            "Update Employee",
            "Add Employee",
            "Add Role",
            "Add Department",
            "Exit"
          ]
        }
      ])
      .then(function(val) {
        switch (val.choice) {
            case "View All Employees":
              viewEmployees();
            break;
    
          case "View All Employee's By Roles":
              viewRoles();
            break;
          case "View all Emplyees By Deparments":
            viewDepartments();
            break;
          
          case "Add Employee":
                addEmployee();
              break;
  
          case "Update Employee":
                updateEmployee();
              break;
      
            case "Add Role":
                addRole();
              break;
      
            case "Add Department":
                addDepartment();
              break;

            case "End":
                connection.end();
                break;
            }
    })
  }

  // View employees within the database
function viewEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      start()
  })
  }

  // View roles within the database
function viewRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    start()
    })
    }

    // View departments within the database
function viewDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      start()
    })
  }

  // Add roles to the database
let roleArray = [];

function selectRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (let i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
    }

  })
  return roleArray;
}

// Add manager to the database
let managerArray = [];

function selectManager() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (let i = 0; i < res.length; i++) {
      managerArray.push(res[i].first_name);
    }

  })
  return managerArray;
}

// Add employee function for database input; multiple inputs listed
function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstName",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "lastName",
          type: "input",
          message: "Enter their last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then(function (val) {
      let roleId = selectRole().indexOf(val.role) + 1
      let managerId = selectManager().indexOf(val.choice) + 1
      connection.query("INSERT INTO employee SET ?", 
      {
        first_name: val.firstName,
        last_name: val.lastName,
        manager_id: managerId,
        role_id: roleId
        
    }, function(err){
        if (err) throw err
        console.table(val)
        start()
    })

})
}

// Update employee to the database
function updateEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
     if (err) throw err
     console.log(res)
    inquirer.prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function() {
              let lastName = [];
              for (let i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the their last name? ",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the their new title? ",
            choices: selectRole()
          },
      ]).then(function(val) {
        let roleId = selectRole().indexOf(val.role) + 1   ;
        connection.query("UPDATE employee SET ? WHERE ?", 
        [{
          last_name: val.lastName
           
        }, 
        {
          role_id: roleId
        }], 
        function(err){
            if (err) throw err
            console.table(val)
            start()
        })
  
    });
  });
  
  }
  
  // Add employee role to the database
  function addRole() { 
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
      inquirer.prompt([
          {
            name: "Title",
            type: "input",
            message: "What is the roles Title?"
          },
          {
            name: "Salary",
            type: "input",
            message: "What is the Salary?"
  
          } 
      ]).then(function(res) {
          connection.query(
              "INSERT INTO role SET ?",
              {
                title: res.Title,
                salary: res.Salary,
              },
              function(err) {
                  if (err) throw err
                  console.table(res);
                  start();
              }
          )
  
      });
    });
    }

    // Add department to the database
  function addDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to input?"
        }
    ]).then(function(res) {
        let query = connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                start();
            }
        )
    })

  }
