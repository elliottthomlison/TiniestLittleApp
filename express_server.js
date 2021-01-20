const { response } = require("express");
const express = require("express");
const app = express();
const PORT = 8080;

app.set("view engine", "ejs"); //This tells the Express app to use EJS as its templating engine. 

function generateRandomString() {
  Math.random().toString(36).substring(2, 8);
}

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/elliott/:parameter", (req, res) => {
  const text = req.params.parameter 
  res.send("Hey dude " + text);
});

// app.get("/urls/:shortURL", (req, res) => {
//   const templateVars = { shortURL: req.params.shortURL, longURL: /* What goes here? */ };
//   res.render("urls_show", templateVars);
// });

app.post("/urls", (req, res) => {
  const shortURL = generateRandomString();
  const longURL = req.body.longURL; 

  urlDatabase[shortURL] = longURL;

  // console.log(req.body);  // Log the POST request body to the console
  res.redirect(`/urls/${shortURL}`); // Respond with 'Ok' (we will replace this) (redirect requires a string)
});

app.post('/urls/:shortURL/delete',(req, res)=>{
  delete urlDatabase[req.params.shortURL];
  res.redirect('/urls');
});

generateRandomString();