
      
      mapboxgl.accessToken=mapToken;
      
  
        const map = new mapboxgl.Map({
            container: 'map', // container ID
            center: [77.5946, 12.9716], // starting position [lng, lat]. Note that lat must be set between -90 and 90
            zoom: 9 // starting zoom
        });
  