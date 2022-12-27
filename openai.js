const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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',
});

const {
  selectTravel
} = require(`./database`);

const openai = new OpenAIApi(configuration);

(async () => {

  const travel = await selectTravel(1);
  
  console.log(travel)


  const response = await openai.createCompletion({
    model: "text-davinci-001",
    prompt: travel.href,
    temperature: 0.4,
    max_tokens: 62,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

   console.log(response);
})()