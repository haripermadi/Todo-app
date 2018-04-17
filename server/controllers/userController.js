const User = require('../models/user')
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const jwt = require('jsonwebtoken');
const FB  = require('fb')
const secret = process.env.SECRET

module.exports={
  signUp:(req,res)=>{
    let hash = bcrypt.hashSync(req.body.password,salt)
    let newUser ={
      name:req.body.name,
      email:req.body.email,
      password: hash
    }
    User.findOne({
      email:req.body.email
    }).then(data=>{
      if(data){
        res.status(400).json({
          message:"email already registered!!"
        })
      }else{
        let user = new User(newUser)
        user.save().then(dataUser=>{
          console.log("===>",dataUser)
          if(dataUser){
            let token = jwt.sign({id:dataUser._id,email:dataUser.email}, secret)
            res.status(201).json({
              message:"user is created",
              data:{
                id:dataUser._id,
                name:dataUser.name,
                email:dataUser.email,
                fbId :null,
                token :token
              }
            })
          }else{
            res.status(406).json({
              message:"something wrong"
            })
          }
        }).catch(err=>{
            console.log(err)
            res.status(404).send(err.message)
          })
      }
    }).catch(error =>{
      res.status(404).json({
        error
      })
    })
    
  },
  signIn:(req,res)=>{
    console.log("ini sign in ",req.body)
    User.findOne({
      email:req.body.email
    })
    .exec()
    .then(dataUser=>{
      if(dataUser){
        console.log("ini data user===",dataUser)
        let checkPass = bcrypt.compareSync(req.body.password,dataUser.password)
        if(checkPass){
          let token = jwt.sign({id:dataUser._id,email:dataUser.email}, secret)
          res.status(200).json({
            message:"login success",
            data:{
              id:dataUser._id,
              name:dataUser.name,
              email:dataUser.email,
              fbId :null,
              token :token
            }
          })
        }else{
          res.status(400).json({
            message:"email/password is wrong!!"
          })
        }
      }else{
        res.status(400).json({
          message:"sign in failed!"
        })
      }
    })

  },
  signInFb : (req,res)=>{
    FB.api('me',{fields:['id','name','email'],access_token:req.headers.fbtoken},(userFbToken)=>{
      console.log('sign in fb', userFbToken)
      if(userFbToken){
        User.findOne({
          email:userFbToken.email,
          // fbId: userFbToken.id
        })
        .exec()
        .then(user=>{
          console.log('user ada==', user)
          if(user == null){
            console.log('masuk user create', userFbToken)
            let newUser ={
              name: userFbToken.name,
              email: userFbToken.email,
              password: null,
              fbId : userFbToken.id,
            }
            let fbuser = new User(newUser)
            fbuser.save().then(dataNewUser => {
              console.log('new user fb==', dataNewUser)
              if(dataNewUser) {
                let token = jwt.sign({id: dataNewUser._id}, secret)
                res.status(200).json({
                  message:"login with facebook success",
                  data: ({
                    _id: dataNewUser._id,
                    fbId : dataNewUser.fbId,
                    name: dataNewUser.name,
                    email: dataNewUser.email,
                    token:token
                  })
                })
              }else{
                res.status(400).json({
                  message:"something wrong"
                })
              }
            }).catch(error => {
              res.status(400).json({
                message:"error",
                error
              })
            })
          }else{
            let token = jwt.sign({id:user._id}, secret)
            res.status(200).json({
              message:"login with facebook success",
              data: ({
                _id: user._id,
                fbId : user.fbId,
                name:user.name,
                email: user.email,
                token:token
              })
            })
          }

        })
      }else{
        res.status(500).json({
          message : `Failed to connect with facebook !`,
          data    : {}
        })
      }
    })
  },
  testJwt : (req,res)=>{
    res.status(200).json({
      message:"testing jwt"
    })

  }
}