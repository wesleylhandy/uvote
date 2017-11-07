'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _jsxFileName = 'client/src/Components/LogOut.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _reactRouterDom = require('react-router-dom');

var _helpers = require('../utils/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var customStyles = {
    content: {
        top: '33%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -33%)'
    }
};

var Authentication = function (_Component) {
    _inherits(Authentication, _Component);

    function Authentication(props) {
        _classCallCheck(this, Authentication);

        var _this = _possibleConstructorReturn(this, (Authentication.__proto__ || Object.getPrototypeOf(Authentication)).call(this, props));

        _this.logout = function () {
            (0, _helpers.unAuthUser)().then(function () {
                _this.props.updateAuth(false, null);
                _this.setState({
                    username_field: { error_label: '', status: 'valid', validation: '', value: '' },
                    password_field: { error_label: '', status: 'valid', validation: '', value: '' },
                    isAuth: false
                });
            }).catch(function (err) {
                return alert(JSON.stringify(err, null, 2));
            });
        };

        _this.state = {
            username_field: {
                error_label: '',
                value: '',
                status: 'valid',
                validation: ''
            },
            password_field: {
                error_label: '',
                value: '',
                status: 'valid',
                validation: ''
            },
            dots: '',
            modalIsOpen: true,
            isAuth: true
        };
        _this.logout = _this.logout.bind(_this);
        _this.closeModal = _this.closeModal.bind(_this);
        return _this;
    }

    _createClass(Authentication, [{
        key: 'closeModal',
        value: function closeModal() {
            this.setState({ modalIsOpen: false });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({ isAuth: this.props.isAuth });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var redirect = function redirect() {
                if (!_this2.state.isAuth || !_this2.state.modalIsOpen) return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 64
                    },
                    __self: _this2
                });else return;
            };
            return _react2.default.createElement(
                'section',
                { className: 'auth-section', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 68
                    },
                    __self: this
                },
                _react2.default.createElement(
                    _reactModal2.default,
                    {
                        isOpen: this.state.modalIsOpen,
                        onRequestClose: this.closeModal,
                        style: customStyles,
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 69
                        },
                        __self: this
                    },
                    _react2.default.createElement(
                        'p',
                        {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 74
                            },
                            __self: this
                        },
                        'Please Click Here to Log Out'
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'logout', onClick: this.logout, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 76
                            },
                            __self: this
                        },
                        'Log Out'
                    )
                ),
                redirect()
            );
        }
    }]);

    return Authentication;
}(_react.Component);

exports.default = Authentication;