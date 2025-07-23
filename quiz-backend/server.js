const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017';  // Your MongoDB connection string (adjust if needed)
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('quiz');
    const quizCollection = db.collection('questions');


    // Get all questions
    app.get('/api/questions', async (req, res) => {
      try {
        const questions = await quizCollection.find().toArray();
        res.json(questions);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch questions' });
      }
    });

    // Add a new question
    app.post('/api/questions', async (req, res) => {
      try {
        const newQuestion = req.body;
        const result = await quizCollection.insertOne(newQuestion);
        res.json(result);
      } catch (err) {
        res.status(500).json({ error: 'Failed to add question' });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

// CALL main here
main().catch(console.error);
