import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db.js";
  
    
const router = express.Router();

//GET ALL USERS
router.get("/", (req, res) => {
      const q = "SELECT * FROM users" //select all from posts table
      db.query(q, (err, data) => {
            if (err) return res.json("err")
            return res.json(data); //if there is no error, return the data in posts table
      })
});

//GET USERS COUNT





export default router;