   /**
   *  Example app to show leaflet-routerbox
   *
   *
   **/
   sessionStorage.setItem("mail", 0);
      // api url
      const api_url = "https://api.thingspeak.com/channels/1848228/fields/1.json?api_key=C0J8MFW97TT7W612&results=1";
      var channel;
      var feed;
      var newLatLng;
      var marker;
      var popup;


      // navigator.geolocation.getCurrentPosition(showPosition);

      function showPosition(){
        let latitude = 6.892301;
        let longitude = 2.989188;

//         let latitude = 6.891427;
//         let longitude = 2.997222;


      sessionStorage.setItem("userLat", latitude);
      sessionStorage.setItem("userLng", longitude);

      sessionStorage.setItem("userLatLng", latitude+','+longitude);
    }
    showPosition();
    var deviceLat;
    var deviceLng;

      // Defining async function
      async function getapi(url) {

          // Storing response
          const response = await fetch(url);

          // Storing data in form of JSON
          var data = await response.json();
          // console.log(data);
          // console.log(data.channel);
          // console.log(data.feeds);
          if (response.status == 200){
              var lastEntry = data.channel.last_entry_id;
              // console.log(lastEntry);
              var lastPos = data.feeds[0].field1;
              sessionStorage.setItem("lastPos", lastPos);
              // console.log(lastPos);
              deviceLat = lastPos.split(",")[0];
              deviceLng = lastPos.split(",")[1];
              sessionStorage.setItem("deviceLat", deviceLat);
              sessionStorage.setItem("deviceLng", deviceLng);
              return true;
          }
          else{
            return false;
          }

      }
      // Calling that async function
      getapi(api_url);

  function App() {

    var userlat = sessionStorage.getItem("userLat");
    var userlng = sessionStorage.getItem("userLng");
    var deviceLat = sessionStorage.getItem("deviceLat");
    var deviceLng = sessionStorage.getItem("deviceLng");
    this.route =  [];
    this.map = L.map('map').setView([7.624645, 4.542337],6);
    this.bounds = {};
    this.distance = 10; // Distance in km
    popup = '<b><span> Lat:</span>' + deviceLat + '   <span>Long:</span>'+deviceLng+'</b>';
    marker = L.marker([deviceLat, deviceLng]).addTo(this.map).bindPopup(popup);

    var myIcon = L.icon({
      iconUrl: 'userPoint.png',
      iconSize: [35, 50],
      iconAnchor: [22, 50],
      popupAnchor: [-3, -76],
  });
    var popup2 = '<b><span> Lat:</span>' + userlat + '   <span>Long:</span>'+userlng+'</b>';

    L.marker([userlat, userlng], {icon: myIcon}).addTo(this.map).bindPopup(popup2);

    var layer = L.tileLayer('http://osm.nearest.place/retina/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles &copy; <a href="http://www.distance.to">Distance.to</a>'
    }).addTo(this.map);

    var distUrl = 'https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins='+userlat+','+userlng+'&destinations='+deviceLat+','+deviceLng+'&travelMode=driving&key=AvqdLj-QYj2_mJ7bOclAPC9uC2KREs3WQE5MTEVYukxbBJT5ErqQ8wLYm7bLsyYf';
    // getDist(userlat, userlng, deviceLat, deviceLng);


    // Waypoints for getting a route of
    var loc = [
      deviceLng+','+deviceLat,
      userlng+','+userlat

    ];


    this.route = this.loadRoute(loc, this.drawRoute);

        // this.distance = distance(deviceLat, deviceLng, userlat, userlng,"K");
      // $("#distance").html(this.distance);
    $.ajax({
      type: 'GET',
      url: 'https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins='+userlat+','+userlng+'&destinations='+deviceLat+','+deviceLng+'&travelMode=driving&key=AvqdLj-QYj2_mJ7bOclAPC9uC2KREs3WQE5MTEVYukxbBJT5ErqQ8wLYm7bLsyYf',
      cache: false,
      dataType: 'json'
    })
    .done(function(res){
      let data = JSON.stringify(res);
      let newData = JSON.parse(data);

      let dura = timeConvert(Math.round(parseFloat(newData.resourceSets[0].resources[0].results[0].travelDuration)));

      // console.log(newData);
      $("#distance ,#drive").html(newData.resourceSets[0].resources[0].results[0].travelDistance);
      $("#duration").html(dura);

    });
    setInterval(function(){
      let get_api = getapi(api_url);
          deviceLat = sessionStorage.getItem("deviceLat");
          deviceLng = sessionStorage.getItem("deviceLng");
          newLatLng = [parseFloat(deviceLat), parseFloat(deviceLng)];
          marker.setLatLng(newLatLng);
          console.log("done");
          // L.marker([deviceLat, deviceLng]).addTo(this.map);
          getDist(userlat, userlng, deviceLat, deviceLng);


      }, 16000);
  }

  // // **
  //  *  Format an array of LatLng for L.polyline from uncompressed OSRM request
  //  *
  //  */
  App.prototype.formArray = function (arr) {
    var narr = [];
    for(var x=0;x<arr.length;x++){
      var _n = arr[x].split(',');
      narr.push([ parseFloat(_n[0]), parseFloat(_n[1])]);
    }
    return narr;
  };

  /**
   *  Draw the route as a polyline
   *
   **/
  App.prototype.drawRoute = function (route) {

    route = new L.Polyline(L.PolylineUtil.decode(route)); // OSRM polyline decoding

    var boxes = L.RouteBoxer.box(route, this.distance);
    var bounds = new L.LatLngBounds([]);
    var boxpolys = new Array(boxes.length);

    for (var i = 0; i < boxes.length; i++) {
      // L.rectangle(boxes[i], {color: "#ff7800", weight: 1}).addTo(this.map);
      bounds.extend(boxes[i]);
    }

    route.addTo(this.map);
    this.map.fitBounds(bounds);

    return route;

  };

  /**
   *  Load route from Mapzen OSRM server
   *
   *  compressin must be switched off
   *
   **/
  App.prototype.loadRoute = function (loc) {
    var url = 'https://router.project-osrm.org/route/v1/driving/';
    var _this = this;

    url += loc.join(';');

    var jqxhr = $.ajax({
      url: url,
      data: {
        overview: 'full',
        steps: false,
        //compression: false,
        alternatives: false
      },
      dataType: 'json'
    })
    .done(function(data) {
      _this.drawRoute(data.routes[0].geometry);
    })
    .fail(function(data) {
      console.log(data);
    });

  };

  // function distance(lat1, lon1, lat2, lon2, unit) {
  //         var radlat1 = Math.PI * lat1/180
  //         var radlat2 = Math.PI * lat2/180
  //         var theta = lon1-lon2
  //         var radtheta = Math.PI * theta/180
  //         var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  //         dist = Math.acos(dist)
  //         dist = dist * 180/Math.PI
  //         dist = dist * 60 * 1.1515
  //         if (unit=="K") { dist = dist * 1.609344 }
  //         if (unit=="N") { dist = dist * 0.8684 }
  //         return Math.round(dist);
  //     }

      // async function getDist(url) {

      //     // Storing response
      //     const response = await fetch(url);

      //     // Storing data in form of JSON
      //     var data = await response.json();
      //     if (response.status == 200){

      //      JSON.stringify(data);

      //      var dist = data.resourceSets[0].resources[0].results[0].travelDistance;
      //      $("distance").html(dist);

      //      return data;

      //     }
      //     else{
      //       return false;
      //     }

      // }

  function getDist(userlat, userlng, deviceLat, deviceLng){
    $.ajax({
      type: 'GET',
      url: 'https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins='+userlat+','+userlng+'&destinations='+deviceLat+','+deviceLng+'&travelMode=driving&key=AvqdLj-QYj2_mJ7bOclAPC9uC2KREs3WQE5MTEVYukxbBJT5ErqQ8wLYm7bLsyYf',
      cache: false,
      dataType: 'json'
    })
    .done(function(res){
      let data = JSON.stringify(res);
      let newData = JSON.parse(data);
      console.log(newData);
      let dura = timeConvert(Math.round(parseFloat(newData.resourceSets[0].resources[0].results[0].travelDuration)));

      // console.log(newData);
      $("#drive").html(newData.resourceSets[0].resources[0].results[0].travelDistance);
      $("#duration").html(dura);

    })
  }

  function timeConvert(n) {
  var num = n;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + " hour(s) and " + rminutes + " minute(s)";
  }

  var remainingDistance;
  var remainingTime;

  setInterval(function(){

    remainingDistance = parseInt($("#drive").html());
    // remainingTime = $("duration").html;

    if(remainingDistance < 1 ){
      let counter = sessionStorage.getItem('mail');
      if(parseInt(counter) == 0){
      $.ajax({
        type: 'POST',
        url: 'mail.php',
        cache: false,
        data: {
          sendMail: 'sendMail'
        }
      })
      .done(function(res){
        console.log(res);
        let data = JSON.parse(res);
        console.log(data);
        if(data[0] == "success"){
            sessionStorage.setItem("mail", 1)
            showNotification("Email Sent to User!");
        }
        else{
          console.log(data);
        }
      })
    }
    else{

    }
    }
    else{
      console.log("Still Far Away!");
    }
  }, 20000)

  function showNotification(text){
    $("#notify").html(text);
    // $("#notify").show(3000);
  }


  //
  // sessionStorage.clear()
