import express from 'express'
import { print } from './utils'
import { Label } from './enum'
import { searchByOpenAI } from './openIA'
import 'dotenv/config'
import databaseConnect from './database'

databaseConnect()
const PORT = process.env.PORT ?? 3000
const app = express()

app.use(express.json())

app.get('/countrys-in-world-cup/:year', (req, res) => {
  const { year } = req.params
  searchByOpenAI(+year).then((response) => {
    res.status(200).json(response)
  }).catch((_) => {
    res.status(500).json({ message: 'Opps, we have a problem with the integration to OpenAI' })
  })
})

app.listen(PORT, () => {
  print(Label.INFO, `Listening in port: http://localhost:${PORT}/`)
})
