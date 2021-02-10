// dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
// make the connection link
const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: 'cFuer@12',
    database: 'tracker_DB',
  });
// starts the prompt in terminal when input "node app.js"
  connection.connect(function(err) {
      if (err) throw err;
      start();
  });

// prompts for user to answer and input info
// department, role and employee prompts series of questions
const departPrompt = [
    {
        name: 'deptId',
        type: 'input',
        message: 'What is the department ID number?'
    },
    {
        name: 'deptName',
        type: 'input',
        message: 'What the department name?'
    }
];

const rolePrompt = [
    {
        name: 'id',
        type: 'input',
        message: 'What is the role ID?'
    },
    {
        name: 'title',
        type: 'input',
        message: 'What is the role title?'
    },
    {
        name: 'salary',
        type: 'input',
        message: 'What is the role salary?'
    },
    {
        name: 'department_id',
        type: 'input',
        message: 'What is the Department ID?'
    },
];

const employeePrompt = [
    {
        name: 'id',
        type: 'input',
        message: 'What is the employee ID?'
    },
    {
        name: 'first_name',
        type: 'input',
        message: 'What is the employees first name?'
    },
    {
        name: 'last_name',
        type: 'input',
        message: 'What is the employees last name?'
    },
    {
        name: 'role_id',
        type: 'input',
        message: 'What is the employee role ID?'
    },
    {
        name: 'manager_id',
        type: 'input',
        message: 'What is the employee manager ID?'
    },
];
// start prompt
const start = () => {
    inquirer.prompt( {
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: ["ADD", "VIEW", "UPDATE", "EXIT"]
    })
    .then((answer) => {
        if (answer.action === "ADD") {
            addPrompt();
        } else if (answer.action === "VIEW") {
            viewPrompt();
        } else if (answer.action === "UPDATE") {
            viewUpdate();
        } else {
            connection.end();
        }
    })
}
// allows user to update between "ROLE" or "MANAGER"
const viewUpdate = () => {
    inquirer.prompt({
        name: 'update',
        type: 'list',
        message: 'What would you like to update?',
        choices: ["ROLE", "MANAGER"]
    })
    .then((answer) => {
        if (answer.action === "ROLE") {
            changeRole();
        } else if (answer.action === "MANAGER") {
            changeManager();
        }
    })
}
// allows user to add to "ROLE" list; create changes
const changeRole = () => {
    connection.query("SELECT CONCAT_WS(', ', employee.last_name, employee.first_name) AS `Name` FROM employee ORDER by `Name`", (err, results) => {
        inquirer.prompt([
            {
                name: 'choice',
                type: 'list',
                choices() {
                    const choiceList = [];
                    results.forEach(({ Name }) => {
                        choiceList.push(Name);
                    });
                    return choiceList;
                },
                message: 'Change role for which employee?',
            },
            {
                name: 'role_id',
                type: 'input',
                message: 'What is the employees new role ID?'
            },
        ])
        .then((answer) => {
            let answerArray = answer.choice.split( ', ');
            const query = connection.query(
                'UPDATE employee SET ? WHERE ? AND ?',
                [
                    {
                        role_id: answer.role_id
                    },
                    {
                        last_name: answerArray[0]
                    },
                    {
                        first_name: answerArray[1]
                    }
                ],
                (err, res) => {
                    if (err) throw err;
                    start();
                }
            );
        });
    })
};

const chnageManager = () => {
    connection.query()
}
