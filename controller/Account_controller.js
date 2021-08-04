const userModel = require("../database").userModel;


const getUserByEmailIdAndPassword = async (email, password) => {
  let user =await userModel.findOne(email);
  if (!user){
    return;
  }try{

    if (isUserValid(user, password)) {
      // console.log(user)
      return user;
    }
  }catch(err){
    console.log(err)
  }
  // // The local database VERSION
  // // user.then(function(result){
  // //   if (result) {
  // //     if (isUserValid(result, password)) {
  // //       console.log(result)
  // //       return result;
  // //     }
  // //   }
  // //   return null;
  // // })
  
};
const getUserById = async (id) => {
  let user = await userModel.findById(id);
  
  try{
    if (user) {
      // console.log(user)
      return user;
    }
    return null;
  } catch(err){
   return err
  }
};

function isUserValid(user, password) {
  // console.log(user.password === password)
  return user.password === password;
}



module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
};