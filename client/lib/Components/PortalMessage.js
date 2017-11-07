'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'client/src/Components/PortalMessage.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PortalMessage = function (_Component) {
  _inherits(PortalMessage, _Component);

  function PortalMessage(props) {
    _classCallCheck(this, PortalMessage);

    var _this = _possibleConstructorReturn(this, (PortalMessage.__proto__ || Object.getPrototypeOf(PortalMessage)).call(this, props));

    _this.state = {
      userId: props.userId,
      isAuth: props.isAuth
    };
    return _this;
  }

  _createClass(PortalMessage, [{
    key: 'render',
    value: function render() {
      if (this.state.isAuth) return _react2.default.createElement(
        'div',
        { className: 'user-id', __source: {
            fileName: _jsxFileName,
            lineNumber: 14
          },
          __self: this
        },
        'You\'re creator ID is ',
        _react2.default.createElement(
          'span',
          { className: 'display-id', __source: {
              fileName: _jsxFileName,
              lineNumber: 14
            },
            __self: this
          },
          this.state.userId
        ),
        '. All of the polls you create will be saved under this id and can be viewed by the public. You will be able to share your polls with your friends once they are created.'
      );else return _react2.default.createElement(_reactRouterDom.Redirect, { to: {
          pathname: '/login',
          state: { from: { pathname: '/portal' } }
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        },
        __self: this
      });
    }
  }]);

  return PortalMessage;
}(_react.Component);

exports.default = PortalMessage;