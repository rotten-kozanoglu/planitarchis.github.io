import { Configuration, OpenAIApi } from "openai";

function decryptCeaser(text, shift) {
  var result = "";
  for (var i = 0; i < text.length; i++) {
    var c = text.charCodeAt(i);
    if (c >= 65 && c <= 90) {
      result += String.fromCharCode(((c - 65 - shift + 26) % 26) + 65);
    } else if (c >= 97 && c <= 122) {
      result += String.fromCharCode(((c - 97 - shift + 26) % 26) + 97);
    } else {
      result += text.charAt(i);
    }
  }
  return result;
}

class OpenAI {
  constructor(apiKey) {
    this.openai = new OpenAIApi(new Configuration({ apiKey }));
  }

  async generateText(prompt, model, max_tokens, temperature = 0.85) {
    try {
      const response = await this.openai.createCompletion({
        model,
        prompt,
        max_tokens,
        n: 1,
        temperature,
      });
      console.log(`Request cost: ${response.data.usage.total_tokens} tokens`);
      return response.data.choices[0].text;
    } catch (err) {
      console.error("OpenAI API Error:", err);
      throw new Error("Failed to generate text. Please try again later.");
    }
  }
}

const API_KEY = "4qwAAX37iKAyPiU5VEmFA3IsirMQDhT8C8aiC4Yyv1GrLZEG";
const decryptedAPI_KEY = decryptCeaser(API_KEY, 7);

export { OpenAI, decryptedAPI_KEY };
