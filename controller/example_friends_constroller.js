let Account=[
    {
        id: 1,
        name: "cindy",
        email: "cindy123@gmail.com",
        password: "cindy123!",
        friends:[],
      },
      
      {
        id: 2,
        name: "alex",
        email: "alex123@gmail.com",
        password: "alex123!",
        friends:[],
      },
]


let user_id=1
let currentuser = Account.find(function (user) {
    return user.id == user_id;
    });
let email ="cindy123@gmail.com"
let searchuser = Account.find(function (user) {
    return user.email == email;
    });


// currentuser.friends.push({id:searchuser.id,name:searchuser.name,email:searchuser.email})

console.log(searchuser)