import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Template from './Pages/Template';
import Home from './Pages/Home';
import Search from './Pages/Search';
import ViewMovie from './Pages/ViewMovie';
import PlayMovie from './Pages/PlayMovie';
import Error404 from './Pages/Error404';
import ConnError from './Pages/ConnError';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Template>
                <Switch>
                    <FineRoute path="/" component={Home} exact />
                    <FineRoute path="/search" component={Search} exact />
                    <FineRoute path="/movie/:id/play" component={PlayMovie} exact />
                    <FineRoute path="/movie/:id" component={ViewMovie} exact />
                    <FineRoute path="/lost" component={ConnError} exact />
                    <FineRoute path="*" component={Error404} />
                </Switch>
            </Template>
        </BrowserRouter>
    );
}

const FineRoute = ({ component: Component, ...props }) => {
    // It forces scroll to top on each page change.
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return (
        <Route
            {...props}
            render={props => {
                return <Component {...props} />;
            }}
        />
    );
}

export default AppRouter;
