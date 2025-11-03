// data.js - FULLY WORKING MOCK FOR ASSIGNMENT 2

const projects = [
  {
    id: 1,
    title: "Abandoned Farmland Restoration",
    sector: "Agriculture",
    summary_short: "Restores degraded farmland to sequester carbon.",
    feature_img_url: "https://via.placeholder.com/600x400?text=Farmland",
    intro_short: "This project restores abandoned farmland to enhance soil carbon storage and biodiversity.",
    impact: "Sequestered 500,000 tons of CO₂ annually across 10,000 hectares.",
    original_source_url: "https://example.com/farmland"
  },
  {
    id: 2,
    title: "Alternative Cement",
    sector: "Industry",
    summary_short: "Low-carbon cement alternative.",
    feature_img_url: "https://via.placeholder.com/600x400?text=Cement",
    intro_short: "Replaces traditional cement with a geopolymer that reduces CO₂ emissions by 80%.",
    impact: "Avoids 1 million tons of CO₂ per year in production.",
    original_source_url: "https://example.com/cement"
  },
  {
    id: 3,
    title: "Electric Bus Fleet",
    sector: "Transportation",
    summary_short: "Electrifying urban bus networks.",
    feature_img_url: "https://via.placeholder.com/600x400?text=Bus",
    intro_short: "Replacing diesel buses with electric ones in major cities.",
    impact: "Reduces urban air pollution and saves 50,000 tons of CO₂ yearly.",
    original_source_url: "https://example.com/bus"
  }
];

// Required functions
function getProjectById(id) {
  return projects.find(p => p.id === parseInt(id)) || null;
}

function getProjectsBySector(sector) {
  if (!sector) return [];
  return projects.filter(p => 
    p.sector.toLowerCase() === sector.toLowerCase()
  );
}

function getAllProjects() {
  return projects;
}

module.exports = {
  getProjectById,
  getProjectsBySector,
  getAllProjects
};