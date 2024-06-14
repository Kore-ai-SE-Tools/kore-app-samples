// Get your Access Key and Access Secret at dashboard.sinch.com/settings/access-keys
const express = require('express');
const app = express();
require("dotenv").config()
app.use(express.json());
const PORT = process.env.PORT || 3232;
//route to post handler 
const postHandler = require('./routes/PostHandler')
app.use(postHandler)

app.get('/', (req, res) => {
    res.send('this instagram Kore.ai deployment channel')
})

app.listen(PORT, () => {
    console.log("Listening at http://localhost:" + PORT);
});
