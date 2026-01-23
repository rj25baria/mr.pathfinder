require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'https://mr-pathfinder-frontend.onrender.com',
  credentials: true
}));

//  THIS LINE IS CRITICAL
app.use('/api/auth', require('./routes/authRoutes'));

// test route
app.get('/', (req, res) => {
  res.send('Mr. Pathfinder API is running');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error(err));
