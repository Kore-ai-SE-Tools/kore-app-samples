const createInidentResponse = context.CreateTicketService.response;
const setCallerResponse = context.CreateTicketService.response;

let createStatusCode = createInidentResponse.statusCode * 1;
let setCallerStatusCode = setCallerResponse.statusCode * 1;

let response = '';
if ((createStatusCode >= 200 && createStatusCode <= 299) && (setCallerStatusCode >= 200 && setCallerStatusCode <= 299)) {
    const responseResult = createInidentResponse.body.result;


    const url = responseResult.opened_by.link;
    let url_splitted = url.split('/')
    let baseURL = `https://${url_splitted[2]}`;

    const colorCodes = {
        "1 - Critical": "#ff3333",
        "2 - High": "#ff80ff",
        "3 - Moderate": "#ffff00",
        "4 - Low": "#00ccff",
        "5 - Planning": "#66ff33"
    }

    let subListItem =
        [{
            "title": `${responseResult.number}`,
            "description": "Priority: " + responseResult.priority,
            "isCollapsed": false,
            "imageSize": "small",
            "iconShape": "circle-img",
            "view": "default",
            "iconSize": "small",
            "isAccordian": true,
            "titleStyles": {
                "font-size": "16px"
            },
            "borderAvailable": true,
            "borderStyles": {
                "Width": "6px",
                "Height": "36px",
                "Radius": "4px",
                "Padding": "10px, 0px, 0px, 0px",
                "background": colorCodes[responseResult.priority]
            },
            "textInformation": [
                {
                    "title": `short Description: ${responseResult.short_description.slice(0, 25)} \n \r Description: ${responseResult.description.slice(0, 25)}...`,
                }
            ],
            "seeMoreAction": "dropdown",
            "buttonsLayout": {
                "displayLimit": {
                    "count": "1"
                },
                "buttonAligment": ""
            },
            "buttons": [
                {
                    "type": "url",
                    "title": "View Incident",
                    "url": `${baseURL}/sp?sys_id=${responseResult.sys_id}&view=sp&id=ticket&table=incident`,
                    "buttonStyles": {
                        "background": "#0D6EFD",
                        "color": "#FFFFFF"
                    },
                    "synonyms": []
                }
            ],
            "headerOptions": [
                {
                    "type": "icon",
                    "icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAARCAYAAADUryzEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAB9SURBVHgB1dDBDYAgDAXQggzACEQcwFEcgRHcRDcwbsBCJuzhARXjCW0bvOi/kLT8dyjA52JSmp77X+ajqgUBg6ntBGWA1OmJwnEQiW4ZCA4wEBogEB5wIcZ2L4A4h7D4MuAsu7sV44jPZRogyjjAKB9R+Wj1EJXeyyP8IhvS4jEyv8KUgAAAAABJRU5ErkJggg==",
                    "iconRotation": "180"
                }
            ]

        }]


    var message = {
        "type": "template",
        "payload": {
            "template_type": "advancedMultiListTemplate",
            "seeMore": true,
            "seeMoreAction": "modal",
            "listItemDisplayCount": 1,
            "listViewType": "normal",
            "seeMoreIcon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADgSURBVHgBjZLREcFAEIZ3944XDCUogQ7ogArwajBKSAmSB6+ogA7SglKO4UWSXbkMGeFGsk93t/93e/vfIqTRXEQDIBhASUgsp/u2fqbG/NFDomN61ilhOqRVaAto1DgS4MMtqK1LIGiuIrAvotfeQLXIdNqVaS05BJSuXSOguQbU/8yTC1IKx8I8s30ISO8774SsGBXt0l59V5I06b21MlevpZsIhyKZOZ4LwsL1JUDqnld4XpUKPz1VBLIByC1XSH3jK/OuGnM8LciR2igw4TgZ5pDZ4P8PFr4Iw9jO3hOVYGvbr6vWzAAAAABJRU5ErkJggg==",
            "userUtterance": "",
            "listItems": [
                {
                    "title": "Incident Created",
                    "subListItems": subListItem
                }
            ]
        }
    }

    response = JSON.stringify(message)

}
else
    response = `Error ${(createStatusCode >= 200 && createStatusCode <= 299) ? setCallerStatusCode : createStatusCode}.\n${createInidentResponse.body?.error?.message || setCallerResponse.body?.error?.message}`
print(response);
