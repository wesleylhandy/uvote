'use strict';

var _jsxFileName = 'client/src/index.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = require('react-router-dom');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

require('./styles/index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = function Router() {
    return _react2.default.createElement(
        _reactRouterDom.BrowserRouter,
        {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 7
            },
            __self: undefined
        },
        _react2.default.createElement(_App2.default, { userId: '', isAuth: 'false', __source: {
                fileName: _jsxFileName,
                lineNumber: 7
            },
            __self: undefined
        })
    );
};

_reactDom2.default.render(_react2.default.createElement(Router, {
    __source: {
        fileName: _jsxFileName,
        lineNumber: 9
    },
    __self: undefined
}), document.getElementById('root'));