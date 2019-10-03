import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import New from './pages/New/New'


const Routes = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/new" component={New}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes