const { response } = require("express");
const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

app.use(cookieParser())

app.set("view engine", "ejs"); //This tells the Express app to use EJS as its templating engine. 

app.use(bodyParser.urlencoded({ extended: true }));

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
  //we will try to read the cookie and then set the display of the username.$
  let templateVars;
  if(req.cookies){
    if(req.cookies["username"]){
      templateVars = {
        username: req.cookies["username"],
        urls: urlDatabase
      
      };
    } else{
        templateVars = {
          username: null,
          urls: urlDatabase
        
        };
    }
  } else{
    templateVars = {
      username: null,
      urls: urlDatabase
    }
  }
  console.log("TEST ");
  console.log(templateVars);
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/elliott/:parameter", (req, res) => {
  const text = req.params.parameter 
  res.send("Hey dude " + text);
});

app.post("/login", (req, res) => { 
  console.log("we are in the LOGIN POST");
  const username = req.body.username;
  console.log(username);
  res.cookie("username", username);
  res.redirect('/urls');
});

//^^^will always be req,res + look for patterns + "username is the name of the cookie"
//we need to do a redirect because we need to go somewhere and /urls is the only place we can go

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