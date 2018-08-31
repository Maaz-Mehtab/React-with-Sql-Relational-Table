import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import ShoppingList from './component/ShoppingList';
import ItemList from './component/ItemList';
import history from './History';
class Routers extends Component {
    render() {
        return (
            <Router history={history}>
            
                <div>
                    <Route exact path="/" component={ShoppingList} />
                    <Route exact path="/ItemList/:id" component={ItemList}  />
                 </div>
            </Router>
        )
    }
}

export default Routers;