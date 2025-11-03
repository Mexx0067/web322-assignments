/********************************************************************************
*  WEB322 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Your Name Student ID: Your ID Date: October 27, 2025
*
*  Published URL: https://your-project.vercel.app
********************************************************************************/

const express = require('express');
const app = express();
const path = require('path');
const { getProjectById, getProjectsBySector, getAllProjects } = require('./data'); // Adjust path as needed

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');  // Optional but recommended


// Serve static files from public folder
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
    console.log('Home route accessed');
    res.render('home');
});

// About route
app.get('/about', (req, res) => {
    console.log('About route accessed');
    res.render('about');
});

// Project by ID
app.get('/solutions/projects/:id', (req, res) => {
    console.log(`Project ID route accessed: ${req.params.id}`);
    const project = getProjectById(parseInt(req.params.id));
    if (project) {
        res.render('project', { project });
    } else {
        res.status(404).render('404', { message: `Project with ID ${req.params.id} not found` });
    }
});

// Projects by sector or all projects
app.get('/solutions/projects', (req, res) => {
    console.log(`Projects route accessed, sector: ${req.query.sector || 'all'}`);
    if (req.query.sector) {
        const projects = getProjectsBySector(req.query.sector);
        if (projects.length > 0) {
            res.render('projects', { projects });
        } else {
            res.status(404).render('404', { message: `No projects found for sector: ${req.query.sector}` });
        }
    } else {
        const projects = getAllProjects();
        res.render('projects', { projects });
    }
});

// 404 catch-all route
app.use((req, res) => {
    console.log('404 route accessed:', req.url);
    res.status(404).render('404', { message: "I'm sorry, we're unable to find what you're looking for" });
});

app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});