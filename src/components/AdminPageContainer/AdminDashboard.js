import React from 'react'
import AdminPitchCard from './AdminPitchCard'

const AdminDashboard = props => {  

   const renderPitchProposals = () => { 
        return props.pitches.map(pitch => <AdminPitchCard 
                key={pitch.id} pitch={pitch} 
                acceptPitch={props.acceptPitch}
                deletePitch={props.deletePitch} 
            />
        )
    }
    
    return (
        <>
            {renderPitchProposals()}
        </>
    )

}

export default AdminDashboard;