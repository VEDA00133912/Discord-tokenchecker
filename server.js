const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'tokenchecker')));

app.post('/checkTokens', async (req, res) => {
    const tokens = req.body.tokens.split('\n').map(token => token.trim());
    const validTokens = [];
    const invalidTokens = [];
  
    for (const token of tokens) {
      try {
        const response = await axios.get('https://discord.com/api/v10/users/@me', {
          headers: { 'Authorization': token }
        });
  
        if (response.status === 200) {
          validTokens.push(token);
          console.log(`Valid token: ${token}`); 
        } else {
          invalidTokens.push(token);
          console.log(`Invalid token: ${token}`); 
        }
      } catch (error) {
        invalidTokens.push(token);
        console.log(`Error occurred for token: ${token}`);
        console.error(error); 
      }
    }
  
    if (validTokens.length > 0) {
      fs.writeFileSync('valid_tokens.txt', validTokens.join('\n'), 'utf8');
    }
  
    res.json({ validTokens, invalidTokens });
});

app.get('/downloadValidTokens', (req, res) => {
    res.download('valid_tokens.txt', 'valid_tokens.txt', (err) => {
      if (err) {
        console.error("Error downloading file:", err);
      } else {
        fs.unlink('valid_tokens.txt', (unlinkErr) => {
          if (unlinkErr) {
          } else {
            console.log("File deleted after download.");
          }
        });
      }
    });
});
  
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});