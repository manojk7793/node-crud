// server.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const userInfo = require('./routes/userInfo');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', userInfo);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});