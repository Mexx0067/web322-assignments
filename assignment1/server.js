/********************************************************************************
* WEB322 – Assignment 01
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Mehroj Tursunov Student ID: 123839243 Date: 9/30/2025
*
********************************************************************************/

const projects = require("./modules/projects");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

projects.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening on port: ${port}`);
        });
    })
    .catch(err => {
        console.error("Failed to initialize projects:", err);
    });

    app.get("/", (req, res) => {
        res.send("Assignment 1: Mehroj Tursunov - 123839243");
    });
    app.get("/solutions/projects", (req, res) => {
        projects.getAllProjects()
            .then(data => res.json(data))
            .catch(err => res.send(err));
    });
    
    app.get("/solutions/projects/id-demo", (req, res) => {
        projects.getProjectById(9)
            .then(data => res.json(data))
            .catch(err => res.send(err));
    });
    app.get("/solutions/projects/sector-demo", (req, res) => {
        projects.getProjectsBySector("agriculture")
            .then(data => res.json(data))
            .catch(err => res.send(err));
    });
    