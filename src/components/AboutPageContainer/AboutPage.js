import React from 'react'; 
import NavBar from './NavBar'
import './AboutPage.css'

class AboutPage extends React.Component { 
    render()  { 
        return (
            <>
              <NavBar />
                <div className="about-container">
                    <div className="about-shaped"></div>
                        <div className="about-content">
                            <h1 className="about-header">About us</h1>
                                <div className="title-under"></div>
                                <div className="about-paragraph">
                                <p className="paragraph-style">
                                    Pitch It evolved as a passion project - from travelling the world with a patchy Roma ball, trying to find places and spaces to practice the sport I love. As an idea, it was born from a place of wanting - wanting to connect with people around a seemingly inconsequential ball of plastic - but always so much more than that. I hope it continues to develop along that ethos.  
                                    This website was designed to be an open-source/ crowd-sourced project. Any and all contributions are welcome - whether pitch or development related. 
                                    We look forward to hearing from you, and welcome to our little community.  
                                </p>
                            </div>
                      </div>
                </div>
            </>
        ) 
    }
}

export default AboutPage; 


