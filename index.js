const express = require('express')
const app = express()
const port = 3000

app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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
  res.render('resultat2', {personne: req.body['prenom']})
})

app.get('/disbonjour', (req, res) => {
  res.send('Bonjour ' + req.query.prenom + ' !!!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})