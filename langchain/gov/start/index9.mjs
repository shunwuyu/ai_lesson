import { config } from 'dotenv'
import { ChatOpenAI } from "@langchain/openai";
import { JsonOutputParser } from "@langchain/core/output_parsers";
config()

const model = new ChatOpenAI({ 
  model: "gpt-3.5-turbo",
  temperature: 0 
});

const extractCountryNames = (inputs) => {
  if (!Array.isArray(inputs.countries)) {
    return "";
  }
  return JSON.stringify(inputs.countries.map((country) => country.name));
};


const chain = model.pipe(new JsonOutputParser()).pipe(extractCountryNames);

const stream = await chain.stream(
  `Output a list of the countries france, spain and japan and their populations in JSON format. Use a dict with an outer key of "countries" which contains a list of countries. Each country should have the key "name" and "population"`
);

for await (const chunk of stream) {
  console.log(chunk);
}

