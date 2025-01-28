"use strict";
// we have to define it like this 
const user1 = {
    age: 18,
    name: "Anjan",
};
// Map is a javascript concept but without generics.
const Users2 = new Map();
// set a data into map
Users2.set("hashId", { name: "Anjan", age: 18, email: "anjan.com" });
Users2.set("2ndhashId", { name: "Abhishek", age: 20, email: "abhishek.com" });
// get the data
const newUser = Users2.get("hashId");
console.log(newUser);
