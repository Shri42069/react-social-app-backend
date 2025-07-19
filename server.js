const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/posts', postRoutes);



app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true,
}));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
