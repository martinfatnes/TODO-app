const express = require('express');
const server = express();
const PORT = process.env.PORT || 8080;

server.set("PORT", PORT);
server.use(express.json());

server.listen(server.get('PORT'), function(){
    console.log("server running", server.get("PORT"));
})

function test(){
    console.log("test");
}