const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/login"
);

const authorizedClient = google.oauth2({
  auth: oauth2Client,
  version: "v2",
});

module.exports = {
  oauth2Client,
  authorizedClient,
};
