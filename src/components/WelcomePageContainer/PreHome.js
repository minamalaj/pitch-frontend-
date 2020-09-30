import React from 'react'
import {Link} from 'react-router-dom'
import PreHomeBtn from './PreHomeBtn'
import VideoBackground from './VideoBackground'
import './PreHome.css'

class PreHome extends React.Component { 
    render() { 
        return(
            <>
                <div className="v-header">
                    <div className="video-container">
                        <div className="fullscreen-video-wrap">
                            <VideoBackground />
                        </div>
                        <div className="video-overlay">
                            <div className="header-content">
                                <h1>PITCH IT.</h1>
                                <p>Find places to play the sport you love.</p>
                                    <Link to="/find-pitch"><PreHomeBtn onClick={() => this.handleClick()}/></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        ) 
    }
}

export default PreHome; 