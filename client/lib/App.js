'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _jsxFileName = 'client/src/App.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _LogIn = require('./Components/LogIn');

var _LogIn2 = _interopRequireDefault(_LogIn);

var _LogOut = require('./Components/LogOut');

var _LogOut2 = _interopRequireDefault(_LogOut);

var _Signup = require('./Components/Signup');

var _Signup2 = _interopRequireDefault(_Signup);

var _AllPolls = require('./Components/AllPolls');

var _AllPolls2 = _interopRequireDefault(_AllPolls);

var _SinglePoll = require('./Components/SinglePoll');

var _SinglePoll2 = _interopRequireDefault(_SinglePoll);

var _UserPortal = require('./Components/UserPortal');

var _UserPortal2 = _interopRequireDefault(_UserPortal);

var _PortalMessage = require('./Components/PortalMessage');

var _PortalMessage2 = _interopRequireDefault(_PortalMessage);

var _PollEditor = require('./Components/PollEditor');

var _PollEditor2 = _interopRequireDefault(_PollEditor);

var _AllUserPolls = require('./Components/AllUserPolls');

var _AllUserPolls2 = _interopRequireDefault(_AllUserPolls);

var _UserIncompletePolls = require('./Components/UserIncompletePolls');

var _UserIncompletePolls2 = _interopRequireDefault(_UserIncompletePolls);

var _UserCompletePolls = require('./Components/UserCompletePolls');

var _UserCompletePolls2 = _interopRequireDefault(_UserCompletePolls);

var _SearchPolls = require('./Components/SearchPolls');

var _SearchPolls2 = _interopRequireDefault(_SearchPolls);

var _Home = require('./Components/Home');

var _Home2 = _interopRequireDefault(_Home);

var _NoMatch = require('./Components/NoMatch');

var _NoMatch2 = _interopRequireDefault(_NoMatch);

