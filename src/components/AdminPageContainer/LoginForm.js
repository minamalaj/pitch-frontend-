import React from 'react'; 
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

class LoginForm extends React.Component { 

  render() {
    const {username, password, handleChange, handleLogin} = this.props;
    
    return (
        <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' textAlign='center'>
                Login to your account
            </Header>
          <Form size='large' className="login-form">
            <Segment stacked>
                <Form.Input 
                fluid icon='user' 
                iconPosition='left' 
                placeholder='Username' 
                name="username"
                type="text"
                value={username}
                onChange={handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                />
                <Button fluid size='large'
                type="submit" onClick={handleLogin}
                >
                  Login
                </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )} 
}

export default LoginForm;