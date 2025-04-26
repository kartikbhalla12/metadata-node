require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// Parse allowed clients from environment variable
const allowedClients = process.env.ALLOWED_CLIENTS ? 
  process.env.ALLOWED_CLIENTS.split(',').map(client => client.trim()) : 
  [];

// Security middleware
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedClients.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET'],
}));

// Body parser middleware
app.use(express.json());

// URL validation function
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

// Metadata extraction endpoint
app.get('/metadata', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    if (!isValidUrl(url)) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Fetch the webpage content
    const response = await axios.get(url, {
      timeout: 5000, // 5 second timeout
      headers: {
        'User-Agent': 'Metadata-Node/1.0'
      }
    });

    const $ = cheerio.load(response.data);

    // Extract metadata
    const metadata = {
      title: $('title').text(),
      description: $('meta[name="description"]').attr('content'),
      ogTitle: $('meta[property="og:title"]').attr('content'),
      ogDescription: $('meta[property="og:description"]').attr('content'),
      ogImage: $('meta[property="og:image"]').attr('content'),
      ogUrl: $('meta[property="og:url"]').attr('content'),
      twitterTitle: $('meta[name="twitter:title"]').attr('content'),
      twitterDescription: $('meta[name="twitter:description"]').attr('content'),
      twitterImage: $('meta[name="twitter:image"]').attr('content'),
    };

    res.json(metadata);
  } catch (error) {
    console.error('Error fetching metadata:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch metadata',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Allowed clients:', allowedClients);
}); 