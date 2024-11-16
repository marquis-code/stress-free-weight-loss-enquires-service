const express = require("express");
const { google } = require("googleapis");
let router = express.Router();
require("dotenv").config();

router.post("/signup", async (req, res) => {
    const { firstName, lastName, email, phoneNumber, age, gender, weight_loss_goal, current_activity_level, diet_preferences, preferred_communication_method, additional_questions } = req.body;
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const spreadsheetId = "1c137Dp6Fh0ZTcCY7s9Rod4D7Y6RVH1MUFO6ata5N8_c";
    const googleSheets = google.sheets({
      version: "v4",
      auth: client,
    });
  
    //Get Metadata about spreadsheet
    const metadata = await googleSheets.spreadsheets.get({
      auth, spreadsheetId
    })
  
    //Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
      auth, spreadsheetId,
      range: "Sheet1!A:B",
    })
  
    googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:B",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[ firstName, lastName, email, phoneNumber, age, gender, weight_loss_goal, current_activity_level, diet_preferences, preferred_communication_method, additional_questions ]],
      },
    });
  
    return res.status(200).json({
      successMessage: "Thanks for reaching out. We would revert shortly!",
    });
  });

  router.post("/news-letters", async (req, res) => {
    const { email } = req.body;
    const auth = new google.auth.GoogleAuth({
      keyFile: "news-credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const spreadsheetId = "1TGVL_flVBF-daUp0nsd85GuW2QvB4eCZDpi3HEUY2Tg";
    const googleSheets = google.sheets({
      version: "v4",
      auth: client,
    });
  
    //Get Metadata about spreadsheet
    const metadata = await googleSheets.spreadsheets.get({
      auth, spreadsheetId
    })
  
    //Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
      auth, spreadsheetId,
      range: "Sheet1!A:B",
    })
  
    googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:B",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[ email ]],
      },
    });
  
    return res.status(200).json({
      successMessage: "Thanks for reaching out. We would revert shortly!",
    });
  });

  module.exports = router;