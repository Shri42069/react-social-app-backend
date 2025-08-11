const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// CORS config for both local and production


app.use(cors({
  origin: 'https://react-social-app-frontend-steel.vercel.app',
  credentials: true, // only if you’re using cookies
}));


app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

app.get('/api/download', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Missing url' });

    // Fetch the remote image
    const r = await fetch(url, { redirect: 'follow' });
    if (!r.ok) return res.status(502).json({ error: 'Upstream fetch failed' });

    // Infer filename from URL (fallback to timestamp)
    const parsed = new URL(url);
    let filename = path.basename(parsed.pathname) || `image-${Date.now()}.jpg`;

    // Forward content type; force download
    const contentType = r.headers.get('content-type') || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Stream it to the client
    r.body.pipe(res);
  } catch (e) {
    console.error('Download proxy error:', e);
    res.status(500).json({ error: 'Download failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
