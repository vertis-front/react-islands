import React from 'react';
import Component from '../../Component';

require('./MenuItem.css');

class MenuItem extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    render() {
        return (
            <div
                className={this.className()}
                onClick={this.onClick}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                {this.props.children}
            </div>
        );
    }

    className() {
        // NOTE: see narqo/react-islands#98 for notes about `_js_inited`
        let className = 'MenuItem MenuItem_js_inited';

        const theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' MenuItem_theme_' + theme;
        }
        if (this.props.size) {
            className += ' MenuItem_size_' + this.props.size;
        }
        if (this.props.type) {
            className += ' MenuItem_type_' + this.props.type;
        }
        if (this.props.disabled) {
            className += ' MenuItem_disabled';
        }
        if (this.props.hovered) {
            className += ' MenuItem_hovered';
        }
        if (this.props.checked) {
            className += ' MenuItem_checked';
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    }

    onClick(e) {
        if (this.props.disabled) {
            return;
        }

        this.props.onClick(e, this.props);
    }

    onMouseEnter() {
        if (this.props.disabled) {
            return;
        }

        this.props.onHover(true, this.props);
    }

    onMouseLeave() {
        if (this.props.disabled) {
            return;
        }

        this.props.onHover(false, this.props);
    }
}

MenuItem.contextTypes = {
    theme: React.PropTypes.string,
};

MenuItem.propTypes = {
    index: React.PropTypes.number,
    theme: React.PropTypes.string,
    size: React.PropTypes.string,
    type: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    checked: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onHover: React.PropTypes.func,
};

export default MenuItem;
