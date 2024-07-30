require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const multer = require('multer');
const path = require('path')
const cors = require('cors');

const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/post")

const app = express()

// MiddleWare
app.use(cors());
app.use(express.json())
app.use("/api/user" ,userRoute)
app.use('/api/auth' , authRoute)
app.use('/api/post' , postRoute)
app.use('/images' , express.static(path.join(__dirname , 'images')))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  try{
    res.status(200).json({ message: 'File uploaded successfully!' })
  }catch(err){
    res.status(500).json(err)
  }
});


mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(process.env.PORT || 3000 , () => {
        console.log("Server is running at port : 3000 and database is connected");
    })
})
.catch(err => {console.log(err);})










// app.use(express.json())
// app.use((req,res,next) => {
//     console.log(req.path , req.method);
//     next()
// })
