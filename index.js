const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const chatRoutes = require('./src/routes/chatRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});