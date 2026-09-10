const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

// SIGNUP - create a new admin (use once, then maybe disable/protect this)
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.admin.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ id: newAdmin.id, name: newAdmin.name, email: newAdmin.email });
  } catch (error) {
  if (error.code === 'P2002') {
    return res.status(409).json({ error: 'This email is already registered' });
  }
  console.error(error);
  res.status(500).json({ error: 'Something went wrong' });
}
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;