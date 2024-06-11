![kore logo](../assets/kore-logo.png)
# Postman Quick Tips

#### How to: Postman quick tips for debugging and testing API calls

### Watch the example video 
[https://www.loom.com/share/7be24d6a8a3f4d6983124627c0e8a8f1?sid=22ea90c3-0e06-48bc-a09e-9b05188c862f](https://www.loom.com/share/7be24d6a8a3f4d6983124627c0e8a8f1?sid=22ea90c3-0e06-48bc-a09e-9b05188c862f)

## Introduction

This guide offers a step-by-step approach to integrate the XO platform seamlessly with a CRM, using Zendesk as an example. 
By following these steps, users can enhance their ticket management capabilities, enabling remote ticket creation, viewing, updating, and deletion. 
The outlined process is not exclusive to Zendesk and can be adapted for other CRM systems with similar steps, ensuring a versatile integration that optimizes workflow efficiency.

### Status codes: 
[https://developer.mozilla.org/en-US/docs/Web/HTTP/Status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

Review Status codes to better understand server responses. 

Whenever you have an unexpected result, the first thing one should check is the status code. 

### Useful Tips:

For example, let's say you have an application that requires a JWT for all requests, except the authentication request. 

In the auth request, you provide a client ID, client Secret and application Id. 

With the proper setup, you can easily set the response token as an environment variable and then use that for subsequent requests. 

##### Environments, Scripts, Requests 
- Create a new environment: local
- Switch to local
- Create new environment variable
- Create server file : example at [./js/index.js](./js/index.js)
- Start server from terminal : in the js directory, run `npm run start` or `node index.js`
- Add Authenticate request
    - Url : `http://localhost:8000/authenticate`
    - Method: `POST`
    - Body type: `raw JSON`
    - Body: `{{authenticateBody}}`
    - Add Scripts > Pre-request script to authenticate: 
        ```
        const correctBody = {"clientId":"123456789", "clientSecret":"thisismysecret", "appId":"xoplatform"};
        const notCorrectBody = {"clientId": "12345"};
        pm.collectionVariables.set("authenticateBody", JSON.stringify(correctBody));
        ```
        - You can use this script to easily change the request body in order to test good and bad requests
    - Add Scripts > post-response script to authenticate 
        - ```
            const res = pm.response.json();
            const token = res.data;
            pm.environment.set("postmanQuickTipsToken", token);
            ```
- Run Authenticate request
- Check local environment variables : Your postmanQuickTipsToken should have a value
- Add Users request
    - Url : `http://localhost:8000/users`
    - Method: `GET`
    - Headers: `Content-Type: application/json`, `auth: thisismytoken`
- Run Users request: it should fail with a useful error
- Update auth header value to be `{{postmanQuickTipsToken}}`
- Re-run request: it should be successful

### How to Debug:

1. Review API Documentation:
   - Always refer to the API documentation for correct usage, authentication methods, and expected responses.

2. Inspect Request Configuration:
   - Verify that your request configuration is accurate, including URL, headers, parameters, and request body.

3. Check Status Codes:
   - Pay attention to the HTTP status codes in the response. They provide crucial information about the success or failure of the request.

4. Use Postman or Similar Tools:
   - Test your API endpoints using tools like Postman. Inspect the request and response details.

5. Look at Response Body:
   - Examine the response body for error messages or additional information provided by the server.

6. Use Logging:
   - Introduce logging statements in your server-side code to trace the execution flow and identify potential issues.

7. Check Server Logs:
   - Inspect server logs for error messages and stack traces that can provide insights into server-side issues.

8. Community Support:
   - If you're stuck, consider reaching out to the API provider's support or community forums for assistance.

