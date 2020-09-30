import React from 'react'
import {Button, Segment, Modal, Header, Icon } from 'semantic-ui-react'

const AdminPitchCard = props => { 
    const pitch = props.pitch
    const {acceptPitch, deletePitch } = props

    return (
        <>
            <div>
                <Segment>
                    <h2>{pitch.name}</h2>
                    <h4>{pitch.address}</h4>
                    <h5>{pitch.floodlights}</h5>
                    <h6>{pitch.parking}</h6>
                    <h6>Pitch surface | {pitch.surface}</h6>
                    <h6>Pitch size | {pitch.size}</h6>
                    <h6>Pitch space | {pitch.space}</h6>
                <Modal size="small" 
                trigger={<Button>Delete Pitch Request</Button>} 
                closeIcon
                >
                    <Header icon='trash' content='Are you sure you want to perform this action?' />
                        <Modal.Content>
                            <h4>Once you make this change it cannot be undone.</h4>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='red'>
                                <Icon name='remove' /> No
                            </Button>
                            <Button color='green' onClick={() => deletePitch(pitch)} >
                                <Icon name='checkmark' /> Yes, I am sure
                            </Button>
                        </Modal.Actions>
                </Modal>
                    <Button content={pitch.authorized ? "Unauthorize Pitch" : "Authorize Pitch"} onClick={() => acceptPitch(pitch)} />
                </Segment>
            </div>
        </>
    )
}

export default AdminPitchCard; 


