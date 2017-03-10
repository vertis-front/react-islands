import React from 'react';
import Control from '../Control';

require('./TextArea.css');

class TextArea extends Control {
    constructor(props) {
        super(props);

        this.onInputChange = this.onInputChange.bind(this);
    }

    render() {
        return (
            <textarea ref="control" {...this.getControlHandlers()} className={this.className()}
                id={this.props.id}
                name={this.props.name}
                disabled={this.props.disabled}
                placeholder={this.props.placeholder}
                value={this.props.value}
                minLength={this.props.minLength}
                maxLength={this.props.maxLength}
                onChange={this.onInputChange}
                onClick={this.props.onClick}
            >
            </textarea>
        );
    }

    className() {
        // NOTE: see narqo/react-islands#98 for notes about `_js_inited`
        let className = 'TextArea TextArea_js_inited';

        const theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' TextArea_theme_' + theme;
        }
        if (this.props.size) {
            className += ' TextArea_size_' + this.props.size;
        }
        if (this.props.disabled) {
            className += ' TextArea_disabled';
        }
        if (this.state.hovered) {
            className += ' TextArea_hovered';
        }
        if (this.state.focused) {
            className += ' TextArea_focused';
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    }

    onInputChange(e) {
        if (this.props.disabled) {
            return;
        }
        this.props.onChange(e.target.value, this.props);
    }
}

TextArea.contextTypes = {
    theme: React.PropTypes.string,
};

TextArea.propTypes = {
    theme: React.PropTypes.string,
    size: React.PropTypes.oneOf(['s', 'm', 'l', 'xl']),
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    minLength: React.PropTypes.number,
    maxLength: React.PropTypes.number,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
};

TextArea.defaultProps = {
    onChange() {},
};

export default TextArea;
