import { Configuration, OpenAIApi } from "openai";

export class OpenAI {
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
      console.log(`request cost: ${response.data.usage.total_tokens} tokens`);
      return response.data.choices[0].text;
    } catch (err) {
      throw err;
    }
  }
}
