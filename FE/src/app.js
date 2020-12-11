import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import {Provider} from 'react-redux';
import {v4 as uuid} from 'uuid';

import '../node_modules/antd/dist/antd.css';

import './app.css';
import {store} from './store';
import {Header} from './components';
import {Modal} from './modals';
import {
    MainPage,
    CartPage,
    OrdersPage,
    NotFoundPage,
} from './pages';

export class App extends Component{
    constructor() {
        super();
    }   

    render () {
        return (
            <Router>
                <Provider store={store}>
                    <Modal />
                    <div className="app__container">
                        <Header/>
                        <Switch>
                            <Route exact path="/" component={MainPage}/>
                            <Route exact path="/cart" component={CartPage}/>
                            <Route exact path="/orders" component={OrdersPage}/>
                            <Route component={NotFoundPage} />
                        </Switch>
                    </div>
                </Provider>
            </Router>
        );
    }
};

ReactDOM.render(<App />, document.getElementById("root"));