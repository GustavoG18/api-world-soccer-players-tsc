import chalk from 'chalk'
import { Label } from './enum'
import { YearFifaWorldCup } from './models/YearFifaWorldCup.model'
import { YearFifaWorldCupType } from './types'
import { searchByOpenAI } from './openIA'

export const print = (label: Label, message: String): void => {
  switch (label) {
    case Label.INFO:
      console.log(chalk.bgGreen(message))
      break
    case Label.ERROR:
      console.log(chalk.bgRed(message))
      break
    case Label.WARNING:
      console.log(chalk.bgYellow(message))
      break
    default:
      console.log(chalk.bgBlue(message))
      break
  }
}

export const takeDesicion = async (year: number): Promise<YearFifaWorldCupType | undefined> => {
  if (year === 1942 || year === 1946) {
    throw new Error('These years are invalid because in these years, the FIFA organization postponed the tournament due to the Second World War.')
  }
  if (year < 1930) {
    throw new Error('The first FIFA World Cup was held in 1930.')
  }
  if (year > 2022) {
    throw new Error('The last FIFA World Cup was held in 2022 and the next is in 2026.')
  }
  const DIFF_YEARS = (1930 - year) % 4
  if (DIFF_YEARS === 0) {
    try {
      const [findYear] = await YearFifaWorldCup.find({ year })
      if (findYear !== undefined) {
        return findYear as YearFifaWorldCupType
      } else {
        return await searchByOpenAI(year)
      }
    } catch (error) {
      throw new Error('Error finding in mongoDB database')
    }
  }
  return undefined
}
