import React from 'react';
import Component from '../Component';

class RadioGroup extends Component {
    constructor(props) {
        super(props);

        this.onChildCheck = this.onChildCheck.bind(this);
    }

    render() {
        const { theme, size, type, name, disabled, value } = this.props;

        const children = React.Children.map(this.props.children, child => {
            const checked = child.props.value === value;
            return React.cloneElement(child, {
                theme,
                size,
                type,
                name,
                value,
                disabled,
                ...child.props,
                checked,
                onCheck: this.onChildCheck,
            });
        });

        return (
            <span className={this.className()}>
                {children}
            </span>
        );
    }

    className() {
        // NOTE: see narqo/react-islands#98 for notes about `_js_inited`
        let className = 'RadioGroup RadioGroup_js_inited ControlGroup';

        const theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' RadioGroup_theme_' + theme;
        }
        if (this.props.size) {
            className += ' RadioGroup_size_' + this.props.size;
        }
        if (this.props.type) {
            className += ' RadioGroup_type_' + this.props.type;
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    }

    onChildCheck(_, radioProps) {
        const value = radioProps.value;
        if (value !== this.props.value) {
            this.props.onChange(value, this.props);
        }
    }
}

RadioGroup.contextTypes = {
    theme: React.PropTypes.string,
};

RadioGroup.propTypes = {
    theme: React.PropTypes.string,
    size: React.PropTypes.string,
    type: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.any,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func,
};

RadioGroup.defaultProps = {
    onChange() {},
};

module.exports = RadioGroup;
