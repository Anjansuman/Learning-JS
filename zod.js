const express = require("express");
const zod = require("zod")
const app = express();

// this zod is making a structure like this
// {
//    email: string => email
//    password: atleast 8 letters
//    country: either IN or US
// }
const schema = zod.object({
    // zod provides us this to use email directly
    email: zod.string().email(),
    password: zod.string().min(8),
    country: zod.literal("IN").or(zod.literal("US"))
})

app.use(express.json());

app.post("/user", (req, res) => {
    const credentials = req.body;
    const response = schema.safeParse(credentials);

    res.send({
        response
    });
});

app.listen(3000);