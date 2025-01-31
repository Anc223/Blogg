const req = require("express/lib/request")
const userschema = require("./customerSchema")
const res = require("express/lib/response")

const aduser = ((req, res) => {
    let user = new userschema({
        username: req.body.username,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        contact: req.body.contact,
        password: req.body.password,
        image:req.file
    })
    user.save()
        .then((result) => {
            res.json({
                msg: "saved"
            })
        })
        .catch((err) => {
            console.log(err);
        })

})

module.exports={aduser}