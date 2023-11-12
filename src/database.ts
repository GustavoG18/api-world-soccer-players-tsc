import mongoose from 'mongoose'
import { print } from './utils'
import { Label } from './enum'

const databaseConnect = (): void => {
  mongoose.connect(process.env.DB_URI ?? '')
    .then(() => { print(Label.INFO, 'Database connected') })
    .catch(() => { throw new Error('Problem with connect to the database.') })
}

export default databaseConnect
