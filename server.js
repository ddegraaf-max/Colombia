const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Elke route toont de website (alle afbeeldingen/fonts komen van een CDN)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Honor Care International draait op poort ${PORT}`);
});
