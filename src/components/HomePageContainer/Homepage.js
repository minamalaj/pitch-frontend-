import React from 'react'; 
import {Grid} from 'semantic-ui-react'
import PitchCard from './PitchCard';
import NavBar from '../NavBarContainer/NavBar'
import FilterSideBar from './FilterSideBar';
import API from '../..//API'
import './HomeBrowseBtn.scss'

const pitchesURL = "http://localhost:3000/pitches"

class Homepage extends React.Component { 

    state = { 
        pitches: [], 
        loadPitches: false,
        isFlipped: false, 
        locateMe: false
    }

    componentDidMount() {
        API.get(pitchesURL)
        .then(resp => resp.json())
        .then(data => this.setState({ 
            pitches: data
        })) } 

    updatePitches = (pitches) => { 
        this.setState({pitches})
    }

    renderPitches = () => { 
        this.setState({
            loadPitches: !this.state.loadPitches
        })
    }
    
    handleClick = e => {
        e.preventDefault();
        this.setState(prevState => ({isFlipped: !prevState.isFlipped }))}

    showPitches = pitches => { 
        const filteredPitches = pitches.filter(pitch => pitch.authorized )
        return filteredPitches.map(pitch =>  
            <PitchCard key={pitch.id} pitch={pitch} />
        )   
    }


    render() { 
        const {pitches, loadPitches} = this.state
       
        return ( 
            <>
              <NavBar />
                <Grid divided='vertically'>
                    <Grid.Row centered columns={1}>
                        <div className="map">
                            <FilterSideBar updatePitches={this.updatePitches} pitches={pitches} float="left"/>
                                <div className="clean-homepage">
                                <div id="prac-container">
                                    <button className="browse-button learn-more" onClick={() => this.renderPitches()}>
                                        <span className="circle" aria-hidden="true">
                                            <span className="icon arrow"></span>
                                        </span>
                                        <span className="button-text">Browse Pitches</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        {loadPitches ? this.showPitches(pitches) : null}
                    </Grid.Row>
                </Grid>
            </>
        )
    }
}

export default Homepage; 