var _helpers = require('./utils/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
    _inherits(App, _Component);

    function App(props) {
        var _this2 = this;

        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.renderLoginControl = function (auth) {
            if (auth == true) return _react2.default.createElement(
                _reactRouterDom.Link,
                { to: '/logout', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 43
                    },
                    __self: _this2
                },
                'Logout'
            );else return _react2.default.createElement(
                'div',
                { className: 'login-links', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 44
                    },
                    __self: _this2
                },
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/login', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 44
                        },
                        __self: _this2
                    },
                    'Login'
                ),
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/signup', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 44
                        },
                        __self: _this2
                    },
                    'Signup'
                )
            );
        };

        _this.renderPortal = function (auth) {
            if (auth == true) return _react2.default.createElement(_UserPortal2.default, { isAuth: _this.state.isAuth, userId: _this.state.userId, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 48
                },
                __self: _this2
            });else return null;
        };

        _this.state = {
            isAuth: !!props.isAuth,
            userId: props.userId
        };
        _this.updateAuth = _this.updateAuth.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'updateAuth',
        value: function updateAuth(bool, creatorId) {
            this.setState({ isAuth: bool, userId: creatorId });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            (0, _helpers.getSession)().then(function (res) {
                _this3.setState({ userId: res.user, isAuth: res.isAuth });
            }).catch(function (err) {
                return console.error(err);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            return _react2.default.createElement(
                'div',
                {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 62
                    },
                    __self: this
                },
                _react2.default.createElement(
                    'header',
                    {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 63
                        },
                        __self: this
                    },
                    _react2.default.createElement(
                        'nav',
                        {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 64
                            },
                            __self: this
                        },
                        _react2.default.createElement(
                            'ul',
                            {
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 65
                                },
                                __self: this
                            },
                            _react2.default.createElement(
                                'li',
                                {
                                    __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 66
                                    },
                                    __self: this
                                },
                                this.renderLoginControl(this.state.isAuth)
                            ),
                            _react2.default.createElement(
                                'li',
                                {
                                    __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 68
                                    },
                                    __self: this
                                },
                                _react2.default.createElement(
                                    _reactRouterDom.Link,
                                    { to: '/polls', __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 68
                                        },
                                        __self: this
                                    },
                                    'View All Polls'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                {
                                    __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 69
                                    },
                                    __self: this
                                },
                                _react2.default.createElement(
                                    _reactRouterDom.Link,
                                    { to: '/portal', __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 69
                                        },
                                        __self: this
                                    },
                                    'User Portal'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(_reactRouterDom.Route, { path: '/login', render: function render(props) {
                            return _react2.default.createElement(_LogIn2.default, Object.assign({ isAuth: _this4.state.isAuth, updateAuth: _this4.updateAuth }, props, {
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 72
                                },
                                __self: _this4
                            }));
                        }, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 72
                        },
                        __self: this
                    }),
                    _react2.default.createElement(_reactRouterDom.Route, { path: '/logout', render: function render(props) {
                            return _react2.default.createElement(_LogOut2.default, Object.assign({ isAuth: _this4.state.isAuth, updateAuth: _this4.updateAuth }, props, {
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 73
                                },
                                __self: _this4
                            }));
                        }, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 73
                        },
                        __self: this
                    }),
                    _react2.default.createElement(_reactRouterDom.Route, { path: '/signup', render: function render(props) {
                            return _react2.default.createElement(_Signup2.default, Object.assign({ isAuth: _this4.state.isAuth, updateAuth: _this4.updateAuth }, props, {
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 74
                                },
                                __self: _this4
                            }));
                        }, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 74
                        },
                        __self: this
                    })
                ),
                _react2.default.createElement(
                    'main',
                    {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 76
                        },
                        __self: this
                    },
                    this.renderPortal(this.state.isAuth),
                    _react2.default.createElement(
                        'div',
                        { className: 'container', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 78
                            },
                            __self: this
                        },
                        _react2.default.createElement(
                            _reactRouterDom.Switch,
                            {
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 79
                                },
                                __self: this
                            },
                            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _Home2.default, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 80
                                },
                                __self: this
                            }),
                            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/portal', render: function render(props) {
                                    return _react2.default.createElement(_PortalMessage2.default, Object.assign({ userId: _this4.state.userId, isAuth: _this4.state.isAuth }, props, {
                                        __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 81
                                        },
                                        __self: _this4
                                    }));
                                }, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 81
                                },
                                __self: this
                            }),
                            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/polls', component: _AllPolls2.default, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 82
                                },
                                __self: this
                            }),
                            _react2.default.createElement(_reactRouterDom.Route, { path: '/polls/single/:id/:title', render: function render(props) {
                                    return _react2.default.createElement(_SinglePoll2.default, Object.assign({ userId: _this4.state.userId, isAuth: _this4.state.isAuth }, props, {
                                        __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 83
                                        },
                                        __self: _this4
                                    }));
                                }, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 83
                                },
                                __self: this
                            }),
                            _react2.default.createElement(_reactRouterDom.Route, { path: '/edit/my/:pollId', render: function render(props) {
                                    return _react2.default.createElement(_PollEditor2.default, Object.assign({ isAuth: _this4.state.isAuth, userId: _this4.state.userId }, props, {
                                        __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 84
                                        },
                                        __self: _this4
                                    }));
                                }, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 84
                                },
                                __self: this
                            }),
                            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/create/new', render: function render(props) {
                                    return _react2.default.createElement(_PollEditor2.default, Object.assign({ isAuth: _this4.state.isAuth, userId: _this4.state.userId }, props, {
                                        __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 85
                                        },
                                        __self: _this4
                                    }));
                                }, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 85
                                },
                                __self: this
                            }),
                            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/all/my', render: function render(props) {
                                    return _react2.default.createElement(_AllUserPolls2.default, Object.assign({ isAuth: _this4.state.isAuth, userId: _this4.state.userId }, props, {
                                        __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 86
                                        },
                                        __self: _this4
                                    }));
                                }, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 86
                                },
                                __self: this
                            }),
                            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/incomplete/my', render: function render(props) {
                                    return _react2.default.createElement(_UserIncompletePolls2.default, Object.assign({ isAuth: _this4.state.isAuth, userId: _this4.state.userId }, props, {
                                        __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 87
                                        },
                                        __self: _this4
                                    }));
                                }, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 87
                                },
                                __self: this
                            }),
                            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/complete/my', render: function render(props) {
                                    return _react2.default.createElement(_UserCompletePolls2.default, Object.assign({ isAuth: _this4.state.isAuth, userId: _this4.state.userId }, props, {
                                        __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 88
                                        },
                                        __self: _this4
                                    }));
                                }, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 88
                                },
                                __self: this
                            }),
                            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/search/:userId/:terms', render: function render(props) {
                                    return _react2.default.createElement(_SearchPolls2.default, Object.assign({ isAuth: _this4.state.isAuth, userId: _this4.state.userId }, props, {
                                        __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 89
                                        },
                                        __self: _this4
                                    }));
                                }, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 89
                                },
                                __self: this
                            }),
                            _react2.default.createElement(_reactRouterDom.Route, { path: '/*', component: _NoMatch2.default, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 90
                                },
                                __self: this
                            })
                        )
                    )
                ),
                _react2.default.createElement(
                    'footer',
                    {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 94
                        },
                        __self: this
                    },
                    _react2.default.createElement('div', { className: 'container', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 95
                        },
                        __self: this
                    })
                )
            );
        }
    }]);

    return App;
}(_react.Component);

exports.default = App;