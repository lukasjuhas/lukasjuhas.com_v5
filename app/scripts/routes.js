import React from 'react';
import { Route } from 'react-router';

import App from './app';

import About from './components/About';

const routes = (
    <Route name="home" path="/" handler={App}>
        <Route name="about" path="/about" handler={About} />
    </Route>
);

export default routes;
