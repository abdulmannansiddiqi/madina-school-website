const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');

const verifyToken = require('../middleware/auth');
// GET all students
router.get('/',verifyToken, async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// POST create a new student
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name, className, section, fatherName, contact } = req.body;

    const newStudent = await prisma.student.create({
      data: { name, className, section, fatherName, contact },
    });

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// PUT (update) a student by ID
router.put('/:id', verifyToken,  async (req, res) => {
  try {
    const { id } = req.params;
    const { name, className, section, fatherName, contact } = req.body;

    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(id) },
      data: { name, className, section, fatherName, contact },
    });

    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// DELETE a student by ID
router.delete('/:id', verifyToken,  async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.student.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});
module.exports = router;