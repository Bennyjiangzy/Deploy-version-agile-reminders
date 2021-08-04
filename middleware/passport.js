const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const authController = require("../controller/Account_controller");
const localLogin = new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      // console.log(email);
      // console.log(password);
      const user = await authController.getUserByEmailIdAndPassword(email, password);
      
      try {
        return user
        ? done(null, user)
        : done(null, false, {
            message: "Your login details are not valid. Please try again",
          });
      } catch(err){
        return err
      }
      
    }
  ); 

passport.serializeUser(function (user, done) {
    done(null, user.no);
});
  
passport.deserializeUser(async function (no, done) {
    let user = await authController.getUserById(no);
    // console.log(user)
    try{
      if (user) {
        // console.log(user)
        done(null, user)
      } else {
        done({ message: "User not found" }, null);
      } 
    }catch(err){
      return err
    }
    // if (user) {
    //   done(null, user)
    // } else {
    //   done({ message: "User not found" }, null);
    // } 
})
  
module.exports = passport.use(localLogin);