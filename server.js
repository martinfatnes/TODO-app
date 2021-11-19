const express = require('express');
const users = require("./modules/login/users");
const lists = require('./modules/APP/content');
const server = express();
const PORT = process.env.PORT || 8080;

server.use(express.static('public'));
server.set("PORT", PORT);
server.use(express.json());
server.use(users);
server.use(lists);

server.listen(server.get('PORT'), function(){
    console.log("server running", server.get("PORT"));
})