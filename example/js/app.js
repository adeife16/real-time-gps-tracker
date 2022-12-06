   /**
   *  Example app to show leaflet-routerbox
   *
   *
   **/
    sessionStorage.setItem("start", 0);
   sessionStorage.setItem("mail", 0);


  // $("#action").click(function(e){
  //   e.preventDefault();
  //   let check = sessionStorage.getItem("start");
  //   if(check == 0){
  //     sessionStorage.setItem("start", 1);
  //     $(this).removeClass("green");
  //     $(this).addClass("red");
  //     $(this).html("STOP");
  //   }
  // })
      // api url
      // const api_url = "https://api.thingspeak.com/channels/1848228/fields/1.json?api_key=C0J8MFW97TT7W612&results=1";
      var channel;
      var feed;
      var newLatLng;
      var marker;
      var popup;

      let coords = [
        {
            "lat": 6.896599081610059,
            "lng": 2.9821604490280156
        },
        {
            "lat": 6.896492569525503,
            "lng": 2.9819566011428833
        },
        {
            "lat": 6.896348778173391,
            "lng": 2.9819566011428833
        },
        {
            "lat": 6.896151730694029,
            "lng": 2.9819566011428833
        },
        {
            "lat": 6.89599728801779,
            "lng": 2.9819673299789433
        },
        {
            "lat": 6.895731007423255,
            "lng": 2.981951236724854
        },
        {
            "lat": 6.895464726679069,
            "lng": 2.9819673299789433
        },
        {
            "lat": 6.895283655687534,
            "lng": 2.9819566011428833
        },
        {
            "lat": 6.8950546540403215,
            "lng": 2.9819405078887944
        },
        {
            "lat": 6.894964118474836,
            "lng": 2.9821765422821045
        },
        {
            "lat": 6.894942815986332,
            "lng": 2.9824393987655644
        },
        {
            "lat": 6.894719139799169,
            "lng": 2.9825037717819214
        },
        {
            "lat": 6.894601976039947,
            "lng": 2.982519865036011
        },
        {
            "lat": 6.894447532858521,
            "lng": 2.9825037717819214
        },
        {
            "lat": 6.894266461478271,
            "lng": 2.982519865036011
        },
        {
            "lat": 6.894133320713341,
            "lng": 2.9825466871261597
        },
        {
            "lat": 6.893893667242234,
            "lng": 2.982573509216309
        },
        {
            "lat": 6.893675316196351,
            "lng": 2.982589602470398
        },
        {
            "lat": 6.893414359936406,
            "lng": 2.9826217889785767
        },
        {
            "lat": 6.8933451266188355,
            "lng": 2.9826378822326665
        },
        {
            "lat": 6.893137426605424,
            "lng": 2.9826647043228154
        },
        {
            "lat": 6.892924400856096,
            "lng": 2.982653975486756
        },
        {
            "lat": 6.892748654540818,
            "lng": 2.982675433158875
        },
        {
            "lat": 6.892556931213457,
            "lng": 2.982696890830994
        },
        {
            "lat": 6.89234923085465,
            "lng": 2.9828524589538574
        },
        {
            "lat": 6.892333253900199,
            "lng": 2.983093857765198
        },
        {
            "lat": 6.8923226025969475,
            "lng": 2.9833298921585087
        },
        {
            "lat": 6.892333253900199,
            "lng": 2.9835498332977295
        },
        {
            "lat": 6.8923226025969475,
            "lng": 2.983721494674683
        },
        {
            "lat": 6.892317276945214,
            "lng": 2.983887791633606
        },
        {
            "lat": 6.892333253900199,
            "lng": 2.984000444412232
        },
        {
            "lat": 6.892338579551742,
            "lng": 2.984257936477661
        },
        {
            "lat": 6.892317276945214,
            "lng": 2.9845529794692993
        },
        {
            "lat": 6.892327928248606,
            "lng": 2.984767556190491
        },
        {
            "lat": 6.892327928248606,
            "lng": 2.9849874973297124
        },
        {
            "lat": 6.892327928248606,
            "lng": 2.9852771759033208
        },
        {
            "lat": 6.892301299989682,
            "lng": 2.985513210296631
        },
        {
            "lat": 6.892301299989682,
            "lng": 2.9857116937637334
        },
        {
            "lat": 6.892306625641593,
            "lng": 2.985899448394776
        },
        {
            "lat": 6.892290648685705,
            "lng": 2.9861676692962646
        },
        {
            "lat": 6.892264020424707,
            "lng": 2.986446619033814
        },
        {
            "lat": 6.892248043467381,
            "lng": 2.9866343736648564
        },
        {
            "lat": 6.892237392162208,
            "lng": 2.986891865730286
        },
        {
            "lat": 6.8922320665095205,
            "lng": 2.9870527982711796
        },
        {
            "lat": 6.892221415203991,
            "lng": 2.987240552902222
        },
        {
            "lat": 6.892226740856781,
            "lng": 2.987433671951294
        },
        {
            "lat": 6.892210763898208,
            "lng": 2.9876375198364262
        },
        {
            "lat": 6.892200112592196,
            "lng": 2.9878306388854985
        },
        {
            "lat": 6.892200112592196,
            "lng": 2.9880988597869873
        },
        {
            "lat": 6.892221415203991,
            "lng": 2.988340258598328
        },
        {
            "lat": 6.892237392162208,
            "lng": 2.988495826721192
        },
        {
            "lat": 6.892253369119878,
            "lng": 2.9886567592620854
        },
        {
            "lat": 6.892285323033628,
            "lng": 2.9888337850570683
        },
        {
            "lat": 6.89234923085465,
            "lng": 2.9891234636306763
        },
        {
            "lat": 6.8921681586727095,
            "lng": 2.9892253875732426
        },
        {
            "lat": 6.89197643511056,
            "lng": 2.9892468452453618
        }
      ]
      // navigator.geolocation.getCurrentPosition(showPosition);

      function showPosition(){
        let latitude = 6.892301;
        let longitude = 2.989188;

        // let latitude = coords[0].lat;
        // let longitude = coords[0].lng;


      sessionStorage.setItem("userLat", latitude);
      sessionStorage.setItem("userLng", longitude);

      sessionStorage.setItem("userLatLng", latitude+','+longitude);
    }
    var deviceLat;
    var deviceLng;


    function getCoords(pos){
      let deviceLat = coords[pos].lat
      let deviceLng = coords[pos].lng

      sessionStorage.setItem("deviceLat", deviceLat);
      sessionStorage.setItem("deviceLng", deviceLng);


    }


  function App() {

    var userlat = sessionStorage.getItem("userLat");
    var userlng = sessionStorage.getItem("userLng");
    var deviceLat = sessionStorage.getItem("deviceLat");
    var deviceLng = sessionStorage.getItem("deviceLng");


    this.route =  [];
    this.map = L.map('map').setView([userlat, userlng],6);
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

    // this.map.on('click', function(e) {
    // console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
    // coords.push({
    //   'lat': e.latlng.lat,
    //   'lng': e.latlng.lng
    // })
    // });

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
    let i = 0;
    let checkStart;
    setInterval(function(){
      checkStart = sessionStorage.getItem("start")
      if(checkStart == 1){

      let get_api = getCoords(i);
          deviceLat = sessionStorage.getItem("deviceLat");
          deviceLng = sessionStorage.getItem("deviceLng");
          newLatLng = [parseFloat(deviceLat), parseFloat(deviceLng)];
          marker.setLatLng(newLatLng);
          console.log("done");
          // L.marker([deviceLat, deviceLng]).addTo(this.map);
          getDist(userlat, userlng, deviceLat, deviceLng);

          i++;
      }

      }, 15000);
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

  function start(){
    sessionStorage.setItem("start", 1);
  }
  function stop(){
    sessionStorage.setItem("start", 0);

  }

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

// get distance using routes
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
  let checkStart;

  setInterval(function(){
    checkStart = sessionStorage.getItem("start")
    if(checkStart == 1){

    remainingDistance = parseFloat($("#drive").html());
    // remainingTime = $("duration").html;

    if(remainingDistance < 0.5 ){
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
  }
  }, 20000)

  function showNotification(text){
    $("#notify").html(text);
    // $("#notify").show(3000);
  }


  //
  // sessionStorage.clear()


      // Defining async function
      // async function getapi(url) {

      //     // Storing response
      //     const response = await fetch(url);

      //     // Storing data in form of JSON
      //     var data = await response.json();
      //     if (response.status == 200){
      //         var lastEntry = data.channel.last_entry_id;

      //         var lastPos = data.feeds[0].field1;
      //         sessionStorage.setItem("lastPos", lastPos);
      //         // console.log(lastPos);
      //         deviceLat = lastPos.split(",")[0];
      //         deviceLng = lastPos.split(",")[1];
      //         sessionStorage.setItem("deviceLat", deviceLat);
      //         sessionStorage.setItem("deviceLng", deviceLng);
      //         return true;
      //     }
      //     else{
      //       return false;
      //     }

      // }
      // Calling that async function
      // getapi(api_url);
