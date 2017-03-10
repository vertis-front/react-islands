import React from 'react';

import Component from '../Component';
import Overlay from '../Overlay';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zIndex: 0,
        };
        this.shouldRenderToOverlay = false;
        this.onLayerClick = this.onLayerClick.bind(this);
        this.onLayerOrderChange = this.onLayerOrderChange.bind(this);
        this.onLayerRequestHide = this.onLayerRequestHide.bind(this);
    }

    componentWillUpdate(nextProps) {
        if (!this.shouldRenderToOverlay && nextProps.visible) {
            this.shouldRenderToOverlay = true;
        }
    }

    render() {
        const { visible } = this.props;
        const style = visible ? { zIndex: this.state.zIndex } : null;

        const children = (
            <div className={this.className()} role="dialog" aria-hidden={!visible} style={style}>
                <div className="Modal__table">
                    <div className="Modal__cell">
                        <div className="Modal__content" ref="content">{this.props.children}</div>
                    </div>
                </div>
            </div>
        );

        if (this.shouldRenderToOverlay) {
            return (
                <Overlay
                    visible={visible}
                    zIndexGroupLevel={this.props.zIndexGroupLevel}
                    onClick={this.onLayerClick}
                    onRequestHide={this.onLayerRequestHide}
                    onOrderChange={this.onLayerOrderChange}
                >
                    {children}
                </Overlay>
            );
        } else {
            return children
        }
    }

    className() {
        var className = 'Popup Modal';

        const theme = this.props.theme || this.context.theme;
        if (theme) {
            className += ' Modal_theme_' + theme;
        }
        if (this.props.size) {
            className += ' Modal_size_' + this.props.size;
        }
        if (this.props.visible) {
            className += ' Modal_visible';
        }
        if (this.shouldRenderToOverlay) {
            className += ' Modal_js_inited Modal_has-animation';
        }

        if (this.props.className) {
            className += ' ' + this.props.className;
        }

        return className;
    }

    requestHide(e, reason) {
        this.props.onRequestHide(e, reason, this.props);
    }

    onLayerClick(e) {
        if (!this.refs.content.contains(e.target)) {
            this.requestHide(e, 'clickOutside');
        }
    }

    onLayerOrderChange(zIndex) {
        this.setState({ zIndex });
    }

    onLayerRequestHide(e, reason) {
        if (reason === 'escapeKeyPress') {
            this.requestHide(e, reason);
        }
    }
}

Modal.propsTypes = {
    theme: React.PropTypes.string,
    size: React.PropTypes.string,
    visible: React.PropTypes.bool.isRequired,
    onRequestHide: React.PropTypes.func,
};

Modal.defaultProps = {
    visible: false,
    zIndexGroupLevel: 20,
    onRequestHide() {},
};

Modal.contextTypes = {
    theme: React.PropTypes.string,
};

export default Modal;
