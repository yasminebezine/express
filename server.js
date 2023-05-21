const express = require('express');

const server = express();
const port = 3000;
// Set EJS as the template engine
server.set('view engine', 'ejs');

server.use(express.static('public'));


server.get('/', (req, res) => {
  res.render('home');
});

server.get('/services', (req, res) => {
  res.render('services');
});

server.get('/contact', (req, res) => {
  res.render('contact');
});
const authMiddleware = (req, res, next) => {
    console.log("authMiddleware called");
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);
    console.log(`Authenticating user ${name} with email ${email}`);
    if (name && email && password) {
      server.locals.name = name;
      server.locals.email = email;
      console.log(`Setting app.locals.name to ${name}`);
      next();
    } else {
      res.redirect("/?message=Invalid credentials");
    }
  };
  server.use(authMiddleware);


// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});