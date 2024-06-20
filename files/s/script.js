let map;
let markers = [];
let activeMarker;

// Define default and highlighted icons
const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const highlightedIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

document.addEventListener('DOMContentLoaded', (event) => {
    initMap();
    initGalleryHover();
});

function initMap() {
    // make us 36.99688, 30.78599
    map = L.map('map').setView([36.99688, 30.78599], 16); // Default center

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers to the map based on data-lat and data-lng attributes
    const images = document.querySelectorAll('.gallery');
    images.forEach(img => {
        const lat = parseFloat(img.getAttribute('data-lat'));
        const lng = parseFloat(img.getAttribute('data-lng'));
        const marker = L.marker([lat, lng]).addTo(map);
        markers.push(marker);

        img.addEventListener('mouseover', () => highlightMarker(marker));
        img.addEventListener('mouseout', () => unhighlightMarker(marker));
    });
}

function highlightMarker(marker) {
    if (activeMarker) {
        activeMarker.setIcon(new L.Icon.Default()); // Reset the icon of the previous marker
    }
    marker.setIcon(new L.Icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
        className: 'highlighted-marker'
    })); // Highlighted icon
    map.setView(marker.getLatLng(), map.getZoom());
    activeMarker = marker;
}

function unhighlightMarker(marker) {
    marker.setIcon(new L.Icon.Default()); // Reset to the default icon
}
