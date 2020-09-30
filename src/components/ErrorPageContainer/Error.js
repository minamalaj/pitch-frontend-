import React from 'react';
import {Link} from 'react-router-dom'; 
import { Grid } from 'semantic-ui-react';
import './Error.css'

const Error = () => { 
    return ( 
        <Grid className="error-body">
            <Grid.Column centered width={1}>
                <h1>Oops! Looks like a dead end</h1>
                    <Link to="/" className="">
                        Back to home
                    </Link>
            </Grid.Column>
        </Grid>
    )
}

export default Error; 