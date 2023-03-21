

//! mongo shell commands for use

//! adda newuser
//? db.userCollection.insertOne({"username":"James","email":"james@gmail.com","thoughts":[],"friends":[],"__v":0,"friendCount":0})

//!findoneuser
///? db.userCollection.findOne({"username":"James"})

//!insertmany
//? db.users.insertMany([{username:"James",email:"james@gmail.com",thoughts:[],friends:[],__v:0,friendCount:0,},{username:"Jason",email:"jason@gmail.com",thoughts:[],friends:[],__v:0,friendCount:0,},{username:"Jadyn",email:"jadyn@gmail.com",thoughts:[],friends:[],__v:0,friendCount:0,},{	username:"Cam",email:"cam@gmail.com",thoughts:[],friends:[],__v:0,friendCount:0,},{username:"Gabby",email:"gabby@gmail.com",thoughts:[],friends:[],__v:0,friendCount:0,},{	username:"Lisa",email:"lisa@gmail.com",thoughts:[],friends:[],__v:0,friendCount:0,},{username:"Jane",email:"jane@gmail.com",thoughts:[],friends:[],__v:0,friendCount:0,},{username:"Fred",email:"fred@gmail.com",thoughts:[],friends:[],__v:0,friendCount:0,},{username:"Fabien",email:"fabien@gmail.com",thoughts:[],friends:[],__v:0,friendCount:0,},{username:"Tracy",email:"tracy@gmail.com",thoughts:[],friends:[],__v:0,friendCount:0,},{username:"Sofia",email:"sofia@gmail.com",thoughts:[],friends:[],__v:0,friendCount:0,},{username:"Barry",email:"barry@gmail.com",thoughts:[],friends:[],__v:0,friendCount:0,},]);

//! insert one thought
//? db.thoughts.insertOne({thoughtText:"Zed sucks",username:"James",createdAt:"2021-03-01T00:00:00.000Z",reactions:[{reactionBody:"I agree",username:"James",createdAt:"2021-03-01T00:00:00.000Z"}],reactionCount:0,__v:0});
