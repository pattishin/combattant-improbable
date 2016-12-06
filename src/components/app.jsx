import React, { Component } from 'react';
import { render } from 'react-dom';
import Tab from 'components/tab';

class AppComponent extends Component {
    render() {
        return (
            <div className="app-content">
                <h2>Unlikely Fighters</h2>
                <Tab items={[ 'Coffee', 'Lorem' , 'Ipsum' ]} />
            </div>     
        );
    }
}

export default AppComponent;
