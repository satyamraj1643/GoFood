const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

router.post('/', [
  body('email').isEmail(),
  body('name').isAlphanumeric(),
  body('name').isLength({ min: 5 }),
  body('password', 'At least 5 characters are required.').isLength({ min: 5 })
],

  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({ email: req.body.email });

      if (user != null) {
        res.json({ success: "already" });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        location: req.body.location,
      });

      res.json({ success: true });

    } catch (error) {
      console.log("An error occurred while creating user:", error);
      res.json({ success: false });
    }
  });

module.exports = router;
