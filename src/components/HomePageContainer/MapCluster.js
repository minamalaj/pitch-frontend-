import React, {useState, useRef} from 'react'
import useSwr from 'swr'
import GoogleMapReact from 'google-map-react'
import useSupercluster from 'use-supercluster'
import mapStyle from '../../mapStyle'
import mapIcon from '../Images/pitchone.png'
import Location from './Location'
import LoadingPage from './LoadingPage'
import './MapCluster.css'

const pitchesURL = "http://localhost:3000/pitches"

const fetcher = (...args) => fetch(...args).then(resp => resp.json())

const mapContainerStyle = { 
    height: "70vh", 
    width: "100vw"
}

const center = {  
    lat: 51.311280,
    lng: 0.051410
}

const options = { 
    styles: mapStyle
}

const Marker = ({children}) => children; 

const MapCluster = () => { 

    const mapRef = useRef(); 
    const [zoom, setZoom] = useState(10); 
    const [bounds, setBounds] = useState(null)
 
    const {data, error} = useSwr(pitchesURL, {fetcher})
    const footballPitches = data && !error ? data : []

    const authorisedPitches = () => footballPitches.filter(pitch => pitch.authorized === true)

    const points = authorisedPitches().map(pitch => ({
      type: "Feature",
      properties: { cluster: false, pitchId: pitch.id, name: pitch.name },
      geometry: {
        type: "Point",
        coordinates: [
            pitch.longitude,
            pitch.latitude
        ]
  } 
}));
    
    const {clusters, supercluster} = useSupercluster({ 
        points, 
        bounds,
        zoom, 
        options: {radius: 75, maxZoom: 40}
    })
    
    const panTo = React.useCallback(({lat, lng}) => { 
        mapRef.current.panTo({lat, lng})
        mapRef.current.setZoom(14)
    }, []);

    if (error) return <h3>Failed to load</h3>
    if (!data) return (
          // <Dimmer active>
          //   <Loader size='huge'>Loading</Loader>
          // </Dimmer>
          <LoadingPage />
        ) 
    
    return (
        <div style={{ height: '90vh', width: '100%' }}>
            <GoogleMapReact 
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                mapContainerStyle={mapContainerStyle} 
                defaultZoom={10} 
                defaultCenter={center}
                options={options}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map }) => {
                    mapRef.current = map;
                  }}
                onChange={({ zoom, bounds }) => {
                    setZoom(zoom);
                    setBounds([
                      bounds.nw.lng,
                      bounds.se.lat,
                      bounds.se.lng,
                      bounds.nw.lat
                    ]);
                  }}>
            {clusters.map(cluster => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const {
                cluster: isCluster,
                point_count: pointCount
                    } = cluster.properties;    
                
            if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                lat={latitude}
                lng={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (pointCount / points.length) * 40}px`,
                    height: `${10 + (pointCount / points.length) * 40}px`
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    mapRef.current.setZoom(expansionZoom);
                    mapRef.current.panTo({ lat: latitude, lng: longitude });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }
          else {
          return (
            <Marker
              key={`crime-${cluster.properties.pitchId}`}
              lat={latitude}
              lng={longitude}
            >
              <button className="pitch-marker">
                <img src={mapIcon} alt="" />
              </button> 
            </Marker>
          );
          } 
        })}
         <Location panTo={panTo} /> 
            </GoogleMapReact>
        </div>
    )
}

export default MapCluster; 