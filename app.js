const express = require("express");
const app = express()
const port = 3000

//Ajout d'un fichier static comme Css/javascrip ou des images
app.use(express.static('public'))
//utilisation middlewares avec use
app.use('/', (req, res, next) =>{  
    //exemple d'un middlwares
    console.log("middlewares");
    next();
}) 

//Affichage de la page d'acceuille dans le path'/'
app.get('/', (req, res) =>{
    //Afficher un fichier existant
    res.sendFile(__dirname + '/index.html')
}) 
//Affichage d'une page contact dans l'adresse /contact
app.get('/contact', (req, res) =>{
    //Afficher un fichier existant
    res.sendFile(__dirname + '/contact.html')
})

//ecouter sur le port l'app 3000
app.listen(port, () =>{
    console.log(`app demarrer sur le port ${port}`);
})
