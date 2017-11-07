'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _jsxFileName = 'client/src/Components/AllPolls.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _helpers = require('../utils/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AllPolls = function (_Component) {
    _inherits(AllPolls, _Component);

    function AllPolls(props) {
        _classCallCheck(this, AllPolls);

        var _this = _possibleConstructorReturn(this, (AllPolls.__proto__ || Object.getPrototypeOf(AllPolls)).call(this, props));

        _this.state = {
            polls: []
        };
        return _this;
    }

    _createClass(AllPolls, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            (0, _helpers.getAllUsersPolls)().then(function (res) {
                _this2.setState({ polls: res.polls });
            }).catch(function (err) {
                return alert(JSON.stringify(err, null, 2));
            });
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
                        lineNumber: 22
                    },
                    __self: this
                },
                polls.map(function (poll, index) {
                    return _react2.default.createElement(
                        'li',
                        { key: index, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 25
                            },
                            __self: _this3
                        },
                        _react2.default.createElement(
                            _reactRouterDom.Link,
                            { to: poll.polls.url, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 25
                                },
                                __self: _this3
                            },
                            poll.polls.title
                        )
                    );
                })
            );else return _react2.default.createElement(
                'p',
                {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 30
                    },
                    __self: this
                },
                'There are currently no saved polls. Please login or create an account to add the first poll.'
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'section',
                { className: 'polls-list-section', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 35
                    },
                    __self: this
                },
                _react2.default.createElement(
                    'h1',
                    {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 36
                        },
                        __self: this
                    },
                    'All Polls'
                ),
                this.renderPolls(this.state.polls)
            );
        }
    }]);

    return AllPolls;
}(_react.Component);

exports.default = AllPolls;