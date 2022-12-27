
const tf = require('@tensorflow/tfjs');
const { selectTravel} = require('./database')


async function generateText(text) {
  const travel = await selectTravel(1)
  console.log(travel[0]['href'])
  const seed = travel[0]['href']

  const model = await tf.loadLayersModel('model.json')

  const tokenizer = tf.keras.preprocessing.text.Tokenizer();
  tokenizer.fitOnTexts([sedd])
  const encodedSeed = tokenizer.textToSequences([seed])[0]

  let generateText = seed;
  for (let i = 0; i < 10; i++) {

    const encodedText =
      tokenizer.textToSequences([generateText])[0]

    const paddedText = tf.keras.preprocessing.sequence.pad_sequences(
      [encodedText], maxlen = encodedSeed, padding = 'pre', truncating = 'pre',

    )
  
    
    const prediction = model.predict(paddedText);

    const index = predict.argMax(-1).dataSync()[0];

    const word = tokenizer.index_word[index];

    generateText += '' + word;
  }
}

generateText()


