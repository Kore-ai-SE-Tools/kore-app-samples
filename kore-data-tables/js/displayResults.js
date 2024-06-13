// DisplayResults
const queryResults = context.GetDetailsService.response.body.queryResult;

let elements = [];

if (queryResults.length === 0) {
    return print("Sorry, we don't have any appointments listed");
}

let index = 1;
for (const el of queryResults) {
    const value = {
        Values: [index.toString(), el.Name, el.ContactNum, el.Time]
    }
    elements.push(value);
    index++;
}

var message = {
    "type": "template",
    "payload": {
        "template_type": "table",
        "text": "Appointment details",
        "columns": [
            ["Sl", "center"], ["Name"], ["Contact"], ["Time"]
        ],
        "table_design": "regular",
        "elements": elements,
        speech_hint: "Here is your appointment details"
    }
}
print(JSON.stringify(message))



