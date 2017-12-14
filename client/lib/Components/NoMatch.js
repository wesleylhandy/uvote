"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = "client/src/Components/NoMatch.js";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
  return _react2.default.createElement(
    "div",
    { className: "no-match", __source: {
        fileName: _jsxFileName,
        lineNumber: 3
      },
      __self: undefined
    },
    "The page you are looking for at ",
    _react2.default.createElement(
      "code",
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 3
        },
        __self: undefined
      },
      props.location.pathname
    ),
    " does not exist."
  );
};