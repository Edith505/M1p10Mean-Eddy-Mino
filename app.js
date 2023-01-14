const express = require("express");
const app = express()
const port = 3000

//Affichage de la page d'acceuille dans le '/'
app.get('/', (req, res) =>{
    //Afficher un fichier existant
    res.sendFile(__dirname + '/index.html')
}) 
//Affichage d'une page contact dans l'adresse /contact
app.get('/contact', (req, res) =>{
    //Afficher un fichier existant
    res.sendFile(__dirname + '/contact.html')
}) 
app.listen(port, () =>{
    console.log(`app demarrer sur le port ${port}`);
})
