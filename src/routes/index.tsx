import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Dashbord from '../pages/Dashbord';
import Repository from '../pages/Repository';

const Routes =() => (
    <Switch>
        <Route path="/" exact component={Dashbord}/>
        <Route path="/repositories/:repository+" exact component={Repository}/>
    </Switch>
)

export default Routes;
