import React from 'react'; 
import { Grid, Button} from 'semantic-ui-react';

class FilterAndSortFunctionality extends React.Component { 

    state = {
        filteredPitches: [],
        filterClicked: false,
        passingTags: {
          ameneties: { 
            parking: false, 
            floodlights: false
          }, 
          space: {
            indoor: false,
            outdoor: false
          },
          surface: {
            astroturf: false,
            grass: false,
            gravel: false,
            other: false
          },
          size: {
            small: false,
            medium: false,
            large: false
          }
        }
      };


      handleAllFilterClicks = (e, filterCategory) => {
        const name = e.target.name;
        this.setState(prevState => ({
          passingTags: {
            ...prevState.passingTags,
            [filterCategory]: {
              ...prevState.passingTags[filterCategory],
              [name]: !prevState.passingTags[filterCategory][name]
            }
          }
        }))
      }

      filterCollected = () => {
        const collectTrueKeys= {
          space: [],
          size: [],
          surface: [],
          ameneties: []
        };
        
        const { size, space, surface, ameneties } = this.state.passingTags;
        
        for (let spaceKey in space) {
          if (space[spaceKey]) collectTrueKeys.space.push(spaceKey);
        }
        for (let sizeKey in size) {
          if (size[sizeKey]) collectTrueKeys.size.push(sizeKey);
        }
        for (let surfaceKey in surface) {
          if (surface[surfaceKey]) collectTrueKeys.surface.push(surfaceKey);
        }
        for (let amenetiesKey in ameneties) {
          if (ameneties[amenetiesKey]) collectTrueKeys.ameneties.push(amenetiesKey);
        }
        return collectTrueKeys;
      };

      multiPropsFilter = (pitches, filters) => {
        const filterKeys = Object.keys(filters);
        return pitches.filter(pitch => {
          return filterKeys.every(key => {
            if (!filters[key].length) return true;
            if (Array.isArray(pitch[key])) {
              return pitch[key].some(keyElement => filters[key].includes(keyElement));
            }
            return filters[key].includes(pitch[key]);
          });
        });
      };

    handleFilter = () => { 
        const filteredPitches = this.multiPropsFilter(
                  this.props.pitches,
                  this.filterCollected()
                );

        this.setState({ 
            filterChecked: true, 
            filteredPitches
        }) 

        this.props.updatePitches(filteredPitches)
    }


      render() { 
          return (
            <>
              <Grid className="filter-grid">
                <Grid.Row columns={1} textAlign='left'>
                  <Grid.Column>
                    <p className="filter-text-header">Filter Pitches</p>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
              <Grid columns={4} divided>
              <Grid.Column>
                <div className="filter-text">
                <label className="filter-text-label">Space</label>
                <br></br>
                <br></br>
                  <div className="boxes">
                    <input className="filter-checkbox"
                    id="filter-check"
                          type="checkbox"
                          label='Indoor'
                          name="indoor"
                          onClick={e => this.handleAllFilterClicks(e, "space")}
                          />   
                  <label for="filter-check">Indoor</label>
                    <input className="filter-checkbox"
                            id="filter-check"
                            type="checkbox"
                            label={'Outdoor'}
                            name="outdoor"
                            onClick={e => this.handleAllFilterClicks(e, "space")}
                            />  
                  <label for="filter-check">Outdoor</label>
                </div>
                </div>
                </Grid.Column>
                <Grid.Column>
                  <label className="filter-text-label">Surface</label>
                  <br></br>
                  <br></br>
                  <div className="boxes">
                      <input id="filter-check"
                        className="filter-checkbox"
                          type="checkbox"
                          name="astroturf"
                          onClick={e => this.handleAllFilterClicks(e, "surface")}
                          />
                    <label for="filter-check">Astroturf</label>
                      <input id="filter-check"
                      className="filter-checkbox"
                          type="checkbox"
                          name="grass"
                          onClick={e => this.handleAllFilterClicks(e, "surface")}
                          />
                    <label for="filter-check">Grass</label>
                      <input id="filter-check"
                      className="filter-checkbox"
                          type="checkbox"
                          name="gravel"
                          onClick={e => this.handleAllFilterClicks(e, "surface")}
                          />
                    <label for="filter-check">Gravel</label>
                      <input id="filter-check"
                      className="filter-checkbox"
                          type="checkbox"
                          name="other"
                          onClick={e => this.handleAllFilterClicks(e, "surface")}
                          />
                    <label for="filter-check">Other</label>
                  </div>
                </Grid.Column>
                <Grid.Column>
                <div className="filter-text">
                <label className="filter-text-label">Size</label>
                <br></br>
                <br></br>
                  <div className="boxes">
                      <input id="filter-check"
                      className="filter-checkbox"
                          type="checkbox"
                          label={'Small'}
                          name="small"
                          onClick={e => this.handleAllFilterClicks(e, "size")}
                          />
                    <label for="filter-check">Small</label>
                      <input id="filter-check"
                      className="filter-checkbox"
                          type="checkbox"
                          label={'Medium'}
                          name="medium"
                          onClick={e => this.handleAllFilterClicks(e, "size")}
                          />
                    <label for="filter-check">Medium</label>
                      <input id="filter-check"
                      className="filter-checkbox"
                          type="checkbox"
                          label={'Large'}
                          name="large"
                          onClick={e => this.handleAllFilterClicks(e, "size")}
                          />
                    <label for="filter-check">Large</label>
                  </div>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="filter-text">
                  <label className="filter-text-label">Ameneties</label>
                  <br></br>
                  <br></br>
                    <div className="boxes">
                      <input id="filter-check"
                      className="filter-checkbox"
                          type="checkbox"
                          label={'Floodlights'}
                          name="floodlights"
                          onClick={e => this.handleAllFilterClicks(e, "ameneties")}
                          />  
                    <label for="filter-check">Floodlights</label>
                      <input id="filter-check"
                      className="filter-checkbox"
                          type="checkbox"
                          label={'Parking'}
                          name="parking"
                          onClick={e => this.handleAllFilterClicks(e, "ameneties")}
                          />  
                      <label for="filter-check">Parking</label>
                    </div>
                   </div>
                </Grid.Column>
              </Grid>
            </Grid.Row>
            <Grid.Row columns={1}>
                <Grid.Column>
                    <Button className="filter-pitches-button" inverted onClick={this.handleFilter}>Filter Pitches</Button>
                </Grid.Column>
              </Grid.Row>
              </Grid>
            </>
          )
      }
}

export default FilterAndSortFunctionality; 


