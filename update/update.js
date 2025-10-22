
const fs = require('fs');
const path = require('path');

// Beispiel: Lade Daten aus Quellen (Stub)
const campingplaetze = require('./sources/adac');
const stellplaetze = require('./sources/park4night');

const allPlaces = [...campingplaetze, ...stellplaetze];
fs.writeFileSync(path.join(__dirname, '../data/plaetze.json'), JSON.stringify(allPlaces, null, 2));
console.log('Daten aktualisiert.');
