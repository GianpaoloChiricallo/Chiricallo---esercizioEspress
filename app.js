const express = require('express')
const app = express()
const port = 3000
 
const path = require('path');

const bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json());                        

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));  


var emailRegistrazione;
var passwordRegistrazione;
var emailLogin;
var passwordLogin;


app.get('/', (req, res) => {

  res.sendFile(path.join(__dirname, '/home.html'));

})

app.get('/registrazione', (req, res) => {

  res.sendFile(path.join(__dirname, '/registrazione.html'));

})

app.get('/risultato-registrazione', (req, res) => {

  res.send('Il risultato è: ...........');

})

app.post('/registrazione', (req, res) => {

  emailRegistrazione = req.body.email;
  passwordRegistrazione = req.body.password;

})


app.get('/login', (req, res) => {

  res.sendFile(path.join(__dirname, '/login.html'));

})

app.get('/risultato-login', (req, res) => {

  res.send('Il risultato è: ...........' );

})

app.post('/login', (req, res) => {

  emailLogin = req.body.email;
  passwordLogin = req.body.password;

  let checkPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  let checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let checkCell = /^[0-9]+$/;

  let error = false;            
                
  if (emailLogin == '' || passwordLogin == '') {
      alert("EMAIL E PASSWORD SONO OBBLIGATORI");
      error = true; 
  }
  else{

      if (!emailLogin.match(checkEmail)){

          alert("EMAIL non valida");
          error = true; 

      }

      if (passwordLogin.length < 8) {
          alert("PASSWORD non valida, obbligatori almeno 8 caratteri");
          error = true; 
      } 
      else { 
          if (!passwordLogin.match(checkPassword)){

              alert("PASSWORD non valida, obbligatori i caratteri richiesti: \n - un numero\n - un carattere speciale \n - una lettera maiuscola \n - una lettera minuscola");
              error = true; 
          }
      }
  }

  if (error == true) {

    res.redirect('/login');
  } 

  if (emailLogin == emailRegistrazione) {
    console.log("ok, autenticato");
    res.redirect('/autenticato');
  }
  else {
    res.redirect('/login');
  }

})


app.get('/autenticato', (req, res) => {

  res.sendFile(path.join(__dirname, '/autenticato.html'));

})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})