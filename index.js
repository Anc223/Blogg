const express=require("express")
const bodyparser=require("body-parser")
const db=require("./dbConnection")
const cors=require("cors")
const Router=require("./Router")

const app=express()
app.use(cors());

app.use(bodyparser.json())

app.use(express.static(`${__dirname}/upload`));

app.use("/",Router)

app.listen(4001,function(){
    console.log("Server running successfully at 4001");
})