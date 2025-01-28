
// this is for storing two data-set with key value pairs
// but in this we have to define every part of it not like maps.
type Users1 = Record<string, {age: number, name: string}>

// we have to define it like this 
const user1: Users1["anjan"] = {
    age: 18,
    name: "Anjan",
}
// and this is ugly
// so, here's the concept of hashmaps

type user = {
    name: string,
    age: number,
    email: string
}

// Map is a javascript concept but without generics.
const Users2 = new Map<string, user>();

// set a data into map
Users2.set("hashId", { name: "Anjan", age: 18, email: "anjan.com" });
Users2.set("2ndhashId", { name: "Abhishek", age: 20, email: "abhishek.com" });

// get the data
const newUser = Users2.get("hashId");
console.log(newUser);
