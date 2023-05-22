const express = require("express");
const apis = require("./api");

let app = express();

app.use(apis.router);

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})