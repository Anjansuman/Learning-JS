interface User {
    id: number,
    name: string,
    age: number,
    email: string,
    password: string,
}

// use of Pick and Partial
type userProfile = Pick<User, 'name' | 'age' | 'email'>;

type userProfileOptional = Partial<userProfile>;

function useProfile(user: userProfileOptional) {
    console.log(`Name: ${user.name}, Email: ${user.email}`);
}

// If a const variable have inside values, e.g. Arrays, interface, then the whole variable can't be changed instead we can change the inside values.

// use of Readonly(direct used while defining data) or readonly(used while defining specific data inside an interface)

interface Config1 {
    // lowercase 'readonly' helps in managing which data can't be changed more specifically.
    readonly name: string,
    age: number
}

const data1: Config1 = {
    name: "Anjan",
    age: 18
}

// so, here I can change the age but not the name
// data1.name = "Suman"; // this will through an error

// but we can do this
data1.age = 20;

// Now for the Readonly part, it defines the whole data to not customizable
interface Config2 {
    name: string,
    age: number
}

const data2: Readonly<Config2> = {
    name: "Anjan",
    age: 18
}
// now this data can't be changed
