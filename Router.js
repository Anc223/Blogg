const express=require('express')
const Router=express.Router()

const userController=require("./Modules/User/userController")
const blgController=require("./Modules/Blog/blogController")

Router.post("/adduser",userController.upload,userController.aduser)
Router.get("/viewusers",userController.viewusers)
Router.post("/viewuserbyid/:id",userController.srchbyid)
Router.post("/searchbyname",userController.srchbyName)
Router.post("/searchbyemail",userController.srchbyemail)
Router.delete("/deletedata/:id",userController.dltdata)
Router.put("/updatedata/:id",userController.upload,userController.updtdata)
Router.post("/loginuser",userController.lgnuser)
Router.post("/resetpassword",userController.Rstpswd)
Router.get("/totalusers",userController.getUserCount)

Router.post("/addblogs",blgController.upload,blgController.addblog)
Router.get("/blogs",blgController.viewblog)
Router.post("/viewblogbyid/:id",blgController.viewbyId)
Router.get("/posts",blgController.getPostsByCategory)
Router.put("/updateblog/:id",blgController.upload,blgController.updtblog)
Router.delete("/deleteblog/:id",blgController.dltblog)
Router.post("/blogbyuser",blgController.srchbyNme)
Router.get("/totalblogs",blgController.getBlogCount)



module.exports=Router