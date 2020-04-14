'use strict';

// const e = React.createElement;

class SubscribeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { subscribed: false };
    }

    render() {
        if (this.state.subscribed) {
            return 'You Subscribed to this.';
        }

        return e(
            'button',
            { onClick: () => this.setState({ subscribed: true }) },
            'Subscribe'
        );
    }
}

// ... the starter code you pasted ...

const subscribeContainer = document.querySelector('#subscribe_button_container');
ReactDOM.render(e(SubscribeButton), subscribeContainer);