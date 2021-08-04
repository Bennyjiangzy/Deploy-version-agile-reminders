// let database = require("../database").Database;
// let account = require("../database").Account;
const userModel = require("../database").userModel;
const fetch = require("node-fetch")


let friendcontroller={
    Show: async (req,res)=>{
        // The picture in unsplash is too big we choose another fake api as the user profile pictures

                    // let key="UXjvMBht7TwobeqgUBo9O1Vzf7t1YsYohEc28tUMB6c"
                    // let photos = await fetch(`https://api.unsplash.com/search/photos?query=cats&client_id=${key}`)
                    // let parsedphotos= await photos.json()
        let user_id = req.user.no;
        // show the current user friend list
        let name =req.user.name
        let currentuser= await userModel.findByIdaccount(user_id)
        let allaccount = await userModel.allaccount()
        
        // let currentuser =  account.find(function (user) {
        //     return user.id == user_id;
        //     });
        
        res.render("Social/friend", {account:currentuser.friends,
                                     error:0,
                                     alluser:allaccount,
                                     listener:"filter()",
                                     Username:name})


    },

    add:async (req,res)=>{
        // send the email to the client
        let email = req.body.useremail
        // send the current user id
        let user_id = req.user.no;
        let name =req.user.name
        // find the current user friend list
        let currentuser= await userModel.findByIdaccount(user_id)
        let allaccount = await userModel.allaccount()
        // check the email exist in the account database or not
        let searchuser= await userModel.findOne(email)
        // console.log(searchuser)
        //Show the error if add account repeat or same with current user
        //If no error add friend to current friends list and add current user to the added user friends list
        if(searchuser == undefined){
            res.render("Social/friend", {account:currentuser.friends,
                                         error:1,
                                         alluser:allaccount,
                                         listener:"filter()",
                                         Username:name});

        }else if(searchuser.no == currentuser.no){
            res.render("Social/friend", {account:currentuser.friends,
                                         error:2,
                                         alluser:allaccount,
                                         listener:"filter()",
                                         Username:name});

        }else if(await userModel.checkfriend(currentuser.no,searchuser.no) != undefined){
            res.render("Social/friend", {account:currentuser.friends,
                                         error:3,
                                         alluser:allaccount,
                                         listener:"filter()",
                                         Username:name});

        }else{
            await userModel.addfriend(currentuser.no,searchuser.no)
            // currentuser.friends.push({id:searchuser.id,name:searchuser.name,email:searchuser.email})
            // searchuser.friends.push({id: currentuser.id,name: currentuser.name,email: currentuser.email})
            let updatecurrentuser= await userModel.findByIdaccount(user_id)
            res.render("Social/friend", {account:updatecurrentuser.friends,
                                         error:0,
                                         alluser:allaccount,
                                         listener:"filter()",
                                         Username:name})

        }
    },

    View:async (req,res)=>{
        // get the friend name from url
        let friends = await userModel.findById(parseInt(req.params.fid))


        res.render("Social/friend_reminders", { reminders: friends.reminders,
                                                friendname:friends.name,
                                                friendid:req.params.fid });
    },


    friendRemind:async (req, res) => {
        let reminderToFind = req.params.id;
        let friends = await userModel.findById(parseInt(req.params.fid))
        let searchResult = friends.reminders.find(function (reminder) {
          return reminder.id == reminderToFind;
        });
        if (searchResult != undefined) {
          res.render("Social/single_friend_reminder", { reminderItem: searchResult });
        } else {
          res.render("Social/friend_reminders", { reminders: friends.reminders });
        }
      },

    addReminder: async (req, res) => {
        let user = req.user.no
        let reminderName = req.body.reminderName
        let fid = req.body.fid;
        let weatherkey="f64eb826175eddf4f4465398309206bb"
        let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Vancouver&appid=${weatherkey}`)
        let parseweather=await weather.json()
        await userModel.addfriendreminders(user,fid,reminderName)
        let friendRm = await userModel.getfriendreminders(user)
        let userdata = await userModel.findById(req.user.no)
        
        //find the current user friend list
        // let currentuser = account.find(function (user) {
        //     return user.id == user_id;
        //     });

        // //adding friend's reminders to your database if they are not already there
        // database[reminderName].reminders.forEach(reminder => {
        //     if (database[user].friendReminders.indexOf(reminder) == -1) {
        //         reminderAddName = reminder
        //         reminderAddName.name = reminderName
        //         database[user].friendReminders.push(reminderAddName)
        //     }
        //     if (database[user].friends.indexOf(reminderName) == -1) {
        //         database[user].friends.push(reminderName)
        //     }
        // });

        res.render("reminder/index", { 
            reminders: userdata.reminders, 
            friendsReminders: friendRm, 
            friendlist: userdata.friendReminders,
            weatherdata:parseweather,
            Username: req.user.name,
        });
    }
};


module.exports = friendcontroller