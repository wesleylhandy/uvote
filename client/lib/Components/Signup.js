'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _jsxFileName = 'client/src/Components/Signup.js';

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

var SignUp = function (_Component) {
    _inherits(SignUp, _Component);

    function SignUp(props) {
        _classCallCheck(this, SignUp);

        var _this = _possibleConstructorReturn(this, (SignUp.__proto__ || Object.getPrototypeOf(SignUp)).call(this, props));

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
            isAuth: false
        };
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleInput = _this.handleInput.bind(_this);
        _this.handleDelete = _this.handleDelete.bind(_this);
        _this.closeModal = _this.closeModal.bind(_this);
        return _this;
    }

    _createClass(SignUp, [{
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
        key: 'isValidEmail',
        value: function isValidEmail(username) {
            return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(username)
            );
        }
    }, {
        key: 'isValidPassword',
        value: function isValidPassword(password) {
            return (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/.test(password)
            );
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            var _this2 = this;

            e.preventDefault();
            var isValid = true;
            if (!this.isValidEmail(this.state.username_field.value)) {
                this.setState({ username_field: {
                        error_label: '*',
                        value: '',
                        status: 'error',
                        validation: 'Please enter a valid email address'
                    } });

                isValid = false;
            }
            if (!this.isValidPassword(this.state.password_field.value)) {
                this.setState({ password_field: {
                        error_label: '*',
                        value: '',
                        status: 'error',
                        validation: 'At least 8 digits + 1 from each: [a - z], [A - Z], [0 - 9] & [ #?!@$%^&*-_ ].'
                    } });

                isValid = false;
            }
            if (isValid) {
                (0, _helpers.newUser)({ username: this.state.username_field.value, password: this.state.password_field.value }).then(function (user) {
                    _this2.setState({ isAuth: true });
                    _this2.props.updateAuth(true, user.creatorId);
                }).catch(function (err) {
                    switch (err.title) {
                        case 'Insecure Password':
                            _this2.setState({ password_field: {
                                    error_label: '*',
                                    value: '',
                                    status: 'error',
                                    validation: err.title + ': ' + err.message
                                } });
                            break;
                        case 'Duplicate Username':
                        case 'Invalid Username':
                            _this2.setState({ username_field: {
                                    error_label: '*',
                                    value: '',
                                    status: 'error',
                                    validation: err.title + ': ' + err.message
                                } });
                            break;
                        default:
                            alert(JSON.stringify(err, null, 2));
                            break;
                    }
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({ isAuth: this.props.isAuth });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var redirect = function redirect() {
                if (_this3.state.isAuth) {
                    return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/portal', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 136
                        },
                        __self: _this3
                    });
                } else if (!_this3.state.modalIsOpen) {
                    return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 137
                        },
                        __self: _this3
                    });
                } else return;
            };
            return _react2.default.createElement(
                'section',
                { className: 'auth-section', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 140
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
                            lineNumber: 141
                        },
                        __self: this
                    },
                    _react2.default.createElement(
                        'p',
                        {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 146
                            },
                            __self: this
                        },
                        'Please Choose a Username and Password'
                    ),
                    _react2.default.createElement(
                        'form',
                        { onSubmit: this.handleSubmit, className: 'auth-form', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 147
                            },
                            __self: this
                        },
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 148
                                },
                                __self: this
                            },
                            _react2.default.createElement(
                                'div',
                                { className: 'required', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 149
                                    },
                                    __self: this
                                },
                                this.state.username_field.error_label
                            ),
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'username', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 150
                                    },
                                    __self: this
                                },
                                _react2.default.createElement('i', { className: 'fa fa-user-o', 'aria-hidden': 'true', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 150
                                    },
                                    __self: this
                                })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: this.state.username_field.status !== 'error' ? 'hidden' : 'validation', required: true, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 151
                                    },
                                    __self: this
                                },
                                this.state.username_field.validation
                            ),
                            _react2.default.createElement('input', { type: 'email', name: 'username', placeholder: 'you@example.com', value: this.state.username_field.value, onChange: this.handleInput, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 152
                                },
                                __self: this
                            })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'form-group', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 154
                                },
                                __self: this
                            },
                            _react2.default.createElement(
                                'div',
                                { className: 'required', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 155
                                    },
                                    __self: this
                                },
                                this.state.password_field.error_label
                            ),
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'password', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 156
                                    },
                                    __self: this
                                },
                                _react2.default.createElement('i', { className: 'fa fa-key', 'aria-hidden': 'true', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 156
                                    },
                                    __self: this
                                })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: this.state.password_field.status !== 'error' ? 'hidden' : 'validation', required: true, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 157
                                    },
                                    __self: this
                                },
                                this.state.password_field.validation
                            ),
                            _react2.default.createElement('input', { type: 'text', name: 'password', placeholder: 'ex: abc123D$', value: this.state.dots, onChange: this.handleInput, onKeyDown: this.handleDelete, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 158
                                },
                                __self: this
                            })
                        ),
                        _react2.default.createElement(
                            'button',
                            { onClick: this.handleSubmit, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 160
                                },
                                __self: this
                            },
                            'Sign Up'
                        )
                    ),
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/login', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 162
                            },
                            __self: this
                        },
                        'Click here to login'
                    )
                ),
                redirect()
            );
        }
    }]);

    return SignUp;
}(_react.Component);

exports.default = SignUp;