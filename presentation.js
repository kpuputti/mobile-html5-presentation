/*global google */

(function () {

    var map;

    function locateMe(e) {
        e.preventDefault();
        var mapElem = document.getElementById('map');
        var sizeFactor = 0.3;
        mapElem.style.height = Math.round(sizeFactor * window.innerHeight) + 'px';

        // Create map if not already done
        if (!map) {
            map = new google.maps.Map(mapElem, {
                zoom: 5,
                center: new google.maps.LatLng(60.1695867, 24.9384787),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
        }

        // Center map to the current position

        if (!navigator.geolocation) {
            alert("Geolocation not supported :(");
            return;
        }

        navigator.geolocation.getCurrentPosition(function (pos) {
            var latlng = new google.maps.LatLng(pos.coords.latitude,
                                                pos.coords.longitude);
            map.panTo(latlng);
            map.setZoom(14);

            var note = document.getElementById('geolocation-note');

            window.setTimeout(function () {
                note.style.display = 'block';
            }, 1000);

        }, function () {
            alert('Could not get location :(');
        });
    }

    function init() {
        var locateButton = document.getElementById('locate-me');
        locateButton.addEventListener('click', locateMe);
    }

    window.addEventListener('DOMContentLoaded', init);
}());
