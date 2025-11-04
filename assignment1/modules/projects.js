const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];
function initialize() {
    return new Promise((resolve, reject) => {
        try {
            projects = [];
            projectData.forEach(project => {
                const sector = sectorData.find(s => s.id === project.sector_id);
                projects.push({
                    ...project,
                    sector: sector ? sector.sector_name : null
                });
            });
            resolve();
        } catch (err) {
            reject("Unable to initialize projects");
        }
    });
}

function getAllProjects() {
    return new Promise((resolve, reject) => {
        if (projects.length > 0) {
            resolve(projects);
        } else {
            reject("No projects found");
        }
    });
}

function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        const project = projects.find(project => project.id === projectId);
        if (project) {
            resolve(project);
        } else {
            reject("Unable to find requested project");
        }
    });
}

function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        const search = sector.toLowerCase();
        const filtered = projects.filter(project =>
            project.sector && project.sector.toLowerCase().includes(search)
        );
        if (filtered.length > 0) {
            resolve(filtered);
        } else {
            reject("Unable to find requested projects");
        }
    });
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };

