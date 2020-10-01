import React from 'react'
import PropTypes from 'prop-types'
import {Button, Sidebar} from 'semantic-ui-react'
import FilterAndSortFunctionality from './FilterAndSortFunctionalityOld'
import MapCluster from './MapCluster'

const HorizontalSidebar = ({animation, direction, visible, pitches, updatePitches}) => (
  <Sidebar
    animation={animation}
    direction={direction}
    visible={visible}
  >
      <FilterAndSortFunctionality pitches={pitches} updatePitches={updatePitches} />
  </Sidebar>
)

HorizontalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
  pitches: PropTypes.array, 
  updatePitches: PropTypes.func, 
}

class FilterSideBar extends React.Component {

  state = {
    animation: 'overlay',
    direction: 'bottom',
    visible: false
  }

  handleTabChange = () => { 
    this.setState((prevState) => ({ 
        visible: !prevState.visible
    })) 
  }

  render() {
    const {animation, direction, visible} = this.state

    return (
        <>
          <Sidebar.Pushable>
              <HorizontalSidebar
                animation={animation}
                direction={direction}
                visible={visible}
                pitches={this.props.pitches}
                updatePitches={this.props.updatePitches}
              />
              <Sidebar.Pusher >
                  <MapCluster />
              </Sidebar.Pusher>
          </Sidebar.Pushable>
              <div className="filter-button-control">
                <Button basic color="green" className="filter-btn" onClick={() => this.handleTabChange()}>
                        Filter Controls  
                </Button>
              </div>
        </>
    )
  }
}

export default FilterSideBar; 