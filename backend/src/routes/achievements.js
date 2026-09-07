const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const verifyToken = require('../middleware/auth');
// GET all achievements
router.get('/', async (req, res) => {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { year: 'desc' },
    });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// POST create achievement
router.post('/', verifyToken, async (req, res) => {
  try {
    const { studentName, title, description, photoUrl, year } = req.body;

    const newAchievement = await prisma.achievement.create({
      data: { studentName, title, description, photoUrl, year },
    });

    res.status(201).json(newAchievement);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// PUT update achievement
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { studentName, title, description, photoUrl, year } = req.body;

    const updatedAchievement = await prisma.achievement.update({
      where: { id: parseInt(id) },
      data: { studentName, title, description, photoUrl, year },
    });

    res.json(updatedAchievement);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// DELETE achievement
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.achievement.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;