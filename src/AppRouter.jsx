import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Template from './Pages/Template';
import Home from './Pages/Home';
import Search from './Pages/Search';
import ViewMovie from './Pages/ViewMovie';
import Error404 from './Pages/Error404';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Template>
                <Switch>
                    <FineRoute path="/" component={Home} exact />
                    <FineRoute path="/search" component={Search} exact />
                    <FineRoute path="/movie/:id" component={ViewMovie} exact />
                    <FineRoute path="*" component={Error404} />
                </Switch>
            </Template>
        </BrowserRouter>
    );
}

const FineRoute = ({ component: Component, ...props }) => {
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
