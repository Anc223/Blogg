const req = require("express/lib/request")
const blogschema = require("./blogSchema")
const res = require("express/lib/response")
const multer = require("multer")

const addblog = ((req, res) => {
    let blog = new blogschema({
        userid: req.body.userid,
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        subcontent: req.body.subcontent,
        image: req.file
    })
    blog.save()
        .then((result) => {
            res.json({
                msg: "saved",
                status: 300
            })
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: 301,
                msg: "User not found"
            })
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


const viewblog = ((req, res) => {
    blogschema.find()
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

const viewbyId = ((req, res) => {
    blogschema.findById({ _id: req.params.id })
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

const srchbyNme = ((req, res) => {
    blogschema.find({ userid: req.body.userid })
        .then((result) => {
            res.json({
                status: 200,
                msg: "Blog found successfully",
                data: result
            });
        })
        .catch((err) => {
            console.error(err);
        });
});



const dltblog = ((req, res) => {
    blogschema.findByIdAndDelete({ _id: req.params.id })
        .then((result) => {
            res.json({
                status: 200,
                msg: " Deleted successfully ",
            })
                .then((result) => {
                    res.json({
                        status: 204,
                        msg: "successfully find",
                        data: result
                    })

                })

        })
        .catch((err) => {
            console.log(err);
        })
})

const updtblog = ((req, res) => {
    blogschema.findByIdAndUpdate({ _id: req.params.id }, {
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        subcontent: req.body.subcontent,
        image: req.file
    })
        .then((result) => {
            res.json({
                msg: " Updated successfully ",
            })
                .then((result) => {
                    res.json({
                        msg: "successfully find",
                        data: result
                    })

                })
        })

        .catch((err) => {
            console.log(err);
        })
})

const getPostsByCategory = (req, res) => {
    const category = req.query.category;
    blogschema.find({ category })
        .then(posts => {
            res.json({ data: posts });
        })
        .catch(err => {
            console.error(err);
        });
};


const getBlogCount = (req, res) => {
    blogschema.countDocuments()
        .then(count => {
            res.json({ count });
        })
        .catch(err => {
            console.error(err);
        });
};


module.exports = { addblog, upload, viewblog, viewbyId, srchbyNme, dltblog, updtblog, getPostsByCategory, getBlogCount }