const express = require('express');
const router = express.Router();
const prisma = require('../lib/prisma');
const verifyToken = require('../middleware/auth');

// GET all news
router.get('/', async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      orderBy: { date: 'desc' },
    });
    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// POST create news
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, date, imageUrl, pdfUrl } = req.body;

    const newNews = await prisma.news.create({
      data: {
        title,
        description,
        date: new Date(date),
        imageUrl,
        pdfUrl,
      },
    });

    res.status(201).json(newNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// PUT update news
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, imageUrl, pdfUrl } = req.body;

    const updatedNews = await prisma.news.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        date: new Date(date),
        imageUrl,
        pdfUrl,
      },
    });

    res.json(updatedNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// DELETE news
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.news.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;