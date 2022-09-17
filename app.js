const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//Use the [Inquirer npm package] to prompt the user for their email, id, and specific information based on 
//their role with the company. For instance, an intern may provide their school, whereas an engineer may 
//provide their GitHub username.




const myTeam = [];

async function addTeamMember(){

    let newMember = await
    inquirer.prompt([
         {
            type: "list",
            name: "team",
            message: "What is the team member's role?",
            choices: ['Manager', 'Engineer', 'Intern', 'I do not want to add any more team members.']
         }
    ]);

    switch(newMember.team){

        //New Manager
        case "Manager":
            inquirer.prompt([
                {
                    type: "input",
                    message: "Enter the Manager's name.",
                    name: "name"
                },
                {
                    type: "input",
                    message: "Enter the Manager's id number.",
                    name: "id"
                },
                {
                    type: "input",
                    message: "Enter the Manager's email.",
                    name: "email"
                },
                {
                    type: "input",
                    message: "Enter the Manager's office number.",
                    name: "officeNumber"
                }
            ])
            .then(function (answers) {
                let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                myTeam.push(manager)
                console.log('\x1b[33m%s\x1b[0m: ', answers.name + " has been sucessfully added as a Manager");
                addTeamMember();
            })
            .catch(function(err) {
                console.log(err);
              });
        break;

        //New Engineer
        case "Engineer" :
        inquirer.prompt([
            {
                type: "input",
                message: "Enter the Engineer's name.",
                name: "name"
            },
            {
                type: "input",
                message: "Enter the Engineers's id number.",
                name: "id"
            },
            {
                type: "input",
                message: "Enter the Engineers's email.",
                name: "email"
            },
            {
                type: "input",
                message: "Enter the Engineer's GitHub username.",
                name: "github"
            }
        ])
        .then(function (answers) {
            let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            myTeam.push(engineer)
            console.log('\x1b[33m%s\x1b[0m: ', answers.name + " has been sucessfully added as an Engineer");
            addTeamMember();
        })
        .catch(function(err) {
            console.log(err);
            }); 
        break;

        //New Intern
        case "Intern" :
        inquirer.prompt([
            {
                type: "input",
                message: "Enter the Intern's name.",
                name: "name"
            },
            {
                type: "input",
                message: "Enter the Intern's id number.",
                name: "id"
            },
            {
                type: "input",
                message: "Enter the Intern's email.",
                name: "email"
            },
            {
                type: "input",
                message: "Enter the Intern's school",
                name: "school"
            }
        ])
        .then(function (answers) {
            let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            myTeam.push(intern)
            console.log('\x1b[33m%s\x1b[0m: ', answers.name + " has been sucessfully added as an Intern");
            addTeamMember();
        })
        .catch(function(err) {
            console.log(err);
            }); 
        break;

        //No more team members selected
        case "I do not want to add any more team members.":
        console.log("\x1b[32m", "The team page has been successfully created!")
        generateFile();
    }

    

}

 //Call the Function
addTeamMember();

function generateFile() {
    fs.writeFileSync(outputPath, render(myTeam),"utf-8")
}

