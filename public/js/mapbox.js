export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibW9zYW1pciIsImEiOiJjbHY5MjZkM2IwcWN3MnJtenU5bTh1YWZ6In0.1uyLvmlolcVORVfziVHSYA';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mosamir/clv92j7us00o301qz35jjeglv', // style URL
    scrollZoom: false,
    //   center: [-118.14488, 34.059912], // starting position [lng, lat]
    //   zoom: 9, // starting zoom
    //   interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Crate marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup()
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      leftr: 100,
      right: 100,
    },
  });
};
