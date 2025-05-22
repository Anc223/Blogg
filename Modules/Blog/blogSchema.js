const mongoose = require("mongoose")
const userschema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: { type: String },
    category:{ type: String },
    content: { type: String },
    subcontent: { type: String },
    image: { type: Object }
})
module.exports = new mongoose.model("blogs", userschema)