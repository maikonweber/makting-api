const tf = require('@tensorflow/tfjs');
const modelUrl = 'https://storage.googleapis.com/tfjs-models/tfjs/shakespeare/model.json';


const inputSequenceLength = 20;
const outputSequenceLength = 20;
const inputVocabSize = 10000;
const outputVocabSize = 10000;
const embeddingDimension = 256;

const encoder = tf.sequential();
encoder.add(tf.layers.embedding({
  inputDim: inputVocabSize,
  outputDim: embeddingDimension,
  inputLength: inputSequenceLength
}));
encoder.add(tf.layers.gru({units: 512, returnSequences: true}));

const decoder = tf.sequential();
decoder.add(tf.layers.embedding({
  inputDim: outputVocabSize,
  outputDim: embeddingDimension,
  inputLength: outputSequenceLength
}));
decoder.add(tf.layers.gru({units: 512, returnSequences: true}));
decoder.add(tf.layers.dense({units: outputVocabSize, activation: 'softmax'}));

const model = tf.sequential();
model.add(tf.layers.encoderDecoder({
  encoder,
  decoder,
  inputSequenceLength,
  outputSequenceLength
}));

model.compile({optimizer: 'adam', loss: 'categoricalCrossentropy'});
