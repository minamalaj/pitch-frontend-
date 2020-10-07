import React from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from 'react-google-maps';
import Autocomplete from 'react-google-autocomplete';
import Geocode from 'react-geocode';
import mapIcon from '../Images/pitchone.png'
import mapStyle from '../../mapStyle';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.enableDebug();

const options = { 
   styles: mapStyle
}

// const center = { 
//    lat: 51.311280,
//    lng: 0.051410
// }

class MapForm extends React.Component{

  state = {
   address: '',
   mapPosition: {
    lat: this.props.center.lat,
    lng: this.props.center.lng
   },
   markerPosition: {
    lat: this.props.center.lat,
    lng: this.props.center.lng
  }
 }

 componentDidMount() {
  Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng)
  .then(response => {
    const address = response.results[0].formatted_address
 
    this.setState({address: ( address ) ? address : ''})
   },
   error => {console.error(error)}
  )
 }

 shouldComponentUpdate( nextProps, nextState ){
  if (
   this.state.markerPosition.lat !== this.props.center.lat ||
   this.state.address !== nextState.address 
  ) {
   return true
  } else if ( this.props.center.lat === nextProps.center.lat ){
   return false
  }
 }

 handleChange = e => {
  this.setState({ [e.target.name]: e.target.value })
 }

 onInfoWindowClose = event => {}

 onPlaceSelected = place => {
   const address = place.formatted_address,
   latValue = place.geometry.location.lat(),
   lngValue = place.geometry.location.lng()

  this.setState({
   address: ( address ) ? address : '',
   markerPosition: {
    lat: latValue,
    lng: lngValue
   },
   mapPosition: {
    lat: latValue,
    lng: lngValue
   },
  })

  return this.props.onAddressSelect(address, latValue, lngValue)
 }

 onMarkerDragEnd = event => {
//   console.log( 'event', event );
  let newLat = event.latLng.lat(),
   newLng = event.latLng.lng()

   Geocode.fromLatLng( newLat , newLng ).then(
   response => {
    const address = response.results[0].formatted_address
    
    this.setState({address: ( address ) ? address : ''})
   },
   error => {console.error(error)}
  )

 }
 

render() {
const AsyncMap = withScriptjs(
   withGoogleMap(
    props => (
     <GoogleMap 
      google={this.props.google}
      defaultZoom={this.props.zoom}
      defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
      options={options}
     >
         <Autocomplete
         className="location-search"
         onPlaceSelected={this.onPlaceSelected}
         types={['(regions)']}
         />
         <Marker 
         google={this.props.google}
         name={'Dolores park'}
         draggable={true}
         onDragEnd={ this.onMarkerDragEnd }
         position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
         icon={{
            url: mapIcon,
            scaledSize: new window.google.maps.Size(30, 30), 
            origin: new window.google.maps.Point(0, 0), 
            anchor: new window.google.maps.Point(15, 15)
               }}
         />   
      {/* <Marker /> */}
      </GoogleMap> )))

      let map;
      if (this.props.center.lat !== undefined) {
         map = 
          <>
            <AsyncMap
               googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
               loadingElement={ <div style={{ height: `100%` }} /> }
               containerElement={ <div style={{ height: this.props.height }} /> }
               mapElement={ <div style={{ height: `100%` }} /> }
            />
            {/* <br />
            <br />
            <br /> */}
          </>
         } else {
            map = <div style={{height: this.props.height}} />
         }
            return (map)
      }
}


export default MapForm;