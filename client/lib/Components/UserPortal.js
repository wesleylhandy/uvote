'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _jsxFileName = 'client/src/Components/UserPortal.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserPortal = function (_Component) {
    _inherits(UserPortal, _Component);

    function UserPortal(props) {
        _classCallCheck(this, UserPortal);

        var _this = _possibleConstructorReturn(this, (UserPortal.__proto__ || Object.getPrototypeOf(UserPortal)).call(this, props));

        _this.state = {
            userId: props.userId,
            isAuth: props.isAuth,
            searchTerm: ''
        };
        _this.handleInput.bind(_this);
        return _this;
    }

    _createClass(UserPortal, [{
        key: 'handleInput',
        value: function handleInput(e) {
            e.preventDefault();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'section',
                { className: 'portal-section', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 21
                    },
                    __self: this
                },
                _react2.default.createElement(
                    'div',
                    { className: 'user-options', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 23
                        },
                        __self: this
                    },
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/create/new', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 24
                            },
                            __self: this
                        },
                        _react2.default.createElement(
                            'button',
                            { className: 'option-create', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 24
                                },
                                __self: this
                            },
                            'Create Poll ',
                            _react2.default.createElement('i', { className: 'fa fa-certificate', 'aria-hidden': 'true', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 24
                                },
                                __self: this
                            })
                        )
                    ),
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/all/my', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 25
                            },
                            __self: this
                        },
                        _react2.default.createElement(
                            'button',
                            { className: 'option-view-all', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 25
                                },
                                __self: this
                            },
                            'All My Polls ',
                            _react2.default.createElement('i', { className: 'fa fa-folder', 'aria-hidden': 'true', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 25
                                },
                                __self: this
                            })
                        )
                    ),
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/incomplete/my', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 26
                            },
                            __self: this
                        },
                        _react2.default.createElement(
                            'button',
                            { className: 'option-view-incomplete', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 26
                                },
                                __self: this
                            },
                            'Incomplete Polls ',
                            _react2.default.createElement('i', { className: 'fa fa-unlock-alt', 'aria-hidden': 'true', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 26
                                },
                                __self: this
                            })
                        )
                    ),
                    _react2.default.createElement(
                        _reactRouterDom.Link,
                        { to: '/complete/my', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 27
                            },
                            __self: this
                        },
                        _react2.default.createElement(
                            'button',
                            { className: 'option-view-complete', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 27
                                },
                                __self: this
                            },
                            'Active Polls ',
                            _react2.default.createElement('i', { className: 'fa fa-lock', 'aria-hidden': 'true', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 27
                                },
                                __self: this
                            })
                        )
                    )
                )
            );
        }
    }]);

    return UserPortal;
}(_react.Component);

exports.default = UserPortal;