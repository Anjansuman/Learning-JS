"use strict";
function sumOfAge(user1, user2) {
    return user1.age + user2.age;
}
const added = sumOfAge({ name: "Anjan", age: 18 }, { name: "Suman", age: 20 });
console.log(added);
