import express from 'express'
import { print } from './utils'
import { Label } from './enum'

const app = express()

app.use(express.json())

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  print(Label.INFO, `Listening in port: http://localhost:${PORT}/`)
})
