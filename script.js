
let map = L.map('map').setView([38.0, 23.5], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

fetch('data/plaetze.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(platz => {
            let farbe = platz.typ === "Campingplatz" ? "green" : (platz.typ === "Stellplatz" ? "blue" : "orange");
            let marker = L.circleMarker(platz.koordinaten, {
                color: farbe,
                radius: 8
            }).addTo(map);
            marker.bindPopup(`<b>${platz.name}</b><br>${platz.ort}<br>Bewertung: ${platz.bewertung}`);
        });
    });

// Suchfunktion
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', function() {
    const term = this.value.toLowerCase();
    document.querySelectorAll('.leaflet-interactive').forEach(el => el.remove());
    fetch('data/plaetze.json')
        .then(response => response.json())
        .then(data => {
            data.filter(p => p.name.toLowerCase().includes(term) || p.ort.toLowerCase().includes(term) || p.region.toLowerCase().includes(term))
                .forEach(platz => {
                    let farbe = platz.typ === "Campingplatz" ? "green" : (platz.typ === "Stellplatz" ? "blue" : "orange");
                    let marker = L.circleMarker(platz.koordinaten, {
                        color: farbe,
                        radius: 8
                    }).addTo(map);
                    marker.bindPopup(`<b>${platz.name}</b><br>${platz.ort}<br>Bewertung: ${platz.bewertung}`);
                });
        });
});
