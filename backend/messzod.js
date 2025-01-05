const zod = require("zod")

const usersignup = zod.object({
    username : zod.string().min(4),
    password : zod.string().min(4)
})
const createmess = zod.object({
    
    title:  zod.string(),
    desc : zod.string(),
    price : zod.number(),
    no_of_times : zod.number(),
    closing_day: zod.string(),
    time_of_closing : zod.string(),
    owner : zod.string()
})

module.exports = {
    createmess,
    usersignup
}