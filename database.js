// let Database = {
//     cindy: {

//         reminders: [
//             {id: 1, title: "Test", description: "Test is good", completed: false, date: "2021-03-17T19:01", tag: ['test'], subtask: ['wake up at 7','77788','465132']},
//             ],
//         friendReminders: [],
//         friends: []
//     },
//     alex: {
//         reminders: [
//             {id: 1, title: "alex Test", description: "Test is good", completed: false, date: "2022-04-17T12:01", tag: ['hi'], subtask: ['kjabv','SDF']},
//             ],
//         friendReminders: [],
//         friends: []
//     },
//     jax: {

//         reminders: [
//             {id: 1, title: "jax Test", description: "Test is good", completed: false, date: "2021-03-17T13:51", tag: [], subtask: []},
//             ],
//         friendReminders: [],
//         friends: []
//     }
// }

// let Account=[
//      {
//         id: 1,
//         name: "cindy",
//         email: "cindy123@gmail.com",
//         password: "cindy123!",
//         friends:[],
//     },
      
//      {
//         id: 2,
//         name: "alex",
//         email: "alex123@gmail.com",
//         password: "alex123!",
//         friends:[],
//     },

//      {
//         id: 3,
//         name: "jax",
//         email: "jax123@gmail.com",
//         password: "jax123!",
//         friends:[],
//     },
// ]

const MongoClient = require('mongodb').MongoClient
const mongourl = "mongodb+srv://bennyjiang:qaz121121@cluster0.iobde.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";



// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://bennyjiang:<password>@cluster0.iobde.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   perform actions on the collection object
//   client.close();
// });


