import express from 'express'

const app = express()

app.get('/health', (_req, res) => {
  res.send('ok')
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})