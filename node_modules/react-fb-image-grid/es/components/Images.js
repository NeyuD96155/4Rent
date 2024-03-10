var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Image, Grid, Row, Col } from 'react-bootstrap';
import Modal from './Modal';
import PropTypes from 'prop-types';

var Images = (_temp = _class = function (_Component) {
  _inherits(Images, _Component);

  function Images(props) {
    _classCallCheck(this, Images);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      modal: false,
      countFrom: props.countFrom > 0 && props.countFrom < 5 ? props.countFrom : 5,
      conditionalRender: false
    };

    _this.openModal = _this.openModal.bind(_this);
    _this.onClose = _this.onClose.bind(_this);

    if (props.countFrom <= 0 || props.countFrom > 5) {
      console.warn('countFrom is limited to 5!');
    }
    return _this;
  }

  Images.prototype.openModal = function openModal(index) {
    var _props = this.props,
        onClickEach = _props.onClickEach,
        images = _props.images;


    if (onClickEach) {
      return onClickEach({ src: images[index], index: index });
    }

    this.setState({ modal: true, url: images[index], index: index });
  };

  Images.prototype.onClose = function onClose() {
    this.setState({ modal: false });
  };

  Images.prototype.renderOne = function renderOne() {
    var images = this.props.images;
    var countFrom = this.state.countFrom;

    var overlay = images.length > countFrom && countFrom == 1 ? this.renderCountOverlay(true) : this.renderOverlay();

    return React.createElement(
      Grid,
      null,
      React.createElement(
        Row,
        null,
        React.createElement(
          Col,
          { xs: 12, md: 12, className: 'border height-one background', onClick: this.openModal.bind(this, 0), style: { background: 'url(' + images[0] + ')' } },
          overlay
        )
      )
    );
  };

  Images.prototype.renderTwo = function renderTwo() {
    var images = this.props.images;
    var countFrom = this.state.countFrom;

    var overlay = images.length > countFrom && [2, 3].includes(+countFrom) ? this.renderCountOverlay(true) : this.renderOverlay();
    var conditionalRender = [3, 4].includes(images.length) || images.length > +countFrom && [3, 4].includes(+countFrom);

    return React.createElement(
      Grid,
      null,
      React.createElement(
        Row,
        null,
        React.createElement(
          Col,
          { xs: 6, md: 6, className: 'border height-two background', onClick: this.openModal.bind(this, conditionalRender ? 1 : 0), style: { background: 'url(' + (conditionalRender ? images[1] : images[0]) + ')' } },
          this.renderOverlay()
        ),
        React.createElement(
          Col,
          { xs: 6, md: 6, className: 'border height-two background', onClick: this.openModal.bind(this, conditionalRender ? 2 : 1), style: { background: 'url(' + (conditionalRender ? images[2] : images[1]) + ')' } },
          overlay
        )
      )
    );
  };

  Images.prototype.renderThree = function renderThree(more) {
    var images = this.props.images;
    var countFrom = this.state.countFrom;

    var overlay = !countFrom || countFrom > 5 || images.length > countFrom && [4, 5].includes(+countFrom) ? this.renderCountOverlay(true) : this.renderOverlay(conditionalRender ? 3 : 4);
    var conditionalRender = images.length == 4 || images.length > +countFrom && +countFrom == 4;

    return React.createElement(
      Grid,
      null,
      React.createElement(
        Row,
        null,
        React.createElement(
          Col,
          { xs: 6, md: 4, className: 'border height-three background', onClick: this.openModal.bind(this, conditionalRender ? 1 : 2), style: { background: 'url(' + (conditionalRender ? images[1] : images[2]) + ')' } },
          this.renderOverlay(conditionalRender ? 1 : 2)
        ),
        React.createElement(
          Col,
          { xs: 6, md: 4, className: 'border height-three background', onClick: this.openModal.bind(this, conditionalRender ? 2 : 3), style: { background: 'url(' + (conditionalRender ? images[2] : images[3]) + ')' } },
          this.renderOverlay(conditionalRender ? 2 : 3)
        ),
        React.createElement(
          Col,
          { xs: 6, md: 4, className: 'border height-three background', onClick: this.openModal.bind(this, conditionalRender ? 3 : 4), style: { background: 'url(' + (conditionalRender ? images[3] : images[4]) + ')' } },
          overlay
        )
      )
    );
  };

  Images.prototype.renderOverlay = function renderOverlay(id) {
    var _props2 = this.props,
        hideOverlay = _props2.hideOverlay,
        renderOverlay = _props2.renderOverlay,
        overlayBackgroundColor = _props2.overlayBackgroundColor;


    if (hideOverlay) {
      return false;
    }

    return [React.createElement('div', { key: 'cover-' + id, className: 'cover slide', style: { backgroundColor: overlayBackgroundColor } }), React.createElement(
      'div',
      { key: 'cover-text-' + id, className: 'cover-text slide animate-text', style: { fontSize: '100%' } },
      renderOverlay()
    )];
  };

  Images.prototype.renderCountOverlay = function renderCountOverlay(more) {
    var images = this.props.images;
    var countFrom = this.state.countFrom;

    var extra = images.length - (countFrom && countFrom > 5 ? 5 : countFrom);

    return [more && React.createElement('div', { key: 'count', className: 'cover' }), more && React.createElement(
      'div',
      { key: 'count-sub', className: 'cover-text', style: { fontSize: '200%' } },
      React.createElement(
        'p',
        null,
        '+',
        extra
      )
    )];
  };

  Images.prototype.render = function render() {
    var _state = this.state,
        modal = _state.modal,
        index = _state.index,
        countFrom = _state.countFrom;
    var images = this.props.images;

    var imagesToShow = [].concat(images);

    if (countFrom && images.length > countFrom) {
      imagesToShow.length = countFrom;
    }

    return React.createElement(
      'div',
      { className: 'grid-container' },
      [1, 3, 4].includes(imagesToShow.length) && this.renderOne(),
      imagesToShow.length >= 2 && imagesToShow.length != 4 && this.renderTwo(),
      imagesToShow.length >= 4 && this.renderThree(),
      modal && React.createElement(Modal, { onClose: this.onClose, index: index, images: images })
    );
  };

  return Images;
}(Component), _class.defaultProps = {
  images: [],
  hideOverlay: false,
  renderOverlay: function renderOverlay() {
    return 'Preview Image';
  },
  overlayBackgroundColor: '#222222',
  onClickEach: null,
  countFrom: 5
}, _temp);


Images.propTypes = process.env.NODE_ENV !== "production" ? {
  images: PropTypes.array.isRequired,
  hideOverlay: PropTypes.bool,
  renderOverlay: PropTypes.func,
  overlayBackgroundColor: PropTypes.string,
  onClickEach: PropTypes.func,
  countFrom: PropTypes.number
} : {};

export default Images;