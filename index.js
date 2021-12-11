require("dotenv").config();
const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const googleSheets = async () => {
  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = process.env.SHEETS_ID;
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  const getRows = async () => {
    await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      // range: "page_log!A:A",
      range: "page_log",
    });
  };

  const writeRows = async () => {
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "page_log",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [["Name", "Age"]],
        values: [["Miro", "21"]],
      },
    });
  };
};
