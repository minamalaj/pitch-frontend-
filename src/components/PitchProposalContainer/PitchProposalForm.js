import React from 'react'; 
import NavBar from '../NavBarContainer/NavBar'
import MapForm from './MapForm'
import { Header, Button, Form, Modal, Input, Radio, Grid, Icon, Popup  } from 'semantic-ui-react'
import {TimeInput} from 'semantic-ui-calendar-react';
import API from '../../API';
import './FormShape.scss'

const siteSuggestionURL = "http://localhost:3000/suggest-site"

class PitchProposalForm extends React.Component { 
    
    initialState = { 
        name: "",
        address: "", 
        openingTime: "", 
        closingTime: "",
        floodlights: false,
        parking: false,
        surface: "", 
        size: "", 
        space: "", 
        latitude: null,
        longitude: null
    }

    state = this.initialState

    handleTimeChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
      }

    handleChange = e => { 
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCheckSurface = (e, { surface }) => this.setState({ surface })
    
    handleCheckSize = (e, { size }) => this.setState({ size })

    handleCheckSpace = (e, { space }) => this.setState({ space })

    handleCheckBoxCheck = e => { 
        const name = e.target.name; 
        if (name === 'floodlights') {
            this.setState({floodlights: !this.state.floodlights}) 
        } 
        if (name === 'parking') {
            this.setState({parking: !this.state.parking })
        }
    }

    handleSubmit = e => { 
        e.preventDefault() 
        
        const {name, address, openingTime, closingTime, floodlights, parking, surface, size, space, latitude, longitude} = this.state
        
        const newPitch = { 
            name,
            address,
            openingTime,
            closingTime,
            floodlights,
            parking,
            surface,
            size,
            space, 
            latitude, 
            longitude
        }

        API.postFetch(siteSuggestionURL, newPitch)
        .then(resp => resp.json())
        .then(data => console.log(data)) 
        .catch(error => console.log(error))
    }

    handleAddressSelect = (addressValue, latValue, lngValue) => { 
        // console.log(addressValue)
        this.setState({
            address: addressValue, 
            latitude: latValue,
            longitude: lngValue
        })
    }

    handleFormReset = () => {this.setState(() => this.initialState)}

    render() { 
        const {name, address, openingTime, closingTime, floodlights, parking, surface, size, space } = this.state
        
        const center = { 
            lat: 51.311280,
            lng: 0.051410
         }

        return ( 
            <>
              <NavBar />
                <Grid divided='vertically'>
                <Grid.Row centered columns={1}>
                    <div className="map-suggest">
                        <MapForm 
                        google={this.props.google}
                        center={center}
                        height='80vh'
                        width='300px'
                        zoom={15}
                        onAddressSelect={this.handleAddressSelect}
                        />
                    </div>
                </Grid.Row>
                <Grid.Row columns={1} className="pitch-form">
                    <div class="form-shape" >
                    <div class="form-shape-l-big"></div>
                    <div class="form-shape-l-med"></div>
                    <div class="form-shape-l-small">
                    <div class="form-shape-text">
                        <h1>Submit a pitch proposal</h1>
                <Form centered 
                    onSubmit={this.handleSubmit}
                    onReset={this.handleFormReset} >
                    <Form.Group className="form-fields-input" >
                        <Form.Field 
                            style={{width: "450px"}}
                            control={Input}
                            name='name'
                            label='Pitch Name'
                            placeholder='Name'
                            value={name}
                            onChange={this.handleChange}
                        />
                        <Popup pinned on='click' trigger={<Icon name='question circle' size='small'/>} wide>
                            If a pitch does not have an official name, please submit the name of area within which it is located - followed by 'pitch' (e.g. Finsbury Pitch)
                        </Popup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field
                            style={{width: "450px"}}
                            label='Pitch Address'
                            control={Input}
                            name='address'
                            placeholder='Address'
                            value={this.state.address}
                            onChange={this.handleChange}/>
                        <Popup pinned on='click' trigger={<Icon name='question circle' size='small' />}>
                            When entering a pitch location, try to be as specific as possible.
                        </Popup>
                    </Form.Group>
                    <Form.Group className="form-fields" >
                        <div>
                            <label style={{fontSize: "14px"}}><strong>Pitch Ameneties</strong></label>
                        </div>
                            <label className="form-fields-ameneties">Floodlights</label> 
                                <input className="form-fields-ameneties-input"
                                type="checkbox"
                                name="floodlights"
                                onChange={this.handleCheckBoxCheck}
                                checked={floodlights}
                                />
                            <label className="form-fields-ameneties">Parking</label>
                                <input className="form-fields-ameneties-input"
                                type="checkbox"
                                name="parking"
                                onChange={this.handleCheckBoxCheck}
                                checked={parking}
                                /> 
                    </Form.Group>
                    <Form.Group className="form-fields" >
                        <label><strong>Pitch Hours</strong></label>
                            <TimeInput
                                name="openingTime"
                                placeholder="Opening time"
                                value={openingTime}
                                iconPosition="left"
                                onChange={this.handleTimeChange}
                            />
                            <TimeInput
                                name="closingTime"
                                placeholder="Closing time"
                                value={closingTime}
                                iconPosition="left"
                                onChange={this.handleTimeChange}
                            />
                    </Form.Group> 
                    <Form.Group inline className="form-fields">
                        <label>Space</label>
                            <Form.Field
                                control={Radio}
                                label='Indoor'
                                space='indoor'
                                checked={space === 'indoor'}
                                onChange={this.handleCheckSpace}
                            />
                            <Form.Field
                                control={Radio}
                                label='Outdoor'
                                space='outdoor'
                                checked={space === 'outdoor'}
                                onChange={this.handleCheckSpace}
                            />
                    </Form.Group>
                    <Form.Group inline className="form-fields">
                        <label>Surface</label>
                            <Form.Field
                                control={Radio}
                                label='Astroturf'
                                surface = 'astroturf'
                                checked={surface === 'astroturf'}
                                onChange={this.handleCheckSurface}
                            />
                            <Form.Field
                                control={Radio}
                                label='Grass'
                                surface='grass'
                                checked={surface === 'grass'}
                                onChange={this.handleCheckSurface}
                            />
                            <Form.Field
                                control={Radio}
                                label='Gravel'
                                surface='gravel'
                                checked={surface === 'gravel'}
                                onChange={this.handleCheckSurface}
                            />
                            <Form.Field
                                control={Radio}
                                label='Other'
                                surface='other'
                                checked={surface === 'other'}
                                onChange={this.handleCheckSurface}
                            />
                    </Form.Group>
                    <Form.Group inline className="form-fields">
                        <label>Size</label>
                            <Form.Field
                                control={Radio}
                                label='Small'
                                size='small'
                                checked={size === 'small'}
                                onChange={this.handleCheckSize} />
                            <Form.Field
                                control={Radio}
                                label='Medium'
                                size='medium'
                                checked={size === 'medium'}
                                onChange={this.handleCheckSize}
                            />
                            <Form.Field
                                control={Radio}
                                label='Large'
                                size='large'
                                checked={size === 'large'}
                                onChange={this.handleCheckSize}
                            />
                    
                    {address === "" || name === "" ? 
                        <Modal size="tiny" trigger={<Button>Submit Pitch Request</Button>} closeIcon>
                            <Header icon='expand' content='Fill out the empty fields' />
                                <Modal.Content>
                                    <h4>Uh oh, it looks like you left a couple of fields empty there.</h4>
                                </Modal.Content>
                        </Modal>
                    :
                        <Modal size="small" trigger={<Button>Submit Pitch Reqest</Button>} closeIcon>
                            <Header icon='handshake outline' content='Thank you for your submission' />
                                <Modal.Content>
                                    <h4>It will take us a few days to verify the pitch you have submitted - visit our site again in a couple of days to see whether your request has been approved.</h4>
                                </Modal.Content>
                        </Modal> 
                    } 
                    </Form.Group>
                </Form> 
              </div>  
            </div>
          </div> 
        <div>                    
      </div>
    </Grid.Row>
  </Grid>
 </>
)}}

export default PitchProposalForm; 


       