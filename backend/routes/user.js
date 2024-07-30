const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

// Get a User
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(404).json(err);
  }
});

// Update User
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(404).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).send("Account has updated");
    } catch (err) {
      return res.status(404).json(err);
    }
  } else {
    res.send("You cannot update another user data");
  }
});

// Delete User
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).send("Account has deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(404).send("You cannot delete another user data");
  }
});

// Follow and Unfollow User
router.put("/:id/follow", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    await user.updateOne({ $push: { followers: req.body.userId } });
    await currentUser.updateOne({ $push: { following: req.params.id } });
    res.status(200).json("Followed");

    // if (!user.followers.includes(req.body.userId)) {
    //   await user.updateOne({ $push: { followers: req.body.userId } });
    //   await currentUser.updateOne({ $push: { following: req.params.id } });
    //   res.status(200).json(currentUser);
    // } 
    // else {
    //   await user.updateOne({ $pull: { followers: req.body.userId } });
    //   await currentUser.updateOne({ $pull: { following: req.params.id } });
    //   res.status(200).json(currentUser);
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id/unfollow", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    await user.updateOne({ $pull: { followers: req.body.userId } });
    await currentUser.updateOne({ $pull: { following: req.params.id } });
    res.status(200).json("UnFollowed");

    // if (!user.followers.includes(req.body.userId)) {
    //   await user.updateOne({ $push: { followers: req.body.userId } });
    //   await currentUser.updateOne({ $push: { following: req.params.id } });
    //   res.status(200).json(currentUser);
    // } 
    // else {
    //   await user.updateOne({ $pull: { followers: req.body.userId } });
    //   await currentUser.updateOne({ $pull: { following: req.params.id } });
    //   res.status(200).json(currentUser);
    // }

  } catch (err) {
    res.status(500).json(err);
  }
});

// Unfollow a User
// router.put("/:id/unfollow", async (req, res) => {
//   if (req.body.userId !== req.params.id) {
//     try {
//       const user = await User.findById(req.params.id);
//       const currentUser = await User.findById(req.body.userId);
//       if (user.followers.includes(req.body.userId)) {
//         await user.updateOne({ $pull: { followers: req.body.userId } });
//         await currentUser.updateOne({ $pull: { following: req.params.id } });
//         res.status(200).json("user has unfollowed");
//       } else {
//         res.status(403).json("You not follow this user");
//       }
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } else {
//     res.status(403).json("You cannot unfollow yourself");
//   }
// });

module.exports = router;
