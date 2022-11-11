const vision = require("@google-cloud/vision");

const client = new vision.ImageAnnotatorClient();

class TextProcessor {
  constructor(text) {
    this.text = text;
    return this;
  }

  handleNewLines() {
    const regexp = /\n/g;
    const processedText = this.text.replace(regexp, " ");
    this.text = processedText;
    return this;
  }

  handleWordBreaks() {
    const regexp = /-\n/g;
    const processedText = this.text.replace(regexp, "");
    this.text = processedText;
    return this;
  }

  doubleDotSpace() {
    const regexp = /\.\s\./g;
    const processedText = this.text.replace(regexp, ".");
    this.text = processedText;
    return this;
  }

  spaceDotSpace() {
    const regexp = /\s\.\s/g;
    const processedText = this.text.replace(regexp, ". ");
    this.text = processedText;
    return this;
  }

  colonDot() {
    const regexp = /\:\./g;
    const processedText = this.text.replace(regexp, ":");
    this.text = processedText;
    return this;
  }
}

module.exports.getText = async (imageBuffer) => {
  const [data] = await client.batchAnnotateImages({
    requests: [
      {
        image: {
          content: imageBuffer.toString("base64"),
        },
        features: [
          {
            type: "TEXT_DETECTION",
          },
        ],
      },
    ],
  });
  const { textAnnotations } = data.responses[0];
  if (!textAnnotations.length) {
    return "";
  }

  const { description: rawText, locale } = textAnnotations[0];

  const processedText = new TextProcessor(rawText)
    .handleWordBreaks()
    .handleNewLines()
    .doubleDotSpace()
    .spaceDotSpace()
    .colonDot().text;

  return { text: processedText, locale };
};
