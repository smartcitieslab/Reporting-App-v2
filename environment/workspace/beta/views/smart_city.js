 function initialize() {
                // init map
                var myOptions = {
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(document.getElementById("map"), myOptions);

                // init directions service
                var dirService = new google.maps.DirectionsService();
                var dirRenderer = new google.maps.DirectionsRenderer({
                  suppressMarkers: true,
                     polylineOptions: {
                    strokeColor: "red"
    }
                });
                dirRenderer.setMap(map);

                // highlight a street
                var Pothole = {
                    origin: "40.427322, -86.910334",
                    destination: "40.424090, -86.910367",
                    travelMode: google.maps.TravelMode.DRIVING
                };
                dirService.route(Pothole, function(result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        dirRenderer.setDirections(result);
                    }
                });
            }