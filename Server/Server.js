const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
var bodyparser = require("body-parser");
const bcrypt = require('bcrypt');
const app = express()
const port = 3000
app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
mongoose.connect('mongodb://localhost:27017/Netflix')
.then(()=>{console.log("success")})
const saltRounds = 10;
let loginState = false;
let loginemail = "";
const name = new mongoose.Schema({
  email:String,
  pass:String,
  Plan:String,
  card:Array,
  profile:Array,
  date:Array
})
const movie = new mongoose.Schema({
  name:String,
    thumbnail:String,
    logo:String,
    cover:String,
    genre:Array,
    age:String,
    length:String,
    type:String,
    yt:String,
    
})
const sendname = mongoose.model('User',name)
const movieData = mongoose.model('data',movie)

app.get('/', (req, res) => {
  res.send('Hello Kacho')
})
app.post("/checkmail", (req,res) =>{
  sendname.findOne(req.body).then((e) => {
    if(e === null){
      res.json("success")
    }else{
      res.json("exist")
    }
  })
})

app.post("/addprofile" ,(req,res) => {
  
  let mail = req.body.email;
  let pro = req.body.profile
  sendname.findOneAndUpdate({email : mail} , {profile : pro}).then((e) => {
    console.log(e)
  })
})

app.post("/getprofile" ,(req ,res) => {
  sendname.findOne(req.body).then((e)=>{
    res.json(e.profile)
  })
})

app.post("/checkuser", (req,res) =>{
  if(loginState){
    res.json(true)
  }else{
    res.json(false)
  }
 
})
app.post("/checkuser2", (req,res) =>{
  if(loginState){
    console.log(loginemail)
    res.json(loginemail)
  }else{
    res.json(false)
  }
 
})

app.post('/data',(req,res) => {
  let mail = req.body.email
  let password = req.body.pass
  let pplan = req.body.Plan
  let cardd = req.body.card
  let datee = req.body.date
   bcrypt.hash(password,saltRounds, function(err,hash){
    console.log(hash)
    let data = new sendname({email:mail,pass:hash,Plan:pplan,card:cardd,date:datee})
data.save().then((r)=>{loginState = true;  loginemail = mail;res.json("success")})
   })
})

app.post("/log",(req,res) =>{
    sendname.findOne({email:req.body.email}).then((e) => {
      if(e === null){
        res.json("fail")
      }else{
        bcrypt.compare(req.body.pass , e.pass, function(err, result) {
          if(result === true){
            loginemail = req.body.email
            res.json("success")
            loginState = true
          }else{
            res.json("pass not match")
          }
      });
      }

  })
})
app.get("/content",(req,res)=>{
  movieData.find() .then((e)=>{res.json(e)})
})
app.post("/acc" ,(req,res) => {
  sendname.find(req.body).then((e) => {
    res.json(e)
  })
})
app.get("/logout" , (req,res) =>{
  loginState = false
})
app.post("/changeplan" , (req,res) => {
  console.log(req.body)
  sendname.findOneAndUpdate({email : req.body.email} , {Plan : req.body.newPlan})
})
app.post("/changepassword" , (req , res) =>{
  console.log(req.body)
  sendname.findOne({email : req.body.email}).then((response) =>{
    bcrypt.compare(req.body.currentPass , response.pass ,function(err , result){
     if(result){
      bcrypt.hash(req.body.newPass , saltRounds , function(err , hash){
        sendname.findOneAndUpdate({email : req.body.email} , {pass : hash}).then((e) =>{
          console.log(e)
          res.json("success")
        })
      })
     }else{
      res.json("Password Wrong")
     }
    })
  })
})
app.post("/addlist" , (req,res) => {
  let email = req.body.email;
  let index = req.body.index;
  let profile = req.body.profile;
  let name = "profile." + index
  // let pro = {[name] : profile}
  // console.log(pro)
  sendname.findOneAndUpdate({email:email} , {[name] : profile}).then((e) => {
    // console.log(e)
  })
})
app.post("/changepay" , (req,res) => {
  let email = req.body.email;
  sendname.findOneAndUpdate({email:email} , {card : req.body.card}).then((e) => {
    console.log(e)
  })
})
app.post("/newlist" , (req,res) => {
  let mail = req.body.email;
  let name = req.body.name;
  sendname.findOne({email:mail , "profile.name" :name}).then((e) => {
    let pro = e.profile;
    let result = pro.filter((e) => {if(e.name === name){return e}})
      // console.log(result[0].list)
    res.json(result[0].list)
  })
})

app.post("/addlistitem" , (req,res) => {
  let mail = req.body.email;
  let name = req.body.name;
  let list = req.body.list;
  
  sendname.findOne({email:mail}).then((e) => {
    let pro = e.profile
    let result = pro.findIndex((e) =>e.name === name)
    let query = "profile." + result
    let profile = e.profile[result]
    let age = profile.age
    let arr = {name:name , age:age , list:list}
    console.log(arr , query)
    sendname.findOneAndUpdate({email:mail} ,{[query] : arr}).then((x) => {
      console.log(x)
    })
  })
})

app.listen(port, () => {
  // sendname.find({ email:"sarb@gmail.com","profile.name" : "sarb"}).then((e) => {
  //   console.log(e)
  // })
  console.log("Example app listening on port ${port}")

})