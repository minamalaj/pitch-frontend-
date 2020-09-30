import React from 'react'
import { Menu, Segment } from 'semantic-ui-react'

class MenuLayout extends React.Component {
 
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const {activeItem} = this.state

    return (
      <div>
        <h1>Admin Dashmboard</h1>
          <Menu pointing secondary>
            <Menu.Item
              name='Home'
              active={activeItem === 'Home'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='Pitch Reviews'
              active={activeItem === 'Pitch Reviews'}
              onClick={this.handleItemClick}
             />
            <Menu.Item
              name='Authorised Pitches'
              active={activeItem === 'Authorised Pitches'}
              onClick={this.handleItemClick}
            />
            <Menu.Menu position='right'>
              <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                onClick={this.handleItemClick}
              />
            </Menu.Menu>
        </Menu>
          <Segment>
            <img src='/images/wireframe/media-paragraph.png' alt='' />
          </Segment>
      </div>
    )
  }
}

export default MenuLayout;