/*
    * File Context for local testing
*/

const env = { API_SPREADSHEETS_SLUG: "thisistheslug" };
const context = {
    ReadEmployeesService: {
        response: {
            body: {
                data: [{ ID: 1, FirstName: "Peter", LastName: "", Email: "peter.gibbons@initech.com" }]
            }
        }
    },
    entities: {
        UpdateTypeEntity: "Last Name",
        UpdateValueEntity: "Gibbons",
        EmployeeIDEntity: 1
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
    * URL: "https://api.apispreadsheets.com/data/{{env.API_SPREADSHEETS_SLUG}}/?query=delete from {{env.API_SPREADSHEETS_SLUG}} where ID={{context.entities.EmployeeID}}"
    * Auth: None
    * Headers: 
        * "Content-Type: application/json
*/
/*Post-processor Script*/

/* Other Scripts*/