const userModel = {
allaccount:async ()=>{
    const client = await MongoClient.connect(mongourl,{useNewUrlParser: true, useUnifiedTopology: true}).catch(err =>{console.log(err)})
    if (!client){
        return;
    }
    try{
        const db=client.db('newbookdb');
        let collection = db.collection("Account")
        let result= await collection.find().toArray()
        return (result)
    } catch (err){
        console.log(err)
    } finally {
        client.close()
    }

    },


findOne: async (email) => {
    
    const user = {"email":email}
    const client = await MongoClient.connect(mongourl,{useNewUrlParser: true, useUnifiedTopology: true}).catch(err =>{console.log(err)})
    if (!client){
        return;
    }
    try{
        const db=client.db('newbookdb');
        let collection = db.collection("Account")
        let result= await collection.find(user).toArray()
        return (result[0])
    } catch (err){
        console.log(err)
    } finally {
        client.close()
    }
    
    
    // // The local database VERSION
    // // const user = Account.find((user) => user.email === email);
    // // if (user) {
    // // console.log(user.password)
    // // return user;
    // // }
    // // throw new Error(`Couldn't find user with email: ${email}`);
    // // return null

    
},

findByIdaccount: async (id) => {
    const user = {"no":id}
    const client = await MongoClient.connect(mongourl,{useNewUrlParser: true, useUnifiedTopology: true}).catch(err =>{console.log(err)})
    if (!client){
        return;
    }
    try{
        const db=client.db('newbookdb');
        let collection = db.collection("Account")
        let result= await collection.find(user).toArray()
        // console.log(result[0])
        return (result[0])
    } catch (err){
        console.log(err)
    } finally {
        client.close()
    }


    // const user = Account.find((user) => user.id === id);
    // if (user) {
    // return user;
    // }
    },

findById: async (id) => {
    const user = {"no":id}
    const client = await MongoClient.connect(mongourl,{useNewUrlParser: true, useUnifiedTopology: true}).catch(err =>{console.log(err)})
    if (!client){
        return;
    }
    try{
        const db=client.db('newbookdb');
        let collection = db.collection("stus")
        let result= await collection.find(user).toArray()
        // console.log(result[0])
        return (result[0])
    } catch (err){
        console.log(err)
    } finally {
        client.close()
    }


    // const user = Account.find((user) => user.id === id);
    // if (user) {
    // return user;
    // }
    },

findreminders:async (userid,remidnerid)=>{
    const user = {"no":userid}
    
    const client = await MongoClient.connect(mongourl,{useNewUrlParser: true, useUnifiedTopology: true}).catch(err =>{console.log(err)})
    if (!client){
        return;
    }
    try{
        const db=client.db('newbookdb');
        let collection = db.collection("stus")
        let result= await collection.find(user).toArray()
        let searchResult = result[0].reminders.find(function (reminder) {
            return reminder.id == remidnerid;
          });
        // console.log(searchResult)
        return (searchResult)
    } catch (err){
        console.log(err)
    } finally {
        client.close()
        }


    },

createnewremidners: async (userid,data)=>{
    const user = {"no":userid}
    const client = await MongoClient.connect(mongourl,{useNewUrlParser: true, useUnifiedTopology: true}).catch(err =>{console.log(err)})
    if (!client){
        return;
    }
    try{
        const db=client.db('newbookdb');
        let collection = db.collection("stus")
        let result= await collection.find(user).toArray()
        let numer=result[0].reminders[result[0].reminders.length-1]
        let newreminder = {
            id: numer.id + 1,
            title: data.title,
            description: data.description,
            completed: false,
            date: data.date,
            tag: [data.tag],
            subtask:[]
          };
        await collection.updateOne(
            {"no":userid},
            {$push:{"reminders":newreminder}},
        );

    } catch (err){
        console.log(err)
    } finally {
        client.close()
        }

    },

updatereminders:async (userid,remidnerid,data)=>{
    const client = await MongoClient.connect(mongourl,{useNewUrlParser: true, useUnifiedTopology: true}).catch(err =>{console.log(err)})
    if (!client){
        return;
    }
    try{
        const db=client.db('newbookdb');
        let collection = db.collection("stus")
        if (data.completed==="true"){
            data.completed = true
        }else{
            data.completed = false
        }
        
        await collection.updateOne(
            {"no":userid,"reminders.id":parseInt(remidnerid)},
            {$set:{"reminders.$.title":data.title, 
            "reminders.$.description":data.description,
            "reminders.$.date":data.date,
            "reminders.$.completed":data.completed,
                },
            },
        );

    } catch (err){
        console.log(err)
    } finally {
        client.close()
        }

    },

deletereminders:async(userid,remidnerid)=>{
    const user = {"no":userid}
    const client = await MongoClient.connect(mongourl,{useNewUrlParser: true, useUnifiedTopology: true}).catch(err =>{console.log(err)})
    if (!client){
        return;
    }
    try{
        const db=client.db('newbookdb');
        let collection = db.collection("stus")
        let result= await collection.find(user).toArray()
        let searchResult = result[0].reminders.find(function (reminder) {
        return reminder.id == remidnerid;
        });

        if(searchResult !== -1){
        let updateresult = result[0].reminders.filter(elem => elem !== searchResult)
            await collection.updateOne(
            {"no":userid},
            {$set:{"reminders":updateresult}}
            )
        }

    } catch (err){
        console.log(err)
    } finally {
        client.close()
        }

    },
addsubtask:async (userid,remidnerid,data)=>{
    const user = {"no":userid}
    const client = await MongoClient.connect(mongourl,{useNewUrlParser: true, useUnifiedTopology: true}).catch(err =>{console.log(err)})
    if (!client){
        return;
    }
    try{
        const db=client.db('newbookdb');
        let collection = db.collection("stus")
        let result= await collection.find(user).toArray()
        let searchResult = result[0].reminders.find(function (reminder) {
        return reminder.id == remidnerid;
        });
        searchResult.subtask.push(data)
        if(searchResult !== -1){
            await collection.updateOne(
            {"no":userid,"reminders.id":parseInt(remidnerid)},
            {$set:{"reminders.$.subtask":searchResult.subtask}}
            )
        }
        
    } catch (err){
        console.log(err)
    } finally {
        client.close()
        }

    },

deletesubtask:async (userid,remidnerid,deletesubtaskindex)=>{
    const user = {"no":userid}
    const client = await MongoClient.connect(mongourl,{useNewUrlParser: true, useUnifiedTopology: true}).catch(err =>{console.log(err)})
    if (!client){
        return;
    }
    try{
        const db=client.db('newbookdb');
        let collection = db.collection("stus")
        let result= await collection.find(user).toArray()
        let searchResult = result[0].reminders.find(function (reminder) {
        return reminder.id == remidnerid;
        });
        let subtask = searchResult.subtask[deletesubtaskindex]
        let updatesubtask = searchResult.subtask.filter(elem => elem !== subtask)

        if(searchResult !== -1){
            await collection.updateOne(
            {"no":userid,"reminders.id":parseInt(remidnerid)},
            {$set:{"reminders.$.subtask":updatesubtask}}
            )
        }

    } catch (err){
        console.log(err)
    } finally {
        client.close()
        }

    },

    addtag:async (userid,remidnerid,data)=>{
        const user = {"no":userid}
        const client = await MongoClient.connect(mongourl,{useNewUrlParser: true, useUnifiedTopology: true}).catch(err =>{console.log(err)})
        if (!client){
            return;
        }
        try{
            const db=client.db('newbookdb');
            let collection = db.collection("stus")
            let result= await collection.find(user).toArray()
            let searchResult = result[0].reminders.find(function (reminder) {
            return reminder.id == remidnerid;
            });

            searchResult.tag.push(data)
            if(searchResult !== -1){
                await collection.updateOne(
                {"no":userid,"reminders.id":parseInt(remidnerid)},
                {$set:{"reminders.$.tag":searchResult.tag}}
                )
            }
            
        } catch (err){
            console.log(err)
        } finally {
            client.close()
            }
    
        },
    
    deletetag:async (userid,remidnerid,deletesubtaskindex)=>{
        const user = {"no":userid}
        const client = await MongoClient.connect(mongourl,{useNewUrlParser: true, useUnifiedTopology: true}).catch(err =>{console.log(err)})
        if (!client){
            return;
        }
        try{
            const db=client.db('newbookdb');
            let collection = db.collection("stus")
            let result= await collection.find(user).toArray()
            let searchResult = result[0].reminders.find(function (reminder) {
            return reminder.id == remidnerid;
            });
            let tag = searchResult.tag[deletesubtaskindex]
            let updatetag = searchResult.tag.filter(elem => elem !== tag)
    
            if(searchResult !== -1){
                await collection.updateOne(
                {"no":userid,"reminders.id":parseInt(remidnerid)},
                {$set:{"reminders.$.tag":updatetag}}
                )
            }
    
        } catch (err){
            console.log(err)
        } finally {
            client.close()
            }
    
        },
    
addfriend:async(currentuserid,searchuserid)=>{
        const cuserid = {"no":currentuserid}
        const suserid = {"no":searchuserid}
        const client = await MongoClient.connect(mongourl,{useNewUrlParser: true, useUnifiedTopology: true}).catch(err =>{console.log(err)})
        if (!client){
            return;
        }
        try{
            const db=client.db('newbookdb');
            let collection = db.collection("Account")
            let cuser= await collection.find(cuserid).toArray()
            let suser= await collection.find(suserid).toArray()
            

            await collection.updateOne(
                {"no":currentuserid},
                {$push:{"friends":{id:suser[0].no,name:suser[0].name,email:suser[0].email}}},
            );
            await collection.updateOne(
                {"no":searchuserid},
                {$push:{"friends":{id:cuser[0].no,name:cuser[0].name,email:cuser[0].email}}},
            );

            
            
    
        } catch (err){
            console.log(err)
        } finally {
            client.close()
            }
    

    },

checkfriend:async (currentuserid,searchuserid)=>{
        const cuserid = {"no":currentuserid}
        const client = await MongoClient.connect(mongourl,{useNewUrlParser: true, useUnifiedTopology: true}).catch(err =>{console.log(err)})
        if (!client){
            return;
        }
        try{
            const db=client.db('newbookdb');
            let collection = db.collection("Account")
            let cuser= await collection.find(cuserid).toArray()
            let result = cuser[0].friends.find(function (user) {
                return user.id == searchuserid;
                });
            return result
            

            
            
    
        } catch (err){
            console.log(err)
        } finally {
            client.close()
            }
        
    },

addfriendreminders: async(currentuserid,searchuserid,searchusername)=>{
    const cuserid = {"no":currentuserid}
        const client = await MongoClient.connect(mongourl,{useNewUrlParser: true, useUnifiedTopology: true}).catch(err =>{console.log(err)})
        if (!client){
            return;
        }
        try{
            const db=client.db('newbookdb');
            let collection = db.collection("stus")
            let cuser= await collection.find(cuserid).toArray()
            let searchResult = cuser[0].friendReminders.find(function (friend) {
                return friend.id == searchuserid;
                });
            
            if (!searchResult){
            await collection.updateOne(
                {"no":currentuserid},
                {$push:{"friendReminders":{id:searchuserid,name:searchusername}}},
            );}
    
        } catch (err){
            console.log(err)
        } finally {
            client.close()
            }

    },
getfriendreminders: async(uid)=>{
        const cuserid = {"no":uid}
        const client = await MongoClient.connect(mongourl,{useNewUrlParser: true, useUnifiedTopology: true}).catch(err =>{console.log(err)})
        if (!client){
            return;
        }
        try{
            const db=client.db('newbookdb');
            let collection = db.collection("stus")
            let cuser= await collection.find(cuserid).toArray()
            let allaccount = await collection.find().toArray()
            
            // console.log(cuser[0].friendReminders)
            let searchlist=[]
            let backresult=[]

            cuser[0].friendReminders.forEach(reminder => {
                searchlist.push(parseInt(reminder.id))
            })
            

            allaccount.forEach(reminder => {
                if (searchlist.indexOf(parseInt(reminder.no))!=-1){
                    backresult.push(reminder)
                }
            })
            return backresult
            
    
        } catch (err){
            console.log(err)
        } finally {
            client.close()
            }

    },

checkeamilexistence: async (useremail)=>{
    const cuser = {"email":useremail}
    const client = await MongoClient.connect(mongourl,{useNewUrlParser: true, useUnifiedTopology: true}).catch(err =>{console.log(err)})
    if (!client){
        return;
    }
    try{
        const db=client.db('newbookdb');
        let collection = db.collection("Account")
        let result = await collection.find(cuser).toArray()
        
        if(result.length!==0){
            return true
        } else{
            return false
        }

    } catch (err){
        console.log(err)
    } finally {
        client.close()
        }


},
checkpassword: (userpassword)=>{
    let letterandnumber = /[0-9a-z]/i;
    let symbols = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")
    if (userpassword.length>=7 && letterandnumber.test(userpassword) && symbols.test(userpassword) ){
        return false
    }else{
        return true
    }
},

registernewaccount:async (email,password,name)=>{
    const client = await MongoClient.connect(mongourl,{useNewUrlParser: true, useUnifiedTopology: true}).catch(err =>{console.log(err)})
    if (!client){
        return;
    }
    try{
        const db=client.db('newbookdb');
        let collection1 = db.collection("Account")
        let collection2 = db.collection("stus")
        let result = await collection1.find().toArray()
        let now=new Date()
        let time = now.getFullYear().toString() +"-"+ (now.getMonth()+1).toString().padStart(2,'0')+"-"+ 
                 now.getDate().toString().padStart(2,'0')+"T"+now.getHours().toString()+":"+now.getMinutes().toString()
        
        let newaccount={
            id:1,
            title:"Welcome to your reminders",
            description:"",
            completed:true,
            date:time,
            tag:[],
            subtask:[]
        }

        await collection1.insertOne(
            {
                no:result[result.length-1].no+1,
                name:name,
                email:email,
                password:password,
                friends:[]
            }
        )

        await collection2.insertOne(
            {
                name:name,
                no:result[result.length-1].no+1,
                reminders:[newaccount],
                friendReminders:[],
                friends:[]
            }
        )

        


    } catch (err){
        console.log(err)
    } finally {
        client.close()
        }


}

};




// module.exports = {Database,Account,userModel};
module.exports = {userModel};
