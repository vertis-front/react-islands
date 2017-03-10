import React from 'react';
import Control from '../Control';
import Button from '../Button';

class Checkbox extends Control {
    constructor(props) {
        super(props);

        this.onControlChange = this.onControlChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onButtonFocusChange = this.onButtonFocusChange.bind(this);
        this.onButtonHoverChange = this.onButtonHoverChange.bind(this);
    }

    render() {
        const { id, name, theme, size, type, checked, disabled, value } = this.props;
        const { focused } = this.state;

        if (type === 'button') {
            return (
                <label className={this.className()}>
                    {checked && <input type="hidden" name={name} value={value} disabled={disabled} />}
                    <Button
                        theme={theme}
                        size={size}
                        type={type}
                        id={id}
                        disabled={disabled}
                        checked={checked}
                        focused={focused}
                        onFocusChange={this.onButtonFocusChange}
                        onHoverChange={this.onButtonHoverChange}
                        onClick={this.onButtonClick}
                    >
                        {this.props.children}
                    </Button>
                </label>
            )
        } else {
            return (
                <label className={this.className()} {...this.getControlHandlers()}>
                    <span className="Checkbox__box">
                        <input ref="control" className="Checkbox__control" type="checkbox" autoComplete="off"
                            id={id}
                            name={name}
                            disabled={disabled}
                            value={value}
                            checked={checked}
                            onChange={this.onControlChange}
                        />
                    </span>
                    <span className="Checkbox__text" role="presentation">
                        {this.props.children}
                    </span>
                </label>
            )
        }
    }

    className() {
        // NOTE: see narqo/react-islands#98 for notes about `_js_inited`
        let className = 'Checkbox checkbox_js_inited';

        const theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' Checkbox_theme_' + theme;
        }
        if (this.props.size) {
            className += ' Checkbox_size_' + this.props.size;
        }
        if (this.props.type) {
            className += ' Checkbox_type_' + this.props.type;
        }
        if (this.props.disabled) {
            className += ' Checkbox_disabled';
        }
        if (this.props.checked) {
            className += ' Checkbox_checked';
        }
        if (this.state.hovered) {
            className += ' Checkbox_hovered';
        }
        if (this.state.focused) {
            className += ' Checkbox_focused';
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    }

    onControlChange() {
        if (this.props.disabled) {
            return;
        }
        const checked = !this.props.checked;
        this.props.onCheck(checked, this.props);
    }

    onButtonFocusChange(focused) {
        this.setState({ focused });
    }

    onButtonHoverChange(hovered) {
        this.setState({ hovered });
    }

    onButtonClick(e) {
        if (this.props.onClick) {
            this.props.onClick(e, this.props);
        }
        if (!e.isDefaultPrevented()) {
            this.onControlChange();
        }
    }
}

Checkbox.contextTypes = {
    theme: React.PropTypes.string,
};

Checkbox.propTypes = {
    theme: React.PropTypes.string,
    size: React.PropTypes.oneOf(['s', 'm', 'l', 'xl']),
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    type: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    checked: React.PropTypes.bool,
    value: React.PropTypes.any,
    onClick: React.PropTypes.func,
    onCheck: React.PropTypes.func,
};

Checkbox.defaultProps = {
    onCheck() {},
};

export default Checkbox;
