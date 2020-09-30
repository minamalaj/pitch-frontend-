import React from 'react'
// import Video from './FootballVid.ts'

class VideoBackground extends React.Component { 
    render() { 
        return(
            <>
                <video autoPlay loop muted id='background-video'>
                    <source src={Video} type='video/mp4' />
                        Your browser does not support the video tag.
                </video>
            </>
        ) 
    }
}

export default VideoBackground; 