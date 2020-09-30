import React from 'react'; 
import API from '../../API'
import LoginForm from './LoginForm'
import AdminDashboard from './AdminDashboard'
import {Menu, Segment} from 'semantic-ui-react'

const pitchesURL = "http://localhost:3000/pitches"

class AdminDashboardContainer extends React.Component { 

    state = { 
        username: "", 
        password: "", 
        loggedIn: false, 
        pitches: [], 
        activeItem: 'home'
    }

    handleChange = e => { 
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  

    handleLogin = e => {
        e.preventDefault()


        API.login(this.state)
          .then(json => {
            this.setState({
                loggedIn: true 
            })
            return this.login(json.username, json.token)
        })
    }

    login = (username, token) => {
        this.setState({
          loggedIn: true
        })
        localStorage.token = token
      }
    
      logout = () => {
        this.setState({
          loggedIn: false
        })
        localStorage.removeItem("token")
      }

    componentDidMount() { 
        if (localStorage.token) {
            API.validate(localStorage.token)
              .then(json => this.login(json.username, json.token))
          }
          this.getPitches()
        }
    
    getPitches = () => { 
        API.get(pitchesURL)
        .then(resp => resp.json())
        .then(data => this.setState({pitches: data}))
    } 

    deletePitch = pitchObject => { 
        const pitches = this.state.pitches

        API.deletePitchWithToken(pitchObject)
        .then(resp => resp.json())
        .then(data => this.setState({
            pitches: pitches.filter(pitch => pitch !== pitchObject )
        }))
        .catch(error => console.log(error))
    }

    acceptPitch = pitch => { 
        const newPitchObject = {...pitch}
        newPitchObject.authorized = !newPitchObject.authorized

        API.patchPitchWithToken(newPitchObject)
        .then(resp => resp.json())
        .then(this.getPitches) 
        .catch(error => console.log(error))
    }

     addToAuthorizedContainer = () => { 
        return this.state.pitches.filter(pitch => pitch.authorized)

    }

    keepInUnauthorized = () => { 
        return this.state.pitches.filter(pitch => !pitch.authorized)
    }

 
    render() { 
        const { username, password, activeItem} = this.state 
        return (
            <>
            {this.state.loggedIn ? (
                <>
                <div>
                    <h1
                    style={{marginRight: "800px", paddingTop: "60px"}}
                    >Admin Dashboard</h1>
                </div>
                <div>
                     <Menu pointing secondary
                    style={{width: "120px"}}
                    >
                    {/* <Menu.Item
                        name='Home'
                        active={activeItem === 'Home'}
                        onClick={this.handleItemClick}
                    />  */}
                    <Menu.Item style={{paddingLeft: "300px"}}
                        name='Pitch Reviews'
                        active={activeItem === 'Pitch Reviews'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                    name='Authorised Pitches'
                    active={activeItem === 'Authorised Pitches'}
                    onClick={this.handleItemClick}
                    />
                    <Menu.Menu position='right' style={{paddingLeft: "600px"}}  >
                        <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={() => this.logout()}
                        />
                    </Menu.Menu>
                    </Menu>
                    {activeItem === 'Pitch Reviews' ? 
                    <Segment>
                        <AdminDashboard
                            acceptPitch={this.acceptPitch}
                            deletePitch={this.deletePitch} 
                            pitches={this.keepInUnauthorized()}
                            />
                    </Segment> : null} 

                    {activeItem === 'Authorised Pitches' ?
                    <Segment>
                    <AdminDashboard 
                        acceptPitch={this.acceptPitch}
                        deletePitch={this.deletePitch}
                        pitches={this.addToAuthorizedContainer()}
                        />
                     </Segment> : null 
                    }
  
                </div>
                </>
            ) : ( 
                <LoginForm 
                username={username}
                password={password}
                handleChange={this.handleChange}
                handleLogin={this.handleLogin} 
                />
            )}
            </>
        ) 
    }
}

export default AdminDashboardContainer; 