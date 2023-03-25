import express from "express";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
import path from "path";
import {fileURLToPath} from 'url';


//routes
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(cors());
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));
 

//images middleware
app.use("/images", express.static(path.join(__dirname, "public/images")));

//images storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

//upload images
const upload = multer({ storage });

app.post("/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
});

//Testing routes
app.get("/", (req, res) => {
    res.json("A Win is a Win!! Welcome to the Sue-Fit-Blog API!")
});

//routes
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);


app.listen(process.env.PORT || 5500, () => {
    console.log("Connected to Sue-Fit-Blog app")
});
