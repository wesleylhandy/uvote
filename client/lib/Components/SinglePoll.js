'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _jsxFileName = 'client/src/Components/SinglePoll.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactChartjs = require('react-chartjs-2');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _helpers = require('../utils/helpers');

var _TwitterLogo = require('./TwitterLogo.js');

var _TwitterLogo2 = _interopRequireDefault(_TwitterLogo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Poll = function (_Component) {
    _inherits(Poll, _Component);

    function Poll(props) {
        _classCallCheck(this, Poll);

        var _this = _possibleConstructorReturn(this, (Poll.__proto__ || Object.getPrototypeOf(Poll)).call(this, props));

        _this.state = {
            creatorId: props.match.params.id,
            title: props.match.params.title,
            poll: null,
            url: '',
            userId: props.userId,
            isAuth: props.isAuth,
            hasVoted: false,
            optionChecked: null
        };
        _this.renderInputs = _this.renderInputs.bind(_this);
        _this.renderChart = _this.renderChart.bind(_this);
        _this.handleOptionChange = _this.handleOptionChange.bind(_this);
        _this.handleVote = _this.handleVote.bind(_this);
        _this.updatePollData = _this.updatePollData.bind(_this);
        return _this;
    }

    _createClass(Poll, [{
        key: 'updatePollData',
        value: function updatePollData() {
            var _this2 = this;

            //get poll data on mount or after vote
            (0, _helpers.getSinglePoll)(this.state.creatorId, this.state.title).then(function (res) {
                var hasVoted = _this2.state.hasVoted || res.poll.voters.includes(_this2.state.userId) ? true : false;
                _this2.setState({ poll: res.poll, hasVoted: hasVoted, url: res.poll.url });
            }).catch(function (err) {
                return alert(JSON.stringify(err, null, 2));
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            (0, _helpers.getSession)().then(function (res) {
                _this3.setState({ userId: res.user, isAuth: res.isAuth });
                if (!_this3.state.userId) {
                    var userId = 'guest' + _shortid2.default.generate();
                    (0, _helpers.guestUser)(userId).then(function (res) {
                        return _this3.setState({ userId: userId, isAuth: false });
                    }).catch(function (err) {
                        return alert(JSON.stringify(err, null, 2));
                    });
                }
            }).catch(function (err) {
                return console.error(err);
            });

            this.updatePollData();
        }
    }, {
        key: 'renderInputs',
        value: function renderInputs(poll) {
            var _this4 = this;

            if (poll && !this.state.hasVoted) {
                return _react2.default.createElement(
                    'form',
                    { onSubmit: this.handleVote, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 55
                        },
                        __self: this
                    },
                    poll.inputs.map(function (input, index) {
                        return _react2.default.createElement(
                            'div',
                            { className: _this4.state.optionChecked === input._id ? 'input-group checked' : 'input-group', key: index, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 57
                                },
                                __self: _this4
                            },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: input._id, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 58
                                    },
                                    __self: _this4
                                },
                                input.title
                            ),
                            _react2.default.createElement('input', { type: 'radio',
                                value: input.title,
                                name: input._id,
                                disabled: _this4.state.hasVoted,
                                checked: _this4.state.optionChecked === input._id ? true : false,
                                onChange: _this4.handleOptionChange,
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 59
                                },
                                __self: _this4
                            })
                        );
                    }),
                    _react2.default.createElement(
                        'button',
                        { type: 'submit', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 68
                            },
                            __self: this
                        },
                        'Submit'
                    )
                );
            } else if (poll) {
                return null;
            } else return _react2.default.createElement(
                'div',
                { className: 'no-data', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 73
                    },
                    __self: this
                },
                'Poll could not be found in the database. It is possible the creator deleted the poll.'
            );
        }
    }, {
        key: 'renderChart',
        value: function renderChart(poll) {
            if (poll) {
                var votes = 0;
                var obj = {
                    labels: [],
                    colors: [],
                    data: []
                };

                poll.inputs.forEach(function (input, ind, arr) {
                    obj.labels.push(input.title);
                    obj.colors.push('hsla(' + (360 / arr.length * ind + 20) + ', 100%, 45%, 0.9)');
                    obj.data.push(input.votes);
                    votes += input.votes;
                });

                var data = {
                    datasets: [{
                        data: obj.data,
                        backgroundColor: obj.colors
                    }],
                    labels: obj.labels
                };
                if (votes) return _react2.default.createElement(
                    'div',
                    { className: 'poll-visualization', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 98
                        },
                        __self: this
                    },
                    _react2.default.createElement(_reactChartjs.Doughnut, { data: data, ref: 'chart', width: 400, height: 400, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 98
                        },
                        __self: this
                    })
                );
            } else {
                //this should never return....
                ///but...
                return _react2.default.createElement(
                    'div',
                    { className: 'no-data', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 103
                        },
                        __self: this
                    },
                    'No Data is Available for the poll at ',
                    this.props.history.location.pathname
                );
            }
        }
    }, {
        key: 'handleOptionChange',
        value: function handleOptionChange(e) {
            this.setState({
                optionChecked: e.target.name
            });
        }
    }, {
        key: 'handleVote',
        value: function handleVote(e) {
            var _this5 = this;

            e.preventDefault();

            (0, _helpers.vote)(this.state.title, this.state.optionChecked, this.state.creatorId, this.state.userId).then(function (res) {
                _this5.setState({ hasVoted: true });
                _this5.updatePollData();
            }).catch(function (err) {
                return alert(JSON.stringify(err, null, 2));
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'section',
                { className: 'poll', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 124
                    },
                    __self: this
                },
                _react2.default.createElement(
                    'div',
                    { className: 'poll-title', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 125
                        },
                        __self: this
                    },
                    decodeURIComponent(this.state.title)
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'poll-container', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 126
                        },
                        __self: this
                    },
                    this.renderInputs(this.state.poll),
                    _react2.default.createElement('hr', { className: this.state.hasVoted ? '' : 'hidden', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 128
                        },
                        __self: this
                    }),
                    this.renderChart(this.state.poll),
                    _react2.default.createElement('hr', {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 130
                        },
                        __self: this
                    }),
                    _react2.default.createElement(
                        'a',
                        { className: 'tweet-container', href: 'https://twitter.com/intent/tweet?text=' + this.state.title + '&url=' + encodeURI('https://u-vote.herokuapp.com' + this.state.url) + '&hashtags=onlinepoll', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 131
                            },
                            __self: this
                        },
                        _react2.default.createElement(_TwitterLogo2.default, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 132
                            },
                            __self: this
                        }),
                        _react2.default.createElement(
                            'div',
                            { className: 'tweet-cta', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 133
                                },
                                __self: this
                            },
                            'Tweet This Poll'
                        )
                    )
                )
            );
        }
    }]);

    return Poll;
}(_react.Component);

exports.default = Poll;