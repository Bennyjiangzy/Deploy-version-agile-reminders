const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const friendcontroller = require("./controller/friend_controller");
const authController = require("./controller/auth_controller");
const passport = require("./middleware/passport");
const { ensureAuthenticated, forwardAuthenticated } = require("./middleware/checkAuth");
const { friendData } = require("./controller/friend_controller");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(ejsLayouts);

app.set("view engine", "ejs");
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Routes start here
app.use((req, res, next) => {
  // console.log(`User details are: `);
  // console.log(req.user);

  // console.log("Entire session object:");
  // console.log(req.session);

  // console.log(`Session details are: `);
  // let x=Object.keys(req.sessionStore.sessions)
  // console.log(x);
  // Object.keys()


  // console.log(req.sessionStore.sessions)
  next();
});


app.get("/reminders",ensureAuthenticated, reminderController.list);

app.get("/reminder/new", ensureAuthenticated, reminderController.new);

app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);

app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

app.post("/reminder/:id/editsub", ensureAuthenticated, reminderController.subtask);


app.get("/friend", ensureAuthenticated, friendcontroller.Show);

app.get("/friend/:fid", ensureAuthenticated, friendcontroller.View);
  
app.post("/reminder/:id/tag", ensureAuthenticated, reminderController.tags);

app.post("/reminder/", ensureAuthenticated, reminderController.create);

// Implement this yourself
app.post("/reminder/update/:id", ensureAuthenticated, reminderController.update);

// Implement this yourself
app.post("/reminder/delete/:id", ensureAuthenticated, reminderController.delete);

app.post("/reminder/:id/tag", ensureAuthenticated, reminderController.tags);

app.post("/friend", ensureAuthenticated, friendcontroller.add);

// To see friend's reminders in detail
app.get("/friend/:fid/:id", ensureAuthenticated, friendcontroller.friendRemind)

// adding friends reminders to your list
app.post("/reminders", ensureAuthenticated,friendcontroller.addReminder)


//passport

app.get("/register", authController.register);
app.get("/login", forwardAuthenticated, authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login",  authController.loginSubmit);
app.get("/logout", (req,res)=>{
  req.logout();
  res.redirect("/login")
})

app.listen(process.env.PORT || 3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
 