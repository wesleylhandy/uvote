'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _jsxFileName = 'client/src/Components/AllUserPolls.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _helpers = require('../utils/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AllMyPolls = function (_Component) {
    _inherits(AllMyPolls, _Component);

    function AllMyPolls(props) {
        _classCallCheck(this, AllMyPolls);

        var _this = _possibleConstructorReturn(this, (AllMyPolls.__proto__ || Object.getPrototypeOf(AllMyPolls)).call(this, props));

        _this.state = {
            polls: [],
            userId: props.userId,
            isAuth: props.isAuth
        };
        _this.renderPolls.bind(_this);
        return _this;
    }

    _createClass(AllMyPolls, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            if (this.state.userId) {
                (0, _helpers.getAllMyPolls)(this.state.userId, this.state.isAuth).then(function (res) {
                    _this2.setState({ polls: res.polls });
                }).catch(function (err) {
                    return alert(JSON.stringify(err, null, 2));
                });
            }
        }
    }, {
        key: 'renderPolls',
        value: function renderPolls(polls) {
            var _this3 = this;

            if (polls && polls.length) return _react2.default.createElement(
                'ul',
                {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 27
                    },
                    __self: this
                },
                polls.map(function (poll, index) {
                    if (poll.status === 'complete') {
                        return _react2.default.createElement(
                            'li',
                            { key: index, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 32
                                },
                                __self: _this3
                            },
                            _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: poll.url, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 33
                                    },
                                    __self: _this3
                                },
                                poll.title
                            ),
                            _react2.default.createElement(
                                'span',
                                {
                                    __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 34
                                    },
                                    __self: _this3
                                },
                                ' Status - ',
                                poll.status
                            )
                        );
                    } else {
                        var endpoint = '/edit/my/' + poll._id;
                        return _react2.default.createElement(
                            'li',
                            { key: index, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 40
                                },
                                __self: _this3
                            },
                            _react2.default.createElement(
                                _reactRouterDom.Link,
                                { to: endpoint, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 41
                                    },
                                    __self: _this3
                                },
                                poll.hasOwnProperty('title') ? poll.title : poll._id
                            ),
                            _react2.default.createElement(
                                'span',
                                {
                                    __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 42
                                    },
                                    __self: _this3
                                },
                                ' Status - ',
                                poll.status
                            )
                        );
                    }
                })
            );else return _react2.default.createElement(
                'p',
                {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 50
                    },
                    __self: this
                },
                'You have not yet created any polls. Please ',
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/create/new', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 50
                        },
                        __self: this
                    },
                    'Click Here'
                ),
                ' to create your first poll.'
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'section',
                { className: 'polls-list-section', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 54
                    },
                    __self: this
                },
                this.renderPolls(this.state.polls)
            );
        }
    }]);

    return AllMyPolls;
}(_react.Component);

exports.default = AllMyPolls;