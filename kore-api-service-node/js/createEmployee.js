/*
    * File Context for local testing
*/

const env = { API_SPREADSHEETS_SLUG: "thisistheslug" }

const context = {
    entities: {
        EmployeeNameEntity: "Milton Waddams",
        EmployeeEmailEntity: "milton.waddams@initech.com"
    },
    session: {
        BotContext: {
            biggestID: 5
        }
    }
};
const print = (message) => {
    console.log(message);
};
const koreDebugger = {
    log: (message) => console.log(message)
};
/*
    * Bot Action
    * Service Type: Custom Service
    * Type: Webservice
    * Sub Type: REST
*/

/*Pre-processor Script*/
const employeeName = context.entities.EmployeeNameEntity[0].split(" ");
koreDebugger.log(`Employee name: Fname: ${employeeName[0]}, Lname: ${employeeName[1]}`);
context.entities.FirstName = employeeName[0];
context.entities.LastName = employeeName[1];

const payload = {
    data: {
        "ID": parseInt(context.session.BotContext.biggestID, 10) + 1,
        "FirstName": context.entities.FirstName,
        "LastName": context.entities.LastName,
        "Email": context.entities.EmployeeEmailEntity
    }
};

context.entities.payload = JSON.stringify(payload);
koreDebugger.log(JSON.stringify(payload));
/*Request Definition
    * Method: POST 
    * URL: "https://api.apispreadsheets.com/data/{{env.API_SPREADSHEETS_SLUG}}/"
    * Auth: None
    * Headers: 
        * "Content-Type: application/json
    * Body: {{context.entities.payload}}
*/
/* Post-processor Script */

/* Other Scripts */

