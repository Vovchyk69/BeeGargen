const textToSpeech = require("@google-cloud/text-to-speech");
const client = new textToSpeech.TextToSpeechClient();

class TextToSSMLProcessor {
  constructor(text) {
    this.ssml = text;
  }

  handleSpecialChars() {
    this.ssml = this.ssml
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return this;
  }

  // https://regex101.com/r/nG1gU7/27
  handleSentancesBreaks() {
    this.sentances = this.ssml
      .replace(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/gm, "\n")
      .split("\n")
      .join("</s><s>");
    this.ssml = `<p> <s> ${this.sentances} </s> </p>`;
    return this;
  }

  build() {
    return (this.ssml = `<speak>${this.ssml}</speak>`);
  }
}

const getAudio = async (ssml, locale) => {
  let name;
  if (locale === "uk") {
    name = "uk-UA-Standard-A";
  }
  const [response] = await client.synthesizeSpeech({
    input: { ssml },
    voice: {
      languageCode: locale,
      ssmlGender: "FEMALE",
      name,
    },
    audioConfig: { audioEncoding: "MP3", speakingRate: 0.75 },
  });

  return response.audioContent;
};

const getSSML = (text) => {
  return new TextToSSMLProcessor(text)
    .handleSpecialChars()
    .handleSentancesBreaks()
    .build();
};

module.exports = {
  getAudio,
  getSSML,
};
