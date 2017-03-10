import React from 'react';
import Component from '../Component';

require('./Spinner.css');

class Spinner extends Component {
    render() {
        return <span className={this.className()} />;
    }

    className() {
        let className = 'Spinner Spinner_visible';

        const theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' Spinner_theme_' + theme;
        }
        if (this.props.size) {
            className += ' Spinner_size_' + this.props.size;
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    }
}

Spinner.contextTypes = {
    theme: React.PropTypes.string,
};

Spinner.propTypes = {
    theme: React.PropTypes.string,
    size: React.PropTypes.string,
};

export default Spinner;
