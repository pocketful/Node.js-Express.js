// eslint-disable-next-line no-unused-vars
const users = [
  {
    email: 'test1@test.com',
    age: 25,
    gender: 'female',
    hasCar: true,
  },
  {
    email: 'test2@test.com',
    ahe: 32,
    gender: 'male',
    hasCar: false,
  },
  {
    email: 'test3@test.com',
    age: 15,
    gender: 'female',
    hasCar: true,
  },
  {
    email: 'test4@test.com',
    age: 10,
    gender: 'female',
    hasCar: true,
  },
];

// insert many
// db.users.insertMany([{email: 'test5@test.com', gender: 'female', hasCar: true, city: 'LA'},{email: 'test6@test.com', gender: 'female', hasCar: true}])
// db.users.insertMany([{email:"test@test.com",age:20,gender:"female",hasCar:true},{email:"test@test.com",age:30,gender:"male",hasCar:false},{email:"test@test.com",age:10,gender:"female",hasCar:true},{email:"test@test.com",age:40,gender:"female",hasCar:true}])

users.map((userObj) => console.log(userObj.name)); // destructuring example
users.map(({ email, age }) => console.log(email, age)); // destructuring example
