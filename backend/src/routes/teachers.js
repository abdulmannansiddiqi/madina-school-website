const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const verifyToken = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany({
      where: { isPublic: true },
    });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// POST create a new teacher
router.post('/',verifyToken, async (req, res) => {
  try {
    const { name, designation, subject, qualification, photoUrl, isPublic, showPhoto } = req.body;

    const newTeacher = await prisma.teacher.create({
      data: { name, designation, subject, qualification, photoUrl, isPublic, showPhoto },
    });

    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// PUT (update) a teacher by ID
router.put('/:id',verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, subject, qualification, photoUrl, isPublic, showPhoto } = req.body;

    const updatedTeacher = await prisma.teacher.update({
      where: { id: parseInt(id) },
      data: { name, designation, subject, qualification, photoUrl, isPublic, showPhoto },
    });

    res.json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// DELETE a teacher by ID
router.delete('/:id',verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.teacher.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});
module.exports = router;