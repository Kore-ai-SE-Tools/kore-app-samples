const apiData = [{ "contentId": "fc-7b7a0212-620e-430f-8237-f801e42c7a34", "sys_content_type": "web", "score": 28.190445, "keywords": [], "config": { "pinIndex": -1, "boost": 1, "visible": true }, "addedResult": false, "customization": {}, "page_url": "https://blog.kore.ai/cx-trends-shaping-2024-and-beyond", "sys_source_name": "https://blog.kore.ai/cx-trends-shaping-2024-and-beyond", "page_title": "Decoding the Dynamics of CX: Trends Shaping 2024 and Beyond!", "page_image_url": "https://blog.kore.ai/hubfs/Insights%20from%20the%20Customer%20Experience%20Frontlines%20Decoding%20the%20Dynamics%20of%20CX%20Trends%20Shaping%202024%20and%20Beyond!.png#keepProtocol", "sys_racl": ["*"], "page_preview": "Explore the future of customer experience in 2024 with Kore.ai&#x27;s <span class=\"highlightText\">CX</span> Benchmark Report. Discover AI&#x27;s role in transforming customer service and key trends shaping engagement. Uncover insights from our comprehensive global research.", "createdOn": "2024-05-22T19:26:23.454000" }];

const context = {
    SearchAPIReq: {
        response: {
            body: {
                template: {
                    results: {
                        web: {
                            data: apiData
                        }
                    }
                }
            }
        }
    }
};

const koreDebugger = {
    log: (message) => console.log(message)
};
const print = (message) => koreDebugger.log(message);

/*
    * ABOVE IS SETUP FOR LOCAL EXECUTION
*/

const results = context.SearchAPIReq.response.body.template.results.web.data;
koreDebugger.log(results);

var message = {
    "type": "template",
    "payload": {
        "template_type": "list",
        "elements": [],
        "buttons": [
            {
                "title": "View More",
                "type": "postback",
                "payload": "payload"
            }
        ]
    }
};
for (i = 0; i < results.length; i++) {
    if (results[i].score < 10) {
        continue;
    }
    //if element doesn't need to have buttons
    var element = { //
        "title": results[i].page_title,
        "image_url": results[i].page_image_url,
        "subtitle": results[i].page_preview,
        "default_action": {
            "type": "web_url",
            "url": results[i].page_url,
            "messenger_extensions": true,
            "webview_height_ratio": "tall",
            "fallback_url": "fallback url"
        }
    };
    /*

     /* Uncomment this if the element is having buttons
     var element =  { //
     "title": info[i],
     "image_url": "image url of the element",
     "subtitle": "Description of the element",
     "default_action": {
     "type": "web_url",
     "url": "Url to redirect when user clicks on the element",
     "messenger_extensions": true,
     "webview_height_ratio": "tall",
     "fallback_url": "fallback url"
     },
     buttons:[
     {
     "title": "button1",
     "type": "web_url",
     "url": "url to redirect",
     "messenger_extensions": true,
     "webview_height_ratio": "tall",
     "fallback_url": "fallback url"
     }
     ]
     } */
    message.payload.elements.push(element);
}
print(JSON.stringify(message));

