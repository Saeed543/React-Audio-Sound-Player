const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const port = 3000
const audioDir = path.join(__dirname, "./sound")

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const songs = fs.readdirSync(audioDir).filter(
    (file) => file.endsWith('.mp3') || file.endsWith('.m4a') // Filter audio files
);

console.log(songs)



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/music', (req, res) => {
    res.json({ musicFiles: songs })
})

app.get('/api/music/:filename', (req, res) => {
    const filePath = path.join(audioDir, req.params.filename);
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(`http://localhost:${port}/`)
})
