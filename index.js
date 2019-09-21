const server = require('./api/server.js');


server.use(express.json())

server.get('/', (req, res) => {
  res
  .send('its alive')
})


const PORT = process.env.PORT || 3300;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
