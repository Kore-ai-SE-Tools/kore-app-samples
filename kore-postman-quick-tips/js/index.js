const express = require('express');
const jwt = require("jsonwebtoken");
const fs = require('fs');
const app = express();
const PORT = 8000;
app.use(express.json());

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.post('/authenticate', (req, res) => {
    try {
        console.log(req.body);
        const { clientId, clientSecret, appId } = req.body;

        if (!clientId || !clientSecret || !appId) {
            throw new Error("bad request");
        }
        const key = fs.readFileSync('./private.key');
        const token = jwt.sign({ clientId, clientSecret, appId }, key, { algorithm: "HS256", header: { alg: "HS256", typ: "JWT" } })

        console.log(token)
        res.status(200);
        res.send({ data: token });
    } catch (error) {
        console.log('error in authenticate: ', error)
        res.status(400);
        res.send({ error: "bad request, clientId, clientSecret and / or appId are missing" });
        return;
    }

});

app.get('/users', (req, res) => {

    try {
        const token = req.headers.auth;

        if (!token) {
            throw new Error("No token");
        }

        const key = fs.readFileSync('./private.key');

        const jwtPayload = jwt.verify(token, key);
        if (!jwtPayload) {
            throw new Error("Invalid JWT");
        }
        res.status(200);
        res.send({
            data: [
                { name: "David" },
                { name: "Curtis" },
                { name: "Trevor" }
            ]
        });

    } catch (error) {
        console.log(error);
        res.status(500);
        res.send({ error: 'Error getting users ' + error })
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port:${PORT}`);
});
