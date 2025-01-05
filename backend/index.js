const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createmess, usersignup } = require('./messzod');
const { messdatas, userinfo } = require('./messdb');
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/allmess", async function(req, res) {
    try {
        const allMesses = await messdatas.find();
        res.status(200).json(allMesses);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post("/mess", async function(req, res) {
    const data = req.body;
    console.log(data);
    const datavalid = createmess.safeParse(data);
    if (!datavalid.success) {
        return res.status(411).send({
            msg: "Invalid Input",
            errors: datavalid.error
        });
    }
    await messdatas.create({
        
        title: data.title,
        desc: data.desc,
        price: data.price,
        no_of_times: data.no_of_times,
        closing_day: data.closing_day,
        time_of_closing: data.time_of_closing,
        owner : data.owner
    });
    
    await userinfo
    res.status(200).json({ message: "Mess Created" });
});


app.post("/signup", async function(req,res){
    const user = req.body;
    const uservalid = usersignup.safeParse(user)
    if (!uservalid.success) {
        return res.status(411).send({
            msg: "Invalid Input",
            errors: uservalid.error
        });
    }
    await userinfo.create({
    username : user.username,
    password : user.password,
    subscriptions : user.subscriptions,
    messowner : user.messowner
    })
    res.status(200).json({ message: "User added" });
})

app.post("/login", async function(req, res) {
    const { username, password , messowner } = req.body;
    console.log(username,password , messowner)
     try {
        const user = await userinfo.findOne({ username, password , messowner });
        if (user) {
            res.status(200).json( user );
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/addcart', async (req, res) => {
    const carter = req.body;
    console.log(carter.username,carter._id)
    try {
        const user = await userinfo.updateOne(
            { username: carter.username },
            { $push: { subscriptions: carter._id } }

        );
        const addmess = await messdatas.updateOne(
            {_id : carter._id},
            { $push:{users_of_mess : { username : carter.username, credits : carter.no_of_times }}}
        )

        res.status(200).json({ msg: "Cart Updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});

app.post('/mess_users', async (req, res) => {
    const { owner } = req.body; // Destructure owner directly
    if (!owner) {
        return res.status(400).json({ message: 'Owner is required' });
    }
    console.log('Owner:', owner);

    try {
        const messdata = await messdatas.findOne({ owner });
        if (!messdata || !messdata.users_of_mess) {
            return res.status(404).json({ message: 'No users found for this mess' });
        }
        console.log('Mess Data:', messdata);
        res.status(200).json(messdata.users_of_mess);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/decrementcredit', async (req, res) => {
    const data = req.body;
    try {
        const user = await messdatas.findOneAndUpdate(
            { owner: data.owner, "users_of_mess.username": data.username },
            { $inc: { "users_of_mess.$.credits": -1 } },
            { new: true }
        );
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


app.listen(3000, function() {
    console.log("listening on port 3000");
});
