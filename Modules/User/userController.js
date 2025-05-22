const req = require("express/lib/request")
const userschema = require("./userSchema")
const res = require("express/lib/response")
const multer = require("multer")

const aduser = ((req, res) => {
    let user = new userschema({
        username: req.body.username,
        email: req.body.email,
        age: req.body.age,
        contact: req.body.contact,
        password: req.body.password,
    })
    user.save()
        .then((result) => {
            res.json({
                msg: "saved",
                data: result,
                status: 200
            })
        })
        .catch((err) => {
            console.log(err);
            if (err.code === 11000) {
                res.json({
                    status: 401,
                    msg: "Email already registered with us"
                })
            }
            else {
                res.json({
                    err: err,
                    status: 404
                })
            }
        })

})

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage }).single("image");

const viewusers = ((req, res) => {
    userschema.find()
        .then((result) => {
            res.json({
                msg: "successfully find",
                data: result
            })

        })
        .catch((err) => {
            console.log(err);
        })
})

const srchbyid = ((req, res) => {
    userschema.findById({ _id: req.params.id })
        .then((result) => {
            res.json({
                msg: "successfully find",
                data: result
            })

        })
        .catch((err) => {
            console.log(err);
        })
})

const srchbyName = ((req, res) => {
    userschema.findOne({ username: req.body.username })
        .then((result) => {
            res.json({
                msg: "successfully find",
                data: result
            })

        })
        .catch((err) => {
            console.log(err);
        })

})

const srchbyemail = ((req, res) => {
    userschema.findOne({ email: req.body.email })
        .then((result) => {
            res.json({
                msg: "successfully find",
                data: result,
                status: 300
            })

        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: 308,
                msg: "Invalid Email"
            })
        })
})

const dltdata = ((req, res) => {
    userschema.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.json({
                status: 200,
                msg: " Deleted successfully ",
            })
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: 500,
                msg: "Failed to delete user",
            })
        })
})

const updtdata = ((req, res) => {
    userschema.findByIdAndUpdate({ _id: req.params.id }, {
        username: req.body.username,
        email: req.body.email,
        age: req.body.age,
        contact: req.body.contact,
        image: req.file
    })
        .then((result) => {
            res.json({
                msg: " Updated successfully ",
                status: 100
            })
                .then((result) => {
                    res.json({
                        msg: "successfully find",
                        data: result,
                        status: 105
                    })

                })

        })

        .catch((err) => {
            console.log(err);
        })
})

const lgnuser = ((req, res) => {
    let email = req.body.email
    let password = req.body.password
    userschema.findOne({ email })
        .then((result) => {
            console.log(result);
            if (password === result.password) {
                res.json({
                    msg: "Login Successfully",
                    data: result,
                    status: 200
                })

            }
            else {
                res.json({
                    msg: "Password Error",
                    status: 404
                })
            }

        })
        .catch((err) => {
            console.log(err);
            res.json({
                msg: "Invalid Email",
                status: 402
            })
        })
})

const Rstpswd = ((req, res) => {
    userschema.findOne({ email: req.body.email })
        .then((result) => {
            console.log(result);

            if (result == null) {
                res.json({
                    msg: " No user found ",
                    status: 606
                })
            }
            else {
                userschema.findOneAndUpdate
                    ({ email: req.body.email }, { password: req.body.password })
                    .then((result) => {
                        res.json({
                            msg: "Reset Successfully",
                            status: 400
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    })

            }
        })
        .catch((err) => {
            console.log(err);
        })

})


const getUserCount = (req, res) => {
    userschema.countDocuments()
        .then(count => {
            res.json({ count });
        })
        .catch(err => {
            console.error(err);
        });
};



module.exports = { aduser, upload, viewusers, srchbyid, srchbyName, srchbyemail, dltdata, updtdata, lgnuser, Rstpswd, getUserCount }