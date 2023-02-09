import express from "express";
import {getFeedPosts, getUserPosts, likePost} from "../controllers/posts.js";

const router = express.Router();


// read all posts
router.get("/",verifyToken, getFeedPosts); 
router.get("/:userId/posts", verifyToken, getUserPosts);

// update 
router.patch("/:id/like", verifyToken, likePost);

export default router;