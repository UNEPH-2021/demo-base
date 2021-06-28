# demo-base

## Notes de cours

**03/60/2021**

- A télécharger :
  - http://git-scm.com/downloads
  - https://www.postman.com/
- Exemples de code et apprentissage de HTML : https://www.w3schools.com/
- Slides des cours :
  - https://perso.liris.cnrs.fr/lionel.medini/enseignement/M1IF03
  - https://perso.liris.cnrs.fr/lionel.medini/enseignement/M1IF13

A retenir :

- Le Web
- HTTP
- REST
- Web API
  - Documentation : OpenAPI, Swagger

**24/06/2021**

URL des cours :
- JavaScript : https://perso.liris.cnrs.fr/lionel.medini/enseignement/M1IF03/CM/4_0_JS.pdf
- AJAX : https://perso.liris.cnrs.fr/lionel.medini/enseignement/M1IF03/CM/4_1_AJAX.pdf

### /!\ Pour la prochaine fois

Télécharger et installer NodeJS : https://nodejs.org/en/

**28/06/2021**

- Programmation côté serveur
  - Node JS
  - Event Loop
  - Express

URL des cours :
- NodeJS : https://perso.liris.cnrs.fr/lionel.medini/enseignement/M1IF13/revealJS/#cm1-stackjs

### Code de la page HTML

```html
<!doctype html>
<html>
<head>
	<title>Premiere page Web</title>
	<link rel="stylesheet" type="text/css" href="test.css">
</head>
<body>
	<h1>La page qui dit bonjour</h1>
	<form action="/disbonjour" method="POST">
		<p>
			Entrez votre prenom :
			<input type="text" name="prenom">
			<input type="submit" value="Envoyer">
		</p>		
	</form>
</body>
</html>
```

### Code du fichier index.js du serveur Express

```javascript
const express = require('express')
const app = express()
const port = 3000

app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/coucou', (req, res) => {
  res.send('Coucou World!')
})

app.post('/disbonjour', (req, res) => {
  res.send('Bonjour ' + req.body['prenom'] + ' !!!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

### Choses à faire pour utiliser le moteur de templates EJS

- Installer EJS avec NPM : `npm i ejs`
- Indiquer à Express qu'il faut qu'il utilise EJS comme moteur de templating : dans le fichier `index.js`, rajouter une ligne `app.set('view engine', 'ejs');`
- Créer un dossier `views` dans le dossier du projet
- Créer une page HTML simple avec une extension `.ejs`
- Dans l'une des fonctions de réponse à une requête, remplacer `send(...)` par `render('nom_du_fichier_sans_extension')`

**01/07/2021**

- Programmation côté client
  - JS
  - Single-Page Application

**05/07/2021**

- Web mobile
  - responsive (Bootstrap, Foundation, Material...)
  - Device API (GPS, battery, vibration)
