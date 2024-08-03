{/* <div id='storemapper' style='width:100%;'>
  <p>Store Locator is loading from <a href='https://www.storemapper.co'>Storemapper plugin</a>...</p>
</div> */}

// <script data-storemapper-start='2024,08,02'
//         data-storemapper-id='27581-VcN2moYSplBJkAoX'>
        ( function() {
            var script = document.createElement('script');
          script.type  = 'text/javascript';script.async = true;
          script.src = 'https://www.storemapper.co/js/widget-3.min.js';
          var entry = document.getElementsByTagName('script')[0];
          entry.parentNode.insertBefore(script, entry);}
        ());
{/* </script> */}


// map marker 
const marker = new mapboxgl.Marker()
  .setLngLat([12.554729, 55.706])   //listing.geometry.coordinates
  .addTo(map);
                  