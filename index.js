const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const headers = {
  "Content-Type": "text/event-stream",
  Connection: "keep-alive",
  "Cache-Control": "no-cache",
};
let counter = 0;
let interval;

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html');
})

app.get("/event", (req, res) => {
  res.writeHead(200, headers);
interval = setInterval(() => {
    const data = `${JSON.stringify({ counter })}\n\n`;
    res.write(data);
    counter++;
  }, 1000);
  req.on('close', () => {
    clearInterval(interval);
  });
});
app.listen(4000, () => {
  console.log("listening...");
});