
const map = L.map('map').setView([39.0, 22.0], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

fetch('data/plaetze.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(place => {
            const color = place.typ === 'Campingplatz' ? 'green' : (place.typ === 'Stellplatz' ? 'blue' : 'orange');
            const marker = L.circleMarker([place.lat, place.lon], {
                color: color,
                radius: 8
            }).addTo(map);

            marker.bindPopup(`<b>${place.name}</b><br>${place.ort}<br>${place.bewertung} ⭐<br><button onclick='showDetails(${JSON.stringify(place)})'>Details</button>`);
        });
    });

function showDetails(place) {
    alert(`Name: ${place.name}
Adresse: ${place.adresse}
Telefon: ${place.telefon}
Website: ${place.website}
Email: ${place.email}`);
}

document.getElementById('search').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    // Implement search logic if needed
});
