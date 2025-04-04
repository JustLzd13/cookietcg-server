// [Dependencies and Modules] 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

// //[Routes] 
const userRoutes = require("./routes/user.js");
// const carouselRoutes = require("./routes/carousel.js");
// const announcementRoutes = require("./routes/announcement.js");
// const sellingRoutes = require("./routes/selling.js");

const app = express();
app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:8000','http://localhost:3000', 'http://localhost:4000', 'https://your-frontend.vercel.app'], 
    credentials: true, 
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

mongoose.connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open', () => console.log('Now Connected to MongoDB Atlas.'));

app.use("/users", userRoutes);
// app.use("/carousel", carouselRoutes);
// app.use("/announcement", announcementRoutes);
// app.use("/selling", sellingRoutes);

if(require.main === module){
    app.listen(process.env.PORT || 3000, () => {
        console.log(`API is now online on port ${ process.env.PORT }`);
    });
}

module.exports = { app, mongoose };
