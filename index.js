require('dotenv').config()
const server = require('./api/server.js')

console.log(process.env)

const PORT = process.env.PORT || 3300
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
