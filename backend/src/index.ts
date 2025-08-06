import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/materials', (_req, res) => {
  res.json([]);
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
