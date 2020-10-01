import React from 'react'; 
import {Button} from 'semantic-ui-react'

const Location = ({panTo}) => { 

    return (
        <>
          <div className="location">
            <Button color="green" size="massive" circular icon='location arrow' onClick={() => { 
                navigator.geolocation.getCurrentPosition(position => { 
                    panTo({
                        lat: position.coords.latitude, 
                        lng: position.coords.longitude
                    })}, () => null)
                }} 
            />
          </div>
        </>
    )
}

export default Location; 