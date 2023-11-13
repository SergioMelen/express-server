const express = require("express")
const app = express();
const port = 4000;

const listaTareas = [
    {"id": "1", "isComplete": "false", "description": "walk the dog"},
    {"id": "2", "isComplete": "false", "description": "clean my house"}
]

app.get("/", (req, res) => {
    res.json(listaTareas);
});

app.listen(port, () => {
    console.log("server listening on " + port);
}); 











