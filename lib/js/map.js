function setGMap() {

    //var totalDons = 312;
    var totalDons = 0;

    $.ajax({
        type: "GET",
        url: "https://dons.fondationdefrance.org/api/counter/get?user_api=ufondfranceapi&pwd_api=z37RqwQ3&frequency=once&campaigns[]=1&campaigns[]=5&campaigns[]=212&campaigns[]=214&campaigns[]=296&when=2018-12",
        success: function (data) {
            var total = data.split('|');
            total = total[0];
            total = total.split(';');
            totalDons += parseInt(total[1]);
            if (totalDons > 999) $('.round-count .count1').remove();
            if (totalDons > 0) $('.round-count .count').html(totalDons).lettering();

        }
    });

    $.ajax({
        type: "GET",
        url: "https://dons.fondationdefrance.org/api/counter/get?user_api=ufondfranceapi&pwd_api=z37RqwQ3&frequency=once&campaigns[]=1&campaigns[]=5&campaigns[]=212&campaigns[]=214&campaigns[]=296&when=2018-11",
        success: function (data) {
            var total = data.split('|');
            total = total[0];
            total = total.split(';');
            totalDons += parseInt(total[1]);

            if (totalDons > 999) $('.round-count .count1').remove();
            if (totalDons > 0) $('.round-count .count').html(totalDons).lettering();
        }
    });




    // Create an array of styles.
    var styles = [{"featureType": "road", "stylers": [{"visibility": "off"}]}, {
        "featureType": "administrative",
        "stylers": [{"visibility": "off"}]
    }, {"featureType": "landscape", "stylers": [{"visibility": "off"}]}, {
        "featureType": "poi",
        "stylers": [{"visibility": "off"}]
    }, {"elementType": "geometry", "stylers": [{"color": "#2cc29e"}]}, {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [{"visibility": "off"}]
    }, {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#2cc29e"}, {"visibility": "on"}, {"weight": 2.3}]
    }, {}, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{"visibility": "on"}, {"color": "#13765d"}]
    }];

    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
    var styledMap = new google.maps.StyledMapType(styles);
    geocoder = new google.maps.Geocoder();


    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var mapOptions = {
        zoom: 6,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        },
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },

        disableDefaultUI: false
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var address = 'France';
    var marker = new Array;
    var marker1 = new Array;
    var total = 0;

    geocoder.geocode({'address': address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
    $.ajax({
        type: 'POST',
        url: 'lib/php/functions.php?' + Math.round(new Date().getTime()),
        data: {
            what: 'getMarkers'
        },
        dataType: 'json',
        success: function (data) {

            total = data.length;
            function addMarker(i) {
                var icon = 'blue-marker';

                if ((typeof(data[i]) != 'undefined' && data[i].locationAPI != null)) {
                    var latlng = new google.maps.LatLng(data[i].locationAPI[0], data[i].locationAPI[1]);
                    marker[i] = new google.maps.Marker({
                        map: map,
                        position: latlng,
                        icon: 'lib/img/' + icon + '.png',
                    });

                    if (data[i].name != '') {
                        var infowindow = new google.maps.InfoWindow({
                            content: data[i].name
                        });

                        marker[i].addListener('click', function () {
                            infowindow.open(map, marker[i]);
                            
                        });
                    }
                    if (i == total - 1)
                        return;

                    addMarker(i + 1);
                }
                else {
                    if (typeof(data[i]) != 'undefined') {
                        geocoder.geocode({'address': data[i].cp}, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                                setTimeout(function () {
                                    addMarker(i);
                                }, 2000);
                            }
                            else {
                                if (results != null) {
                                    var loc = [];

                                    if (results.length > 0) {
                                        loc[0] = results[0].geometry.location.lat();
                                        loc[1] = results[0].geometry.location.lng();
                                        marker[i] = new google.maps.Marker({
                                            map: map,
                                            position: results[0].geometry.location,
                                            icon: 'lib/img/' + icon + '.png',
                                        });

                                        if (data[i].name != '') {
                                            var infowindow = new google.maps.InfoWindow({
                                                content: data[i].name
                                            });

                                            marker[i].addListener('click', function () {
                                                infowindow.open(map, marker[i]);
                                            });
                                        }
                                    }
                                    else {
                                        loc[0] = "";
                                        loc[1] = "";
                                    }

                                    $.ajax({
                                        type: 'POST',
                                        url: 'lib/php/functions.php?' + Math.round(new Date().getTime()),
                                        data: {
                                            what: 'setMarker',
                                            id: data[i].id,
                                            location: loc
                                        }
                                    });


                                }

                                if (i == total - 1)
                                    return;

                                addMarker(i + 1);
                            }
                        });
                    }
                }
            }

            addMarker(0);
        },
        error: function (data) {
            console.log(data);
        }
    });
    $.ajax({
        type: 'POST',
        url: 'lib/php/functions.php?' + Math.round(new Date().getTime()),
        data: {
            what: 'getMarkersDon'
        },
        dataType: 'json',
        success: function (data) {
            total = data.length;
            function addMarker(i) {
                var icon = 'red-marker';

                if (typeof(data[i]) != 'undefined' && data[i].locationAPI != null) {
                    var latlng = new google.maps.LatLng(data[i].locationAPI[0], data[i].locationAPI[1]);
                    marker1[i] = new google.maps.Marker({
                        map: map,
                        position: latlng,
                        icon: 'lib/img/' + icon + '.png',
                    });

                    if (data[i].name != '') {
                        var infowindow = new google.maps.InfoWindow({
                            content: data[i].name
                        });

                        marker1[i].addListener('click', function () {
                            infowindow.open(map, marker1[i]);
                        });
                    }
                    if (i == total - 1)
                        return;

                    addMarker(i + 1);
                }
                else {
                    if (typeof(data[i]) != 'undefined') {
                        geocoder.geocode({'address': data[i].cp}, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                                setTimeout(function () {
                                    addMarker(i);
                                }, 2000);
                            }
                            else {
                                if (results != null) {
                                    var loc = [];

                                    if (results.length > 0) {
                                        loc[0] = results[0].geometry.location.lat();
                                        loc[1] = results[0].geometry.location.lng();
                                        marker1[i] = new google.maps.Marker({
                                            map: map,
                                            position: results[0].geometry.location,
                                            icon: 'lib/img/' + icon + '.png',
                                        });

                                        if (data[i].name != '') {
                                            var infowindow = new google.maps.InfoWindow({
                                                content: data[i].name
                                            });

                                            marker1[i].addListener('click', function () {
                                                infowindow.open(map, marker1[i]);
                                            });
                                        }
                                    }
                                    else {
                                        loc[0] = "";
                                        loc[1] = "";
                                    }

                                    $.ajax({
                                        type: 'POST',
                                        url: 'lib/php/functions.php?' + Math.round(new Date().getTime()),
                                        data: {
                                            what: 'setMarkerDON',
                                            id: data[i].id,
                                            location: loc
                                        }
                                    });


                                }

                                if (i == total - 1)
                                    return;

                                addMarker(i + 1);
                            }
                        });
                    }
                }
            }

            addMarker(0);
        },
        error: function (data) {
            console.log(data);
        }
    });


    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

//    $('.map-container').parent().height($('.map-container').height());

}