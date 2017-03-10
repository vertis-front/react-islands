import React from 'react';

import Component from '../Component';
import Control from '../Control';
import pressable from '../pressable';

require('./Button.css');

class Button extends Control {
    constructor(...args) {
        super(...args);
        this._wrappedChildren = null;
    }

    /** @override */
    componentWillUpdate(nextProps, nextState) {
        if (super.componentWillUpdate) {
            super.componentWillUpdate(nextProps, nextState);
        }

        if (this.props.children !== nextProps.children) {
            this._wrappedChildren = null;
        }
    }

    render() {
        const props = this.props;

        if (!this._wrappedChildren) {
            this._wrappedChildren = Component.wrap(props.children, child => (
                // NOTE: this `key` is to harmonize the one we have in `Component.wrap()`
                <span key="wrappedText" className="Button__text">{child}</span>
            ));
        }

        if (props.type === 'link') {
            const url = props.disabled ? null : props.url;

            return (
                <a id={props.id} className={this.className()} {...this.getControlHandlers()} ref="control" role="link" href={url}>
                    {this._wrappedChildren}
                </a>
            );
        } else {
            return (
                <button
                    className={this.className()}
                    {...this.getControlHandlers()}
                    ref="control"
                    type={props.type}
                    id={props.id}
                    name={props.name}
                    title={props.title}
                    disabled={props.disabled}
                >
                    {this._wrappedChildren}
                </button>
            );
        }
    }

    className() {
        // NOTE: see narqo/react-islands#98 for notes about `_js_inited`
        var className = 'Button Button_js_inited';

        const theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' Button_theme_' + theme;
        }
        if (this.props.size) {
            className += ' Button_size_' + this.props.size;
        }
        if (this.props.type) {
            className += ' Button_type_' + this.props.type;
        }
        if (this.props.view) {
            className += ' Button_view_' + this.props.view;
        }
        if (this.props.disabled) {
            className += ' Button_disabled';
        }
        if (this.state.hovered) {
            className += ' Button_hovered';
        }
        if (this.state.pressed) {
            className += ' Button_pressed';
        }
        if (this.state.focused === 'hard') {
            className += ' Button_focused button_focused-hard';
        } else if (this.state.focused) {
            className += ' Button_focused';
        }
        if (this.props.checked) {
            className += ' Button_checked';
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    }
}

Button.propTypes = {
    theme: React.PropTypes.string,
    size: React.PropTypes.oneOf(['s', 'm', 'l', 'xl']),
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    type: React.PropTypes.string,
    title: React.PropTypes.string,
    onClick: React.PropTypes.func,
};

Button.contextTypes = {
    theme: React.PropTypes.string,
};

export default pressable(Button);
