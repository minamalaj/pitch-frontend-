import React from 'react'
import {Grid} from 'semantic-ui-react'
import {GiStreetLight} from 'react-icons/gi'
import {RiParkingBoxLine} from "react-icons/ri"
import './PitchCard.scss'

const PitchCard = props => { 
    const pitch = props.pitch 

    return (
        <>
            <div class="shape">
                <div class="shape-l-big"></div>
                <div class="shape-l-med"></div>
                    <div class="shape-l-small">
                        <div class="shape-text">
                            <Grid>
                                <Grid.Row columns={1} textAlign='center'>
                                    <Grid.Column className="title-pitch-card">
                                        <p className="title-pitch-header"><strong>{pitch.name}</strong></p>
                                        <p className="title-pitch-address">{pitch.address}</p>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid columns={2} divided>
                                      <p className="title-pitch-text"><strong>Pitch Ameneties</strong></p>
                                        <Grid.Column>
                                                {pitch.floodlights ? <GiStreetLight style={{height: "30px", width: "30px" }} />: <div className="card-novalue"></div> }
                                        </Grid.Column>
                                        <Grid.Column>
                                                {pitch.parking ? <RiParkingBoxLine style={{height: "30px", width: "30px" }}/> : <div className="card-novalue"></div> }
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Row>
                            <Grid.Row>
                                <Grid columns={3} divided className="title-pitch-text">
                                    <Grid.Column>
                                            <p><strong>Surface</strong></p><p>{pitch.surface}</p> 
                                    </Grid.Column>
                                    <Grid.Column>
                                        <p><strong>Size</strong></p><p>{pitch.size}</p>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <p><strong>Space</strong></p><p>{pitch.space}</p>
                                    </Grid.Column>
                                </Grid>
                            </Grid.Row>
                            </Grid>
                        </div>
                </div>
		    </div>
        </>
    )
   


}

export default PitchCard; 

