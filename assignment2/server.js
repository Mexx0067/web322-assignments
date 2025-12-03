/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Mehroj Tursunov Student ID: 123839243 Date: November 27, 2025
*
*  Published URL: ___________________________________________________________
*
********************************************************************************/

require('dotenv').config();
const express = require('express');
const clientSessions = require('client-sessions');
const path = require('path');
const projectsModule = require('./modules/projects');

const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Client Sessions
app.use(clientSessions({
  cookieName: "session",
  secret: process.env.SESSIONSECRET,
  duration: 24 * 60 * 60 * 1000, // 24 hours
  activeDuration: 1000 * 60 * 5 // 5 minutes
}));

// Make session available to all views
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Ensure Login Middleware
function ensureLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
}

// Home route
app.get('/', (req, res) => {
  res.render('home');
});

// About route
app.get('/about', (req, res) => {
  res.render('about');
});

// GET Login
app.get('/login', (req, res) => {
  res.render('login', { errorMessage: "", userName: "" });
});

// POST Login
app.post('/login', (req, res) => {
  const { userName, password } = req.body;
  
  if (userName === process.env.ADMINUSER && password === process.env.ADMINPASSWORD) {
    req.session.user = {
      userName: process.env.ADMINUSER
    };
    res.redirect('/solutions/projects');
  } else {
    res.render('login', {
      errorMessage: 'Invalid User Name or Password',
      userName: req.body.userName
    });
  }
});

// GET Logout
app.get('/logout', (req, res) => {
  req.session.reset();
  res.redirect('/');
});

// GET All Projects or by Sector
app.get('/solutions/projects', (req, res) => {
  if (req.query.sector) {
    projectsModule.getProjectsBySector(req.query.sector)
      .then(projects => {
        res.render('projects', { projects });
      })
      .catch(err => {
        res.status(404).render('404', { message: err });
      });
  } else {
    projectsModule.getAllProjects()
      .then(projects => {
        res.render('projects', { projects });
      })
      .catch(err => {
        res.status(404).render('404', { message: err });
      });
  }
});

// GET Project by ID
app.get('/solutions/projects/:id', (req, res) => {
  projectsModule.getProjectById(req.params.id)
    .then(project => {
      res.render('project', { project });
    })
    .catch(err => {
      res.status(404).render('404', { message: err });
    });
});

// GET Add Project (Protected)
app.get('/solutions/addProject', ensureLogin, (req, res) => {
  res.render('addProject');
});

// POST Add Project (Protected)
app.post('/solutions/addProject', ensureLogin, (req, res) => {
  projectsModule.addProject(req.body)
    .then(() => {
      res.redirect('/solutions/projects');
    })
    .catch(err => {
      res.render('500', { message: `I'm sorry, but we have encountered the following error: ${err}` });
    });
});

// GET Edit Project (Protected)
app.get('/solutions/editProject/:id', ensureLogin, (req, res) => {
  projectsModule.getProjectById(req.params.id)
    .then(project => {
      res.render('editProject', { project });
    })
    .catch(err => {
      res.status(404).render('404', { message: err });
    });
});

// POST Edit Project (Protected)
app.post('/solutions/editProject/:id', ensureLogin, (req, res) => {
  projectsModule.editProject(req.params.id, req.body)
    .then(() => {
      res.redirect('/solutions/projects');
    })
    .catch(err => {
      res.render('500', { message: `I'm sorry, but we have encountered the following error: ${err}` });
    });
});

// GET Delete Project (Protected)
app.get('/solutions/deleteProject/:id', ensureLogin, (req, res) => {
  projectsModule.deleteProject(req.params.id)
    .then(() => {
      res.redirect('/solutions/projects');
    })
    .catch(err => {
      res.render('500', { message: `I'm sorry, but we have encountered the following error: ${err}` });
    });
});

// 404 catch-all route
app.use((req, res) => {
  res.status(404).render('404', { message: "I'm sorry, we're unable to find what you're looking for" });
});

// Initialize and start server
projectsModule.initialize()
  .then(() => {
    app.listen(8080, () => {
      console.log('Server running on http://localhost:8080');
    });
  })
  .catch(err => {
    console.log('Failed to initialize:', err);
  });