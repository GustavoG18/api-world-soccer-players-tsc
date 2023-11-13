import mongoose from 'mongoose'
import { YearFifaWorldCupSchema } from './models/YearFifaWorldCup.model'
import { YearFifaWorldCupType } from './types'
import { print } from './utils'
import { Label } from './enum'

const YearFifaWorldCup = mongoose.model('YearFifaWorldCup', YearFifaWorldCupSchema)

export const createRegister = async (register: YearFifaWorldCupType): Promise<YearFifaWorldCupType> => {
  try {
    const newRegister = new YearFifaWorldCup(register)
    await newRegister.save()
    return newRegister
  } catch (error) {
    print(Label.ERROR, JSON.stringify(error))
    throw new Error('Problem with create new year fifa world cup register')
  }
}
