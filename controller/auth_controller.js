const { userModel } = require("../database");
const passport = require("../middleware/passport");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register",{
      Accounterror:false,
      Passworderror:false,
      Passworderror2:false,
      email:"",
      name:"",
      password:""
      });
  },

  loginSubmit:
    
    passport.authenticate("local", {
      successRedirect: "/reminders",
      failureRedirect: "/login",
    }),
 
  registerSubmit: async (req, res) => {
    let passworderror=userModel.checkpassword(req.body.password)
    let accounterror= await userModel.checkeamilexistence(req.body.email)
    
      if (passworderror && accounterror){
                      res.render("auth/register",{
                                        Accounterror:accounterror,
                                        Passworderror:passworderror,
                                        Passworderror2:false,
                                        email:"",
                                        name:req.body.username,
                                        password:""
                                        })
      }else if (passworderror){
                      res.render("auth/register",{
                                        Accounterror:accounterror,
                                        Passworderror:passworderror,
                                        Passworderror2:false,
                                        email:req.body.email,
                                        name:req.body.username,
                                        password:""
                                        })

      }else if(accounterror){
                      res.render("auth/register",{
                                        Accounterror:accounterror,
                                        Passworderror:passworderror,
                                        Passworderror2:false,
                                        email:"",
                                        name:req.body.username,
                                        password:req.body.password
                                        })

      }else if(req.body.password2 !== req.body.password){
                      res.render("auth/register",{
                                        Accounterror:accounterror,
                                        Passworderror:passworderror,
                                        Passworderror2:true,
                                        email:req.body.email,
                                        name:req.body.username,
                                        password:req.body.password
                                        })

      }else{
      await userModel.registernewaccount(req.body.email,req.body.password,req.body.username)
                    res.render("auth/registersuccess",{
                                        Useremail:req.body.email
                                      })
      }
    

  },
};

module.exports = authController;
