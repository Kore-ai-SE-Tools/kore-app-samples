/* File Context for local testing */

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

const validTypes = ["FirstName", "LastName", "Email"];
const ent = context.entities;
const updateKey = ent.UpdateTypeEntity;
const updateValue = ent.UpdateValueEntity;

const validateType = (type) => {
    for (const valType of validTypes) {
        type = type.split(" ").join("").toLowerCase();
        if (valType.toLowerCase().includes(type)) {
            return valType;
        }
    }
    return null;
};
if (!validateType(updateKey)) {
    return print("Type is invalid");
}
const payload = {
    data: {
        [validateType(updateKey)]: [updateValue],
        ID: parseInt(ent.EmployeeIDEntity, 10)
    },
    query: `select * from ${env.API_SPREADSHEETS_SLUG} where ID=${ent.EmployeeIDEntity}`
};

context.entities.updateUserPayload = JSON.stringify(payload);
/*Request Definition
    * Method: POST 
    * URL: "https://api.apispreadsheets.com/data/{{env.API_SPREADSHEETS_SLUG}}/"
    * Auth: None
    * Headers: 
        * "Content-Type: application/json
    * Body: {{context.entities.updateUserPayload}}
*/
/*Post-processor Script*/

/* Other Scripts*/
/*
    * PrerequestMessage 
    * "Updating employee {{context.entities.EmployeeIDEntity}} with {{context.entities.UpdateTypeEntity}} : {{context.entities.UpdateValueEntity}}"
*/

