const express=require("express")
const app=express()
const bodyparser=require("body-parser")
app.use(bodyparser.json())
const db=require("./dbConnection")

// const Router=require("./Router")
// app.use("/",Router)

app.listen(4000,function(){
    console.log("Server running successfully at 4000");
})