require('dotenv').config();
const express = require('express');
const cors = require('cors');
const teacherRoutes = require('./routes/teachers');
const studentRoutes = require('./routes/students');
const newsRoutes = require('./routes/news');
const achievementRoutes = require('./routes/achievements');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/achievements', achievementRoutes);

app.get('/', (req, res) => {
  res.send('Madina Model School API is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});