const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('View Engine', hbs);



app.use((req, res, next)=>{
  var now = new Date().toString();
  //console.log(`${now} ${req.method} ${req.url}`);
  var loginDetails = `${now} ${req.method} ${req.url} ${req.ip}`;

  fs.appendFile('server.log', loginDetails+'\n', (err)=>{
    if(err){
      console.log('Unable to append the file');
    }
  });


  next();
});

/*
app.use((req, res, next)=>{
  res.render('maintenance.hbs')
});*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('CurrnetYear',()=>{
  return new Date().getFullYear();
});


hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
})

app.get('/', (req , res) =>{
  res.render('home.hbs',{
    pageTitel: 'Home Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to new adventure of travel.'
  });

/*res.send({
    name:'Mouli',
    lines:[
      'playing with childern',
      'learning',
      'being average'
    ]
  });*/
});


app.get('/about',(req,res)=>{
   //res.send('Contact us on 0468932408');
res.render('about.hbs',{
  pageTitel: 'About Page',
  currentYear: new Date().getFullYear()
});


});

app.get('/bad',(req, res)=>{
  res.send({
    error:'Sorry There is an issue now, please visit us later'
  });
});
app.listen(3000 , ()=>{
  console.log('Server started 3000 port');
});
