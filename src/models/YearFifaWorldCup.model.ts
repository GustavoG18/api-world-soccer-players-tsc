import mongoose, { Schema } from 'mongoose'

const YearFifaWorldCupSchema = new Schema({
  year: {
    type: Number,
    required: true
  },
  hostCountry: {
    type: String,
    required: true
  },
  participatingCountries: {
    type: [String],
    required: true
  },
  winner: {
    type: String,
    required: true
  }
})

const YearFifaWorldCup = mongoose.model('YearFifaWorldCup', YearFifaWorldCupSchema)

export {
  YearFifaWorldCup,
  YearFifaWorldCupSchema
}
