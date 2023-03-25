import express from "express";
import mysql from "mysql";
import jwt from "jsonwebtoken";
import { db } from "../db.js";
  

const router = express.Router();

//GET ALL POSTS
router.get("/", (req, res) => {
    const q = req.query.cat
        ? "SELECT * FROM posts WHERE cat=?" //select all from posts particular category
        : "SELECT * FROM posts"; //select all from posts table

    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    });
});


//GET SINGLE POST
router.get("/:id", (req, res) => {
    const q =
        "SELECT p.id, u.username, `title`, `desc`, p.postImg, u.img,`date`,`cat`, `link` FROM users u JOIN posts p ON u.id = p.userId WHERE p.id = ? ";

    db.query(q, [req.params.id], (err, data) => { //post ID
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    });
});


// CREATE POST
router.post("/", (req, res) => {

    const q =
        "INSERT INTO posts(`title`, `desc`, `postImg`, `date`,`cat`,`link`, `userId`) VALUES (?)";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.postImg,
        req.body.date,
        req.body.cat,
        req.body.link,
        req.body.userId,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been created.");
    });
});


//DELETE POST
router.delete("/:id", (req, res) => {
    const postId = req.params.id;
    const q = " DELETE FROM posts WHERE id = ? ";

    db.query(q, [postId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});


//UPDATE POST

router.put("/:id", (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const postId = req.params.id;
      const q =
        "UPDATE posts SET `title`=?,`desc`=?,`postImg`=?,`cat`=? WHERE `id` = ? AND `userId` = ?";
  
      const values = [req.body.title, req.body.desc, req.body.postImg, req.body.cat];
  
      db.query(q, [...values, postId, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been updated.");
      });
    });
  });





export default router;

