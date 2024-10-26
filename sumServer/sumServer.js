const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/sum", (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    const sum = a + b;
    res.send(sum.toString());
})

app.listen(3000, () => {
    console.log("Server is running in http://localhost:3000");
});