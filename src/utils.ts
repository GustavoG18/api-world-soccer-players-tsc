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
