const express = require("express");
const app = express();

const users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }]
}]

app.use(express.json());

// This going to get the info about the kidneys
app.get("/", (req, res) => {
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    for(let i=0; i < johnKidneys.length; i++) {
        if(johnKidneys[i].healthy) {
            numberOfHealthyKidneys += 1;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

    res.json({
        johnKidneys,
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})

// This is going to add a kidneys from the user (it can be healthy or unhealthy, the user will decide)
app.post("/", (req, res) => {

    // this line makes the input to user input 
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done!"
    })
})

// This makes the all the kidneys healthy
app.put("/", (req, res) => {

    if(!anyUnhealthyKidneys()) {
        res.status(411).json({
            msg: "all kidneys are already healthy!"
        })
        return;
    }

    const k = users[0].kidneys.length;
    for(let i=0; i < k; i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({
        msg: "Now all kidneys are healthy!"
    })
})

// This deletes the unhealthy kidneys
app.delete("/", (req, res) => {

    if(!anyUnhealthyKidneys()) {
        res.status(411).json({
            msg: "all kidneys are healthy!"
        })
        return;
    }
    let newKidneys = [];
    for(let i=0; i < users[0].kidneys.length; i++) {
        if(users[0].kidneys[i].healthy) {
            newKidneys.push({
                healthy: true
            })
        }
    }
    users[0].kidneys = newKidneys;

    res.json({
        msg: "Now kidneys are filtered!"
    })
})

function anyUnhealthyKidneys() {
    // this loop will return true if it ever finds that any kidney is unhealty else it will return false
    for(let i=0; i < users[0].kidneys.length; i++) {
        if(!users[0].kidneys[i].healthy) {
            return true;
        }
    }
    return false;
}

app.listen(3000);