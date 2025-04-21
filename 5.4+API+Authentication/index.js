import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "zephyr";
const yourPassword = "shadow";
const yourAPIKey = "10cb75d1-52b4-4302-918c-1729d00fd351";
const yourBearerToken = "ee3f04f2-fd41-44ac-baf8-41ee71a5780b";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try{
    const result = await axios.get(API_URL + "/random");
    res.render("index.ejs",{content: JSON.stringify(result.data) });
  }catch (error){
    res.status(404).send("Error: ", error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/filter", {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/bearerToken", async (req, res) => {
 try{
  const result = await axios.get(API_URL + "/secrets/", config);
  res.render("index.ejs", {content: JSON.stringify(result.data)});
 } catch(error){
  res.status(404).send(error.message);
 }
 const config = {
  headers: {
    Authorization: `Bearer ${yourBearerToken}`
  },
 };
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
