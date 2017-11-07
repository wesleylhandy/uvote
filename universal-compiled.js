'use strict';

var _jsxFileName = 'universal.js';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRouterDom = require('react-router-dom');

var _App = require('./client/src/App.js');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function universalLoader(req, res) {
    var _this = this;

    var filePath = _path2.default.join(__dirname, 'client/build/index.html');

    _fs2.default.readFile(filePath, 'utf8', function (err, htmlData) {
        if (err) {
            console.error('read err', err);
            return res.status(404).end();
        }
        var context = {};

        var user = '',
            isAuth = false;
        if (req.isAuthenticated()) {
            user = req.user, isAuth = true;
        } else {
            user = req.session.username, isAuth = false;
        }

        console.log({ App: _App2.default });

        var markup = (0, _server.renderToString)(_react2.default.createElement(
            _reactRouterDom.StaticRouter,
            { location: req.url, context: context, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 31
                },
                __self: _this
            },
            _react2.default.createElement(_App2.default, { userId: user, isAuth: isAuth, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 32
                },
                __self: _this
            })
        ));

        if (context.url) {
            // Somewhere a `<Redirect>` was rendered
            res.redirect(301, context.url);
        } else {
            // we're good, send the response
            var RenderedApp = htmlData.replace(/({{)((.|\n|\r|\t)*)(}})/gm, markup);
            res.send(RenderedApp);
        }
    });
};
