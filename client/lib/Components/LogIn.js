'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _jsxFileName = 'client/src/Components/LogIn.js';

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

        _this.login = function (e) {
            e.preventDefault();
            var isValid = true;
            if (!_this.state.username_field.value.trim()) {
                isValid = false;
                _this.setState({ username_field: {
                        error_label: '*',
                        value: '',
                        status: 'error',
                        validation: 'Please enter your email address.'
                    } });
            }
            if (!_this.state.password_field.value.trim()) {
                isValid = false;
                _this.setState({ password_field: {
                        error_label: '*',
                        value: '',
                        status: 'error',
                        validation: 'Please enter your password.'
                    } });
            }
            if (isValid) {
                (0, _helpers.authUser)(_this.state.username_field.value, _this.state.password_field.value).then(function (user) {
                    _this.props.updateAuth(true, user.creatorId);
                    _this.setState({
                        username_field: { error_label: '', status: 'valid', validation: '', value: '' },
                        password_field: { error_label: '', status: 'valid', validation: '', value: '' },
                        isAuth: true
                    });
                }).catch(function (err) {
                    _this.setState({
                        username_field: { error_label: '*', status: 'error', validation: JSON.stringify(err, null, 2), value: '' },
                        password_field: { label: '*', status: 'error', validation: '', value: '' }
                    });
                });
            }
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
            isAuth: null
        };
        _this.handleInput = _this.handleInput.bind(_this);
        _this.handleDelete = _this.handleDelete.bind(_this);
        _this.login = _this.login.bind(_this);
        _this.closeModal = _this.closeModal.bind(_this);
        return _this;
    }

    _createClass(Authentication, [{
        key: 'closeModal',
        value: function closeModal() {
            this.setState({ modalIsOpen: false });
        }
    }, {
        key: 'handleDelete',
        value: function handleDelete(e) {
            if (e.key === "Backspace") {
                e.preventDefault();
                this.setState({ password_field: { value: this.state.password_field.value.slice(0, -1), error_label: '', validation: '', status: 'valid' }, dots: this.state.dots.slice(0, -1) });
            }
        }
    }, {
        key: 'handleInput',
        value: function handleInput(e) {
            e.preventDefault();
            if (e.target.name === 'password') {
                this.setState({ password_field: { value: this.state.password_field.value + e.target.value.slice(-1), error_label: '', validation: '', status: 'valid' } });
                var dots = '';
                for (var i = 0; i < e.target.value.length; i++) {
                    dots += '•';
                }
                this.setState({ dots: dots });
            } else this.setState({ username_field: { value: e.target.value, error_label: '', validation: '', status: 'valid' } });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({ isAuth: this.props.isAuth });
        }
    }, {
        key: 'renderMessage',
        value: function renderMessage(location) {
            var _ref = location.state || { from: { pathname: '/' } },
                from = _ref.from;

            return from.pathname === '/' ? _react2.default.createElement(
                'p',
                {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 114
                    },
                    __self: this
                },
                'Enter your email address and password'
            ) : _react2.default.createElement(
                'p',
                {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 114
                    },
                    __self: this
                },
                'You must log in to view the page at ',
                _react2.default.createElement(
                    'code',
                    {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 114
                        },
                        __self: this
                    },
                    from.pathname
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var redirect = function redirect() {
                if (_this2.state.isAuth) {
                    return _react2.default.createElement(_reactRouterDom.Redirect, { to: _this2.props.history.location.pathname !== '/login' ? _this2.props.history.location.pathname : '/portal', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 119
                        },
                        __self: _this2
                    });
                } else if (!_this2.state.modalIsOpen) {
                    return _react2.default.createElement(_reactRouterDom.Redirect, { to: _this2.props.history.location.pathname !== '/login' ? _this2.props.history.location.pathname : '/', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 120
                        },
                        __self: _this2
                    });
                } else return;
            };
            return _react2.default.createElement(
                'section',
                { className: 'auth-section', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 123
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
                            lineNumber: 124
                        },
                        __self: this
                    },
                    this.renderMessage(this.props.location),
                    _react2.default.createElement(
                        'form',
                        { onSubmit: this.login, className: this.props.isAuth ? 'auth-form hidden' : 'auth-form', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 130
                            },
                            __self: this
                        },
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 131
                                },
                                __self: this
                            },
                            _react2.default.createElement(
                                'div',
                                { className: 'required', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 132
                                    },
                                    __self: this
                                },
                                this.state.username_field.error_label
                            ),
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'username', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 133
                                    },
                                    __self: this
                                },
                                _react2.default.createElement('i', { className: 'fa fa-user-o', 'aria-hidden': 'true', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 133
                                    },
                                    __self: this
                                })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: this.state.username_field.status !== 'error' ? 'hidden' : 'validation', required: true, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 134
                                    },
                                    __self: this
                                },
                                this.state.username_field.validation
                            ),
                            _react2.default.createElement('input', { type: 'email', name: 'username', placeholder: 'you@example.com', value: this.state.username_field.value, onChange: this.handleInput, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 135
                                },
                                __self: this
                            })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 137
                                },
                                __self: this
                            },
                            _react2.default.createElement(
                                'div',
                                { className: 'required', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 138
                                    },
                                    __self: this
                                },
                                this.state.password_field.error_label
                            ),
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'password', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 139
                                    },
                                    __self: this
                                },
                                _react2.default.createElement('i', { className: 'fa fa-key', 'aria-hidden': 'true', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 139
                                    },
                                    __self: this
                                })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: this.state.password_field.status !== 'error' ? 'hidden' : 'validation', required: true, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 140
                                    },
                                    __self: this
                                },
                                this.state.password_field.validation
                            ),
                            _react2.default.createElement('input', { type: 'text', name: 'password', placeholder: 'ex: abc123D$', value: this.state.dots, onChange: this.handleInput, onKeyDown: this.handleDelete, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 141
                                },
                                __self: this
                            })
                        ),
                        _react2.default.createElement(
                            'button',
                            { onClick: this.login, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 143
                                },
                                __self: this
                            },
                            'Log In'
                        )
                    ),
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/signup', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 145
                            },
                            __self: this
                        },
                        'Click here to Signup'
                    )
                ),
                redirect()
            );
        }
    }]);

    return Authentication;
}(_react.Component);

exports.default = Authentication;