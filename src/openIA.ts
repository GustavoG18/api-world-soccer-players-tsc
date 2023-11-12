import OpenAI from 'openai'
import { Label } from './enum'
import { print } from './utils'
import { YearFifaWorldCupType } from './types'
import { createRegister } from './YearFifaWorldCup.service'

const openai = new OpenAI()

export const searchByOpenAI = async (year: number): Promise<YearFifaWorldCupType> => {
  let responseGTP
  let newRegister
  try {
    const { choices } = await openai.chat.completions.create({
      messages: [{
        role: 'system',
        content: `As an expert in soccer, particularly in FIFA World Cup tournaments, you will provide responses in JSON format that strictly focus on the requested information. When asked about a specific Football World Cup, your response will include:
                  The year of the World Cup.
                  The host country of the tournament.
                  A complete list of all the countries that participated in that specific tournament.
                  The country that won the tournament.
                  To generate a response that resembles the structure presented in the uploaded image, the JSON response will use keys such as "year," "hostCountry," "participatingCountries," and "winner."`
      },
      {
        role: 'user',
        content: `Año ${year}`
      }],
      model: 'gpt-3.5-turbo-1106',
      response_format: { type: 'json_object' }
    })
    responseGTP = JSON.parse(choices[0]?.message?.content as string)
  } catch (error) {
    print(Label.ERROR, JSON.stringify(error))
    throw new Error('Error trying to search in ChatGTP.')
  }

  try {
    newRegister = await createRegister(responseGTP)
  } catch (error) {
    print(Label.ERROR, JSON.stringify(error))
    throw new Error('Error trying to create register.')
  }

  return newRegister
}
