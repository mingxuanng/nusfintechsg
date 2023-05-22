// this file link to mock_data js file

const express = require('express')
const data = require('./mock_data')
const app = express()

// tell express object to use JSON format when we send a body in our POST
app.use(express.json());

app.get('/', function (request, response) {
    response.send('Hello World')
  })

app.get("/sum", (request, response) => {
    let n1 = parseFloat(request.query.n1);
    let n2 = parseFloat(request.query.n2);

    let sum = n1 + n2;

    response.send(`Sum is : ${sum}`);
});

app.get("/users/all", (request, response) => { // can insert middleware Auth here as well
    let users = data.get_all_users(); // calling function within mock_data.js
    response.send(users);
});

app.get("/users/by-id", (request, response) => {  // writing APIs can let you decide on the path
    let user = data.get_user_by_user_id(parseInt(request.query.user_id));
    if (user)
        response.status(200).send(user); // if no user, return null then will show 404.
    else
        response.status(404).send("User not found");
});

app.post("/users/add", (request, response) => {
    let result = data.add_user(request.body); //don't repeat variables here?
    if (result)
        response.send("User added OK");
    else
        response.status(500).send("User not added");
});

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})