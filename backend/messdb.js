const mongoose = require("mongoose")
const {Schema} = mongoose
 mongoose.connect("mongodb+srv://soham05:ussopking%401532@cluster0.f5azafr.mongodb.net/")

 const userschema = new Schema({
    username : String,
    password : String,
    subscriptions : Array,
    messowner : Boolean
 })

 const messschema =new Schema({
    
    title: String,
    desc: String,
    price: Number,
    no_of_times : Number,
    closing_day : String,
    time_of_closing : String,
    users_of_mess : [{
        username : String,
        credits : Number
    }],
    owner : String 
});


const userinfo = mongoose.model("userinfo",userschema)
const messdatas = mongoose.model("messdatas",messschema)
module.exports = {
    userinfo,
    messdatas
}
