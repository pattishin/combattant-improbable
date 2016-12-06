import React, { Component } from 'react';

class TabComponent extends Component {
    render() {
        if (this.props.items.length === 0) {
            return (
                <p> Nothing to see here!</p>
            );
        }

        return (
            <section className="tab-section">
                <ul class="index-list">
                    {this.props.items.map((item, index) => {
                        return (<li key={index}> item {item}</li>);       
                    })}
                </ul>
            </section>
        );
    }
}

TabComponent.defaultProps = {
    items: []
}

export default TabComponent;
