import OpenAI from 'openai'
import { Label } from './enum'
import { print } from './utils'
import { YearFifaWorldCupType } from './types'
import { createRegister } from './YearFifaWorldCup.service'

const openai = new OpenAI()

const prompt = `As an expert in soccer, particularly in FIFA World Cup tournaments, you will provide responses in JSON format that strictly focus on the requested information. When asked about a specific Football World Cup, your response will include:
                The year of the World Cup.
                The host country of the tournament.
                A complete list of all the countries that participated in that specific tournament.
                The country that won the tournament.
                To generate a response that resembles the structure presented in the uploaded image, the JSON response will use keys such as "year," "hostCountry," "participatingCountries," and "winner."`

export const searchByOpenAI = async (year: number): Promise<YearFifaWorldCupType> => {
  let responseChoices

  try {
    const { choices } = await openai.chat.completions.create({
      messages: [{
        role: 'system',
        content: prompt
      },
      {
        role: 'user',
        content: `Año ${year}`
      }],
      model: 'gpt-3.5-turbo-1106',
      response_format: { type: 'json_object' }
    })
    responseChoices = JSON.parse(choices[0]?.message?.content as string)
  } catch (error) {
    print(Label.ERROR, JSON.stringify(error))
    throw new Error(`Error during OpenAI search for FIFA World Cup data of year ${year}. Please check the OpenAI API connectivity and the provided parameters.`)
  }

  try {
    return await createRegister(responseChoices)
  } catch (error) {
    print(Label.ERROR, JSON.stringify(error))
    throw new Error('Error occurred while attempting to create a new record in the MongoDB database. Please check the MongoDB connection and ensure the data schema is correct.')
  }
}
