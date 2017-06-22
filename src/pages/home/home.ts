import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

// Native Componets
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat: number;
  lng: number;
  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, private platform: Platform, private geolocation: Geolocation) {
    platform.ready().then(() => {
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        this.lat = resp.coords.latitude;
        // resp.coords.longitude
        this.lng = resp.coords.longitude;
        this.loadMap();
      }).catch((error) => {
        console.log('Error getting location', error);
      });

    });
  }



  loadMap() {
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
    let map: GoogleMap = this.googleMaps.create(element);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!', map.getMyLocation());
        // Now you can add elements to the map like the marker
      }
    );

    // create LatLng object
    let loc: LatLng = new LatLng(this.lat, this.lng);

    // create CameraPosition
    let position: CameraPosition = {
      target: loc,
      zoom: 15,
      tilt: 30
    };

    // move the map's camera to position
    map.moveCamera(position);

    // create new marker
    let markerOptions: MarkerOptions = {
      position: loc,
      title: 'La Plata is here!'
    };

    map.addMarker(markerOptions)
      .then((marker: Marker) => {
        marker.showInfoWindow();
      });
  }

}
