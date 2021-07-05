const express = require('express')
const app = express()
const port = 3000

// La variable qui stocke les personnes
let personnes = [];

app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json())

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/static/index.html')
})

app.get('/teapot', (req, res) => {
  res.status(418).end()
})

app.get('/coucou', (req, res) => {
  res.render('resultat')
})

app.post('/disbonjour', (req, res) => {
  const prenom = req.body['prenom'];
  personnes.push(prenom);
  res.render('resultat3', {personnes : personnes});
})

app.post('/disbonjour-json', (req, res) => {
  personnes.push(req.body.prenom);
  res.type('application/json')
  res.send('{"message": "Bonjour ' + req.body.prenom + ' !!!"}')
})

app.get('/disbonjour', (req, res) => {
  res.send('Bonjour ' + req.query.prenom + ' !!!')
})

app.get('/users', (req, res) => {
  res.type('application/json')
  res.send(personnes)
})

//
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})