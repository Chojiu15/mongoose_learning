const Post = require("../models/post");
const express = require("express");
const postRouter = express.Router();

postRouter.get("/", async (req, res, next) => {
  try {
    const findPost = await Post.find().populate("userId");
    res.json(findPost);
  } catch (err) {
    console.trace(err);
    next();
  }
});

postRouter.get("/:id", async (req, res, next) => {
  try {
    const findOnePost = await Post.findById(req.params.id).populate("userId");
    res.json(findOnePost);
  } catch (err) {
    console.trace(err);
    next();
  }
});

postRouter.post("/", async (req, res, next) => {
  try {
    const postPost = await Post.create(req.body);
    res.json(postPost);
  } catch (err) {
    console.trace(err);
    next();
  }
});

postRouter.put("/:id", async (req, res, next) => {
  try {
    const findAndUpdatePost = await Post.findByIdAndUpdate()
    const reFindPost = await Post.findById(req.params.id);
    res.json(reFindPost);
  } catch (err) {
    console.trace(err);
    next();
  }
});


postRouter.delete('/:id', async (req, res, next) => {
    try{
        await Post.deleteOne({_id : req.params.id})
        res.json('Post has been deleted')
    }
    catch (err) {
        console.trace(err);
        next();
      }
})

module.exports = postRouter;
