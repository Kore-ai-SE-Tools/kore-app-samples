/*
    * File Context for local testing
*/

const env = { API_SPREADSHEETS_SLUG: "thisistheslug" };
const context = {
    ReadEmployeesService: {
        response: {
            body: {
                data: [{ ID: 1, FirstName: "Peter", LastName: "Gibbons", Email: "peter.gibbons@initech.com" }]
            }
        }
    }
}

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
/*Request Definition
    * Method: GET
    * URL: "https://api.apispreadsheets.com/data/{{env.API_SPREADSHEETS_SLUG}}/"
    * Auth: None
    * Headers: 
        * "Content-Type: application/json
*/
/*Post-processor Script*/

const employeeList = context.ReadEmployeesService.response.body.data;

let biggestID = 0;

for (const el of employeeList) {
    if (el.ID > biggestID) {
        biggestID = el.ID
    }
}

/* Other Scripts*/
/*
    * PrintEmployeeList
*/
const employeesServiceRes = context.ReadEmployeesService.response.body.data;
koreDebugger.log(employeesServiceRes);


var message = {
    "type": "template",
    "payload": {
        "template_type": "table",
        "text": "Account details",
        "columns": [
            ["ID", "center"], ["FirstName"], ["LastName"], ["Email", "right"]
        ],
        "table_design": "regular",
        speech_hint: "Here is your account details",
        elements: []
    }
};
var ele = [];
for (const el of employeesServiceRes) {
    var elementArr = [el.ID, el.FirstName, el.LastName, el.Email];
    ele.push({ 'Values': elementArr });
}
message.payload.elements = ele;
print(JSON.stringify(message));

