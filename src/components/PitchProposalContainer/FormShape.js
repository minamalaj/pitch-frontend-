import React from 'react'
import './FormShape.scss'

const FormShape = props => { 
    const pitch = props.pitch 

    return ( 
        <div className="shape">
            <div className="shape-l-big"></div>
            <div className="shape-l-med"></div>
                <div className="shape-l-small">
                    <div className="shape-text"></div>  
                </div>
        </div> 
    )
}

export default FormShape; 