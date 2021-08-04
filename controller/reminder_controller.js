// let database = require("../database").Database;
const userModel = require("../database").userModel;
const fetch = require("node-fetch");
let Show=true
let Tag_show=true


let remindersController = {
  list: async (req, res) => {
    let weatherkey="f64eb826175eddf4f4465398309206bb"
    let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Vancouver&appid=${weatherkey}`)
    let parseweather=await weather.json()
    let name =req.user.name
    let userdata = await userModel.findById(req.user.no)
    let friendRm = await userModel.getfriendreminders(req.user.no)
    

    
    res.render("reminder/index", { reminders: userdata.reminders,
                                   weatherdata:parseweather,
                                    Username:name,
                                    friendsReminders: friendRm, 
                                    friendlist: userdata.friendReminders});
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: async (req, res) => {
    let userdata = await userModel.findById(req.user.no)
    let reminderToFind = req.params.id;
    let name =req.user.name; 
    let weatherkey="f64eb826175eddf4f4465398309206bb"
    let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Vancouver&appid=${weatherkey}`)
    let parseweather=await weather.json()
    let searchResult= await userModel.findreminders(req.user.no,reminderToFind)
    let friendRm = await userModel.getfriendreminders(req.user.no)

    
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult,
                                                Show:Show,
                                                Tag_show:Tag_show,
                                                Username:name });

    } else {
      res.render("reminder/index", { reminders: userdata.reminders,
                                    weatherdata:parseweather,
                                    Username:name,
                                    friendsReminders: friendRm, 
                                    friendlist: userdata.friendReminders});
      
      } 
    
    
  },

  create: async (req, res) => {
    
    let id = req.user.no
    await userModel.createnewremidners(id,req.body)
    res.redirect("/reminders");
    // The local version database
    // let name =req.user.name
    // let reminder = {
    //   id: database[name].reminders.length + 1,
    //   title: req.body.title,
    //   description: req.body.description,
    //   completed: false,
    //   date: req.body.date,
    //   tag: [req.body.tag],
    //   subtask:[]
    // };
    // database[name].reminders.push(reminder);
  }, 

  edit: async (req, res) => {
    let reminderToFind = req.params.id;
    
    let name =req.user.name
    let searchResult= await userModel.findreminders(req.user.no,reminderToFind)
    res.render("reminder/edit", { reminderItem: searchResult,
                                  Username:name});
    //The local version of the database
    // let searchResult = database[name].reminders.find(function (reminder) {
    //   return reminder.id == reminderToFind;
    // });
  },

  update: async (req, res) => {
    let reminderToFind = req.params.id;
    await userModel.updatereminders(req.user.no,reminderToFind,req.body)
    res.redirect("/reminder/" + reminderToFind)
        //The local version of the database
        // let searchResult = database[name].reminders.find(function (reminder) {
        //   return reminder.id == reminderToFind;
        // });

        // let num = database[name].reminders.indexOf(searchResult)
        // searchResult.title = req.body.title
        // searchResult.description = req.body.description
        // searchResult.date = req.body.date
        // if (req.body.completed == "true") {
        //   searchResult.completed = true
        // } else if (req.body.completed == "false") {
        //   searchResult.completed = false
        // };

        // database[name].reminders[num]=searchResult
  },

  delete: async (req, res) => {
    let reminderToFind = req.params.id;
    await userModel.deletereminders(req.user.no,reminderToFind)
    res.redirect("/reminders");

    //The local version of the database
    // let name = req.user.name;
    // let searchResult = database[name].reminders.find(function (reminder) {
    //   return reminder.id == reminderToFind;
    //   });

    //   if(searchResult !== -1){
    //     let result = database[name].reminders.filter(elem => elem !== searchResult)
    //     database[name].reminders=result
    //   }
  },

  subtask:async (req,res)=>{
    let reminderToFind = req.params.id;
    let name = req.user.name;
    let inputvalue=req.body.buttonsub
    let searchResult= await userModel.findreminders(req.user.no,reminderToFind)
    if(inputvalue== "add"){
      let Show=false
      res.render("reminder/single-reminder", { reminderItem: searchResult,
                                                  Show:Show,
                                                  Tag_show:Tag_show,
                                                  Username:name })
    }else if (inputvalue == "Submit"){
      
      await userModel.addsubtask(req.user.no,reminderToFind,req.body.subtask)
      
      let updateresult=await userModel.findreminders(req.user.no,reminderToFind)
      let Show=true
      res.render("reminder/single-reminder", { reminderItem: updateresult,
                                                Show:Show,
                                                Tag_show:Tag_show,
                                                Username:name })
    }else{
        await userModel.deletesubtask(req.user.no,reminderToFind,inputvalue)
        res.redirect("/reminder/" + reminderToFind)
    }
  },
  


  tags:async (req,res)=>{
    let reminderToFind = req.params.id;
    let name = req.user.name;
    let inputvalue=req.body.buttonsub
    let searchResult= await userModel.findreminders(req.user.no,reminderToFind)
    if(inputvalue== "add"){
      let Tag_show=false
      res.render("reminder/single-reminder", { reminderItem: searchResult,
                                                Show:Show,
                                                Tag_show:Tag_show,
                                                Username:name})

    }else if (inputvalue == "Submit"){
      if(req.body.tag){
        await userModel.addtag(req.user.no,reminderToFind,req.body.tag)
      }
      let updateresult=await userModel.findreminders(req.user.no,reminderToFind)
      let Tag_show=true
      res.render("reminder/single-reminder", { reminderItem: updateresult,
                                                Show:Show,
                                                Tag_show:Tag_show,
                                                Username:name})
    }else{
        await userModel.deletetag(req.user.no,reminderToFind,inputvalue)
        res.redirect("/reminder/" + reminderToFind)
    }
  }
};



module.exports = remindersController
