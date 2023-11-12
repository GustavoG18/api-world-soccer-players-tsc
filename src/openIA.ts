import OpenAI from 'openai'
import { Label } from './enum'
import { print } from './utils'

const openai = new OpenAI()

export const searchByOpenAI = async (year: number): Promise<string> => {
  try {
    const { choices } = await openai.chat.completions.create({
      messages: [{ role: 'system', content: 'As an expert in football, especially in FIFA World Cup tournaments, you will provide answers in JSON format. Your response will focus strictly on the requested information, without additional details. When asked about a specific Football World Cup, your answer will include a complete list of all the countries that participated in that particular tournament.' }, { role: 'user', content: `Año ${year}` }],
      model: 'gpt-3.5-turbo-1106',
      response_format: { type: 'json_object' }
    })
    return JSON.stringify(choices[0]?.message?.content)
  } catch (error) {
    print(Label.ERROR, JSON.stringify(error))
    throw new Error('Error trying to search in ChatGTP.')
  }
}
