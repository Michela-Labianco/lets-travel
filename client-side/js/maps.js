//connect it to landmark.ejs
var platform = new H.service.Platform({
    'apikey': 'Z6St2ozBbe7im3IbByU2tVtDj_Uz-kl63WobffJJVgE' //without the {}
  });

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

//geocoding
var service = platform.getSearchService();

let lendmark = document.querySelector('.main-heading').textContent; //searching the h1 tag by his class name
//.textContent because we only need his text content


// Call the geocode method with the geocoding parameters, the callback and an error callback function (called if a communication error occurs):
service.geocode({
    q: lendmark //'Berat' -> no need it anymore because this value has to be different for every landmark check landmark.ejs
}, (result) => {
    // Instantiate (and display) a map object:
    
    //+!+!+!+!+! these lines of code
    var map = new H.Map(
        document.querySelector('.map'), //here we specify iin which block the map has to be inserted -> find the div by his class name
        defaultLayers.vector.normal.map, //type of our map
        { //an object with 2 obligatory keys
            zoom: 9,
            center: result.items[0].position //{ lat: 40.70864402492946, lng: 19.943618151630194 } //get latitutude and longitude of the place by right clicking on it on google maps 
        });

    // Create the default UI:
    var ui = H.ui.UI.createDefault(map, defaultLayers);

    //Add a marker for each location found on the map (go again to geocoding)
    map.addObject(new H.map.Marker(result.items[0].position)); //to set the marker at the center of our map
    //we change this -> map.addObject(new H.map.Marker(item.position))
    //to this -> map.addObject(new H.map.Marker(result.items[0].position));
    

    //console.log(result.items[0].position -> we cut out result.items[0].position and set them as the center of the map

    //console.log(result.items[0].position) //we need to retrieve the value from the key called items index 0 and then use the key position
    //in the console you'll get -> {lat: 40.71268, lng: 19.93851} and we have to set this coordinate as the center of our map
    //that's why we copy and paste there these lines of code +!+!+!+!+!
}, alert);




//service.geocode({
//    q: '200 S Mathilda Ave, Sunnyvale, CA'
//}, (result) => { console.log(result)}); so the coordinate will be stored in this variable and they will be displayed in the console
//you'll get an object in the console
// items: Array(4)
// 0: 
// address: {label: 'Berat, Shqipëria', countryCode: 'ALB', countryName: 'Shqipëria', county: 'Berat', city: 'Berat', …}
// id : "here:cm:namedplace:25783133"
// localityType: "city"
// mapView: {west: 19.80741, south: 40.50962, east: 20.17871, north: 40.79004}
// position: {lat: 40.71268, lng: 19.93851} //we are interested in position
// resultType: "locality"
// scoring: {queryScore: 1, fieldScore: {…}}
// title: "Berat, Shqipëria"
//}, alert);
