"use strict";
function useProfile(user) {
    console.log(`Name: ${user.name}, Email: ${user.email}`);
}
const data1 = {
    name: "Anjan",
    age: 18
};
// so, here I can change the age but not the name
// data1.name = "Suman"; // this will through an error
// but we can do this
data1.age = 20;
const data2 = {
    name: "Anjan",
    age: 18
};
// now this data can't be changed
