import express from 'express'
import { print, takeDesicion } from './utils'
import { Label } from './enum'
import 'dotenv/config'
import databaseConnect from './database'

databaseConnect()
const PORT = process.env.PORT ?? 3000
const app = express()

app.use(express.json())

app.get('/countrys-in-world-cup/:year', (req, res) => {
  const { year } = req.params
  takeDesicion(+year)
    .then((response) => {
      res.status(200).json(response)
    })
    .catch(() => {
      throw new Error('Look')
    })
})

app.post('/advice', (req, _) => {
  const body = req.body
  console.log(body)
})

app.listen(PORT, () => {
  print(Label.INFO, `Listening in port: http://localhost:${PORT}/`)
})

export default app
