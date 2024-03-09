'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reactImageLightbox = require('react-image-lightbox');

var _reactImageLightbox2 = _interopRequireDefault(_reactImageLightbox);

require('react-image-lightbox/style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This only needs to be imported once in your app

var ModalComponent = function (_Component) {
    _inherits(ModalComponent, _Component);

    function ModalComponent(props) {
        _classCallCheck(this, ModalComponent);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            images: props.images || [],
            currentImageIndex: props.index
        };

        _this.onMovePrevRequest = _this.onMovePrevRequest.bind(_this);
        _this.onMoveNextRequest = _this.onMoveNextRequest.bind(_this);
        return _this;
    }

    ModalComponent.prototype.onMovePrevRequest = function onMovePrevRequest() {
        var _state = this.state,
            currentImageIndex = _state.currentImageIndex,
            images = _state.images;


        this.setState({
            currentImageIndex: (currentImageIndex + images.length - 1) % images.length
        });
    };

    ModalComponent.prototype.onMoveNextRequest = function onMoveNextRequest() {
        var _state2 = this.state,
            currentImageIndex = _state2.currentImageIndex,
            images = _state2.images;


        this.setState({
            currentImageIndex: (currentImageIndex + 1) % images.length
        });
    };

    ModalComponent.prototype.render = function render() {
        var _state3 = this.state,
            images = _state3.images,
            currentImageIndex = _state3.currentImageIndex;
        var _props = this.props,
            onClose = _props.onClose,
            index = _props.index;


        return _react2.default.createElement(_reactImageLightbox2.default, {
            mainSrc: images[currentImageIndex],
            nextSrc: images[(currentImageIndex + 1) % images.length],
            prevSrc: images[(currentImageIndex + images.length - 1) % images.length],
            onCloseRequest: onClose,
            onMovePrevRequest: this.onMovePrevRequest,
            onMoveNextRequest: this.onMoveNextRequest
        });
    };

    return ModalComponent;
}(_react.Component);

exports.default = ModalComponent;
module.exports = exports['default'];