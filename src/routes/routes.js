import React from 'react'
import { Link, Route, BrowserRouter as Router } from 'react-router-dom'
import Login from '../containers/auth/login'
import Signup from '../containers/auth/signup'
import Dashboard from '../containers/usersList'
import Messenger from '../containers/'
import WelcomeScreen from '../containers/welcomeScreen'

export default () => {
    return (
        <Router>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/messenger" component={Messenger}/>
            <Route path="/" exact component={WelcomeScreen}/>
        </Router>
    )
}