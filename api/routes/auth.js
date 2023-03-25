import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db.js";
  

const router = express.Router();

//REGISTER
router.post("/register", (req, res) => {
      //CHECK EXISTING USER
      const q = "SELECT * FROM users WHERE email = ? OR username = ?";

      db.query(q, [req.body.email, req.body.username], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length) return res.status(409).json("User already exists!");

            //encrypt or hide the password and create a user
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const q = "INSERT INTO users(`username`,`email`,`password`,`img`) VALUES (?)";
            const values = [req.body.username, req.body.email, hash, req.body.img,];

            db.query(q, [values], (err, data) => {
                  if (err) return res.status(500).json(err);
                  return res.status(200).json("User has been created.");
            });
      });

});

//LOGIN
router.post("/login", (req, res) => {
      //Check if user exists or not

      const q = "SELECT * FROM users WHERE username = ?";

      db.query(q, [req.body.username], (err, data) => {
            if (err) return res.status(500).json(err);
            //if data = 0, then there is no user with the above username
            if (data.length === 0) return res.status(404).json("User not found!");

            //Check password
            const isPasswordCorrect = bcrypt.compareSync(
                  req.body.password,
                  data[0].password
            );

            if (!isPasswordCorrect)
                  return res.status(400).json("Wrong username or password!");


            const token = jwt.sign({ id: data[0].id }, "jwtkey");
            const { password, ...other } = data[0];

            res
                  .cookie("access_token", token, {
                        httpOnly: true,
                        sameSite: "none"
                  })
                  .status(200)
                  .json(other);
      });
});

//LOGOUT
router.post("/logout", (req, res) => {
      res.clearCookie("access_token", {
            sameSite: "none",
            secure: true
      }).status(200).json("User has been logged out.");
      res.redirect('/');
});


export default router;