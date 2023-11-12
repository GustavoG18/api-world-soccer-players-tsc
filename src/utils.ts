import chalk from 'chalk'
import { Label } from './enum'

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

export const takeDesicion = (year: number): void => {
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
    /// Primero mirar si esa informacion la tengo en la base de datos antes de usar chatGTP, sino usar chatGTP.
  }
}
