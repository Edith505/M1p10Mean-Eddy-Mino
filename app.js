const express = require('express');
const { get } = require('./routes/rooter');
const app = express()
const indexRouter = require('./routes/rooter')
const port = 3000

//Ajout d'un fichier static comme Css/javascrip ou des images
app.use(express.static('public'))

//Utilisation moteur de template twig
app.set("view engine", "twig")

// importation des routeurs pour la Home Page
app.use('/',indexRouter);

//utilisation middlewares avec use
app.use('/', (req, res, next) =>{  
    //exemple d'un middlwares
    console.log("middlewares succès");
    next();
}) 

/*
//Affichage de la page d'acceuille dans le path'/'
app.get('/', (req, res) =>{
    //Afficher un fichier existant
    // res.sendFile(__dirname + '/index.html')
    //methode render
    res.render('index', {title: "Home Page"});
}) 
//Affichage d'une page contact dans l'adresse /contact
app.get('/contact', (req, res) =>{
    //Afficher un fichier existant
    //res.sendFile(__dirname + '/contact.html')
    res.render('contact');
}) 
*/


//ecouter sur le port l'app 3000
app.listen(port, () =>{
    console.log(`App demarrer sur le port ${port}`);
})
