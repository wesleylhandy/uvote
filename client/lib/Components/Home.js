'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'client/src/Components/Home.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NoMatch = function (_Component) {
  _inherits(NoMatch, _Component);

  function NoMatch() {
    _classCallCheck(this, NoMatch);

    return _possibleConstructorReturn(this, (NoMatch.__proto__ || Object.getPrototypeOf(NoMatch)).apply(this, arguments));
  }

  _createClass(NoMatch, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'home-page', __source: {
            fileName: _jsxFileName,
            lineNumber: 6
          },
          __self: this
        },
        _react2.default.createElement(
          'div',
          { className: 'welcome__title', __source: {
              fileName: _jsxFileName,
              lineNumber: 7
            },
            __self: this
          },
          'Welcome to uVote - Polls by You for the People'
        ),
        _react2.default.createElement(
          'ul',
          { className: 'welcome__intro', __source: {
              fileName: _jsxFileName,
              lineNumber: 8
            },
            __self: this
          },
          _react2.default.createElement(
            'li',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 9
              },
              __self: this
            },
            'Do you have a burning desire to know whether your friends prefer Tea over Coffee?'
          ),
          _react2.default.createElement(
            'li',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 10
              },
              __self: this
            },
            'Are you curious to find out if people like Cats more than Dogs?'
          ),
          _react2.default.createElement(
            'li',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 11
              },
              __self: this
            },
            'Or what is that profound question that you just need answered by the consensus of the masses?'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'welcome__title--small', __source: {
              fileName: _jsxFileName,
              lineNumber: 14
            },
            __self: this
          },
          'This app is for you.'
        ),
        _react2.default.createElement(
          'div',
          { className: 'welcome__intructions', __source: {
              fileName: _jsxFileName,
              lineNumber: 15
            },
            __self: this
          },
          _react2.default.createElement(
            'div',
            { className: 'welcome__instructions--heading', __source: {
                fileName: _jsxFileName,
                lineNumber: 16
              },
              __self: this
            },
            'How Does it Work?'
          ),
          _react2.default.createElement(
            'div',
            { className: 'welcome__instructions--text', __source: {
                fileName: _jsxFileName,
                lineNumber: 17
              },
              __self: this
            },
            'You can view all the previously created polls by any user by clicking on the ',
            _react2.default.createElement(
              'span',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 17
                },
                __self: this
              },
              '\u201CView All Polls\u201D'
            ),
            ' tab in the navigation bar at the top. This will produce a list of all current polls, any of which you can cast a vote for your favorite option.'
          ),
          _react2.default.createElement(
            'div',
            { className: 'welcome__instructions--text', __source: {
                fileName: _jsxFileName,
                lineNumber: 18
              },
              __self: this
            },
            'The ',
            _react2.default.createElement(
              'span',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 18
                },
                __self: this
              },
              '\u201CUser Portal\u201D'
            ),
            ' expands the current navigation and allows you to create new polls, edit incomplete polls, and even delete polls. However, to access the portal, you must first register an account by clicking ',
            _react2.default.createElement(
              'span',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 18
                },
                __self: this
              },
              '\u201CSign Up.\u201D'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'welcome__instructions--text', __source: {
                fileName: _jsxFileName,
                lineNumber: 19
              },
              __self: this
            },
            'Later, you can return to the site and ',
            _react2.default.createElement(
              'span',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 19
                },
                __self: this
              },
              '\u201CLog In\u201D'
            ),
            ' with your credentials.'
          ),
          _react2.default.createElement(
            'div',
            { className: 'welcome__instructions--text', __source: {
                fileName: _jsxFileName,
                lineNumber: 20
              },
              __self: this
            },
            'That\'s pretty much it.'
          ),
          _react2.default.createElement(
            'div',
            { className: 'welcome__instructions--text', __source: {
                fileName: _jsxFileName,
                lineNumber: 21
              },
              __self: this
            },
            'Have Fun and Happy Polling!'
          )
        )
      );
    }
  }]);

  return NoMatch;
}(_react.Component);

exports.default = NoMatch;