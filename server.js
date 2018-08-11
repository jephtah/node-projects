const express = require('express');
const hbs = require ('hbs');
const fs = require('fs');


var app = express();


//Adding middleware - teaching express how to do something
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n', (err)=>{
        if(err) {
            console.log ('Unable to append to server.log');
        }
    }) 
    next();
})
//For maintenance - In this case, we don't pass in next
// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// })
app.use(express.static(__dirname + '/public'));

//Registering a helper - we do this when we have a particular function which doesn't change across files
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})

app.get('/', (req, res)=> {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        bodyText: 'Welcome to our Page'
        
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
})

app.get('/bad', (req, res)=> {
    res.send({
        message: "Very bad request"
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on Port 3000');
});