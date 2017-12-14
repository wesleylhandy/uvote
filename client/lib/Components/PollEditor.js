'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _jsxFileName = 'client/src/Components/PollEditor.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _helpers = require('../utils/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dummyOptions = {
    0: 'Captain Kirk',
    1: 'Captain Picard',
    2: "Cap'n Crunch",
    3: 'Captain Hook',
    4: 'Captain Jack Sparrow',
    5: 'Captain America',
    6: 'Captain Morgan',
    7: 'Captain Kangaroo',
    8: 'Captian Caveman',
    9: 'Captain John Miller',
    10: 'Captain Ahab',
    11: 'Enough Already',
    12: 'Seriously?!?',
    13: 'Okay, just one more...NOT!!!',
    14: "Something ain't right here...",
    15: 'Stop',
    16: 'Did you hear what I said, no more - PLEASE!??',
    25: 'You win the prize for least user friendly poll ever!'
};

var PollEditor = function (_Component) {
    _inherits(PollEditor, _Component);

    function PollEditor(props) {
        _classCallCheck(this, PollEditor);

        var _this = _possibleConstructorReturn(this, (PollEditor.__proto__ || Object.getPrototypeOf(PollEditor)).call(this, props));

        _this.state = {
            userId: props.userId,
            title: '',
            titleSaved: false,
            pollURL: '',
            pollSaved: false,
            isAuth: props.isAuth,
            options: [],
            numSavedOptions: 0,
            pollId: props.match.params.pollId || '',
            pollDeleted: false
        };
        _this.handleTitleSave = _this.handleTitleSave.bind(_this);
        _this.handleDeletePoll = _this.handleDeletePoll.bind(_this);
        _this.handleSavePoll = _this.handleSavePoll.bind(_this);
        _this.addOptionInput = _this.addOptionInput.bind(_this);
        _this.handleOptionSave = _this.handleOptionSave.bind(_this);
        _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
        _this.handleInput = _this.handleInput.bind(_this);
        _this.handleClear = _this.handleClear.bind(_this);
        _this.updatePollData = _this.updatePollData.bind(_this);
        _this.handleReturn = _this.handleReturn.bind(_this);
        return _this;
    }

    /*** SPECIFIC EVENT HANDLERS ***/
    // TITLE


    _createClass(PollEditor, [{
        key: 'handleTitleSave',
        value: function handleTitleSave(e) {
            var _this2 = this;

            e.preventDefault();
            (0, _helpers.addTitle)(this.state.userId, this.state.pollId, this.state.title, this.state.isAuth).then(function (res) {
                console.log('Title Saved');_this2.setState({ titleSaved: true, pollURL: res.poll.url });
            }).catch(function (err) {
                return console.error(err);
            });
        }
    }, {
        key: 'handleDeletePoll',
        value: function handleDeletePoll(e) {
            var _this3 = this;

            e.preventDefault();

            (0, _helpers.deletePoll)(this.state.pollId, this.state.userId, this.state.isAuth).then(function (res) {
                return _this3.setState({ pollDeleted: true });
            }).catch(function (err) {
                return console.error(err);
            });
        }
    }, {
        key: 'handleSavePoll',
        value: function handleSavePoll(e) {
            var _this4 = this;

            e.preventDefault();
            if (this.state.titleSaved) {
                (0, _helpers.savePoll)(this.state.userId, this.state.pollId, this.state.isAuth).then(function (success) {
                    return _this4.setState({ pollSaved: true });
                }).catch(function (err) {
                    return console.error(err);
                });
            } else alert("Please save all the elements of your poll before saving the entire poll.");
        }

        //OPTIONS

    }, {
        key: 'addOptionInput',
        value: function addOptionInput(e) {

            var option = {
                order: this.state.options.length ? this.state.options[this.state.options.length - 1].order + 1 : 0,
                title: ''
            };
            var arr = this.state.options.slice();
            arr.push(option);
            this.setState({ options: arr });
        }
    }, {
        key: 'handleOptionSave',
        value: function handleOptionSave(e) {
            var _this5 = this;

            var index = parseInt(e.hasOwnProperty('target') ? e.target.parentNode.id.replace('save', '') : e, 10);
            var options = this.state.options;
            var option = options[index];

            if (option.title.trim()) {

                (0, _helpers.addOption)(this.state.userId, this.state.pollId, option, this.state.isAuth).then(function (res) {
                    _this5.updatePollData(_this5.state.userId, _this5.state.pollId);
                }).catch(function (err) {
                    return console.error(err);
                });
            } else {
                alert("Please Enter A Term or Phrase Before Saving.");
            }
        }
    }, {
        key: 'handleDeleteOption',
        value: function handleDeleteOption(e) {
            var _this6 = this;

            var options = this.state.options;
            // the following regex will return false if e.target.name is a integer or string of real numbers
            //console.log({name: e.target.parentNode.name, test: (/([^0-9])+/igm).test(e.target.name)})
            if (!/([^0-9])+/igm.test(e.target.name)) {
                options.splice(parseInt(e.target.name, 10), 1);
                this.setState({ options: options });
            } else {
                var inputId = e.target.id;
                (0, _helpers.deleteOption)(this.state.userId, this.state.pollId, inputId, this.state.isAuth).then(function (res) {
                    return _this6.updatePollData(_this6.state.userId, _this6.state.pollId);
                }).catch(function (err) {
                    return console.error(err);
                });
            }
        }

        /*** GENERAL EVENT HANDLERS ***/

    }, {
        key: 'handleReturn',
        value: function handleReturn(e) {
            if (e.target.name === 'title' && e.key === "Enter") {
                e.preventDefault();
                return this.handleTitleSave(e.target.name);
            } else if (e.key === "Enter") {
                e.preventDefault();
                return this.handleOptionSave(e.target.name);
            }
        }
    }, {
        key: 'handleInput',
        value: function handleInput(e) {
            e.preventDefault();
            console.log({ input: e.target });
            if (e.target.name === 'title') {
                this.setState({ title: e.target.value });
            } else {
                var options = this.state.options;
                options[e.target.name].title = e.target.value;
                this.setState({ options: options });
            }
        }
    }, {
        key: 'handleClear',
        value: function handleClear(e) {
            e.preventDefault();
            if (e.target.name === 'title') {
                this.setState({ title: '' });
            } else {
                var options = this.state.options;
                options[e.target.name].title = '';
                this.setState({ options: options });
            }
        }
    }, {
        key: 'updatePollData',
        value: function updatePollData(userId, pollId) {
            var _this7 = this;

            (0, _helpers.getUnsavedPoll)(userId, pollId).then(function (res) {
                var title = res.poll && res.poll.hasOwnProperty('title') ? res.poll.title : '';
                var titleSaved = title ? true : false;
                var pollURL = res.poll && res.poll.hasOwnProperty('url') ? res.poll.url : '';
                var numSavedOptions = res.poll.inputs.length;
                for (var i = 0; i < numSavedOptions; i++) {
                    res.poll.inputs[i].saved = true;
                }
                _this7.setState({ title: title, titleSaved: titleSaved, pollURL: pollURL, options: res.poll.inputs, pollId: res.poll._id, numSavedOptions: numSavedOptions });
            }).catch(function (err) {
                return console.error(err);
            });
        }

        /*** LIFECYCLE EVENTS ***/

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this8 = this;

            if (this.props.match.params.pollId) {
                this.updatePollData(this.state.userId, this.props.match.params.pollId);
            } else {
                (0, _helpers.createPoll)(this.props.userId, this.props.isAuth).then(function (res) {
                    return _this8.setState({ pollId: res.poll._id });
                }).catch(function (err) {
                    return console.error(err);
                });
            }
        }
    }, {
        key: 'renderOptions',
        value: function renderOptions(inputs) {
            var _this9 = this;

            if (inputs) {
                return _react2.default.createElement(
                    'div',
                    { className: 'editor-inputs', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 182
                        },
                        __self: this
                    },
                    inputs.map(function (input, index) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'option-input-group', key: index, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 185
                                },
                                __self: _this9
                            },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: input.saved ? "saved" + index : index, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 186
                                    },
                                    __self: _this9
                                },
                                'Option ',
                                index + 1
                            ),
                            _react2.default.createElement('input', {
                                type: 'text',
                                value: input.title,
                                name: input.saved ? "saved" + index : index,
                                onKeyDown: _this9.handleReturn,
                                onChange: _this9.handleInput,
                                placeholder: index < 17 || index === 25 ? dummyOptions[index] : 'I give in, just keep adding as many as you like',
                                disabled: input.saved ? true : false,
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 187
                                },
                                __self: _this9
                            }),
                            _react2.default.createElement(
                                'button',
                                { id: 'save' + index, className: input.saved ? 'hidden' : 'save-button', onClick: _this9.handleOptionSave, name: input.saved ? "saved" + index : index, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 196
                                    },
                                    __self: _this9
                                },
                                _react2.default.createElement('i', { className: 'fa fa-floppy-o', 'aria-hidden': 'true', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 196
                                    },
                                    __self: _this9
                                })
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: input.saved ? 'hidden' : 'clear-button', onClick: _this9.handleClear, name: input.saved ? "saved" + index : index, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 197
                                    },
                                    __self: _this9
                                },
                                _react2.default.createElement('i', { className: 'fa fa-eraser', 'aria-hidden': 'true', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 197
                                    },
                                    __self: _this9
                                })
                            ),
                            _react2.default.createElement(
                                'button',
                                { id: input.hasOwnProperty('_id') ? input._id : 'id' + index, className: 'delete-button', onClick: _this9.handleDeleteOption, name: input.saved ? "saved" + index : index, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 198
                                    },
                                    __self: _this9
                                },
                                _react2.default.createElement('i', { className: 'fa fa-trash-o', 'aria-hidden': 'true', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 198
                                    },
                                    __self: _this9
                                })
                            )
                        );
                    })
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.props.userId && this.props.isAuth) {
                if (!this.state.pollSaved && !this.state.pollDeleted) {
                    return _react2.default.createElement(
                        'div',
                        { className: 'poll-editor', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 212
                            },
                            __self: this
                        },
                        _react2.default.createElement(
                            'div',
                            { className: 'title-input-group', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 213
                                },
                                __self: this
                            },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'title', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 214
                                    },
                                    __self: this
                                },
                                'Title'
                            ),
                            _react2.default.createElement('input', {
                                type: 'text',
                                value: this.state.title,
                                name: 'title',
                                placeholder: 'Who do you want to be your captain?',
                                onKeyDown: this.handleReturn,
                                onChange: this.handleInput,
                                disabled: this.state.titleSaved ? true : false,
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 215
                                },
                                __self: this
                            }),
                            _react2.default.createElement(
                                'button',
                                { className: this.state.titleSaved ? 'hidden' : 'save-button', onClick: this.handleTitleSave, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 224
                                    },
                                    __self: this
                                },
                                _react2.default.createElement('i', { className: 'fa fa-floppy-o', 'aria-hidden': 'true', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 224
                                    },
                                    __self: this
                                })
                            ),
                            _react2.default.createElement(
                                'button',
                                { className: this.state.titleSaved ? 'hidden' : 'clear-button', onClick: this.handleClear, name: 'title', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 225
                                    },
                                    __self: this
                                },
                                _react2.default.createElement('i', { className: 'fa fa-eraser', 'aria-hidden': 'true', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 225
                                    },
                                    __self: this
                                })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'option-inputs', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 228
                                },
                                __self: this
                            },
                            this.renderOptions(this.state.options),
                            _react2.default.createElement(
                                'div',
                                { className: 'poll-controls', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 230
                                    },
                                    __self: this
                                },
                                _react2.default.createElement(
                                    'button',
                                    { className: this.state.options.length === this.state.numSavedOptions ? 'add-button' : 'hidden', onClick: this.addOptionInput, __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 231
                                        },
                                        __self: this
                                    },
                                    'New Option ',
                                    _react2.default.createElement('i', { className: 'fa fa-plus-square-o', 'aria-hidden': 'true', __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 231
                                        },
                                        __self: this
                                    })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'save-delete', __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 232
                                        },
                                        __self: this
                                    },
                                    _react2.default.createElement(
                                        'button',
                                        { className: this.state.titleSaved && this.state.numSavedOptions >= 2 && this.state.options.length === this.state.numSavedOptions ? 'save-button' : 'hidden', onClick: this.handleSavePoll, __source: {
                                                fileName: _jsxFileName,
                                                lineNumber: 233
                                            },
                                            __self: this
                                        },
                                        'Save Poll ',
                                        _react2.default.createElement('i', { className: 'fa fa-floppy-o', 'aria-hidden': 'true', __source: {
                                                fileName: _jsxFileName,
                                                lineNumber: 233
                                            },
                                            __self: this
                                        })
                                    ),
                                    _react2.default.createElement(
                                        'button',
                                        { className: 'delete-button', onClick: this.handleDeletePoll, __source: {
                                                fileName: _jsxFileName,
                                                lineNumber: 234
                                            },
                                            __self: this
                                        },
                                        'Delete Poll ',
                                        _react2.default.createElement('i', { className: 'fa fa-trash-o', 'aria-hidden': 'true', __source: {
                                                fileName: _jsxFileName,
                                                lineNumber: 234
                                            },
                                            __self: this
                                        })
                                    )
                                )
                            )
                        )
                    );
                } else if (this.state.pollDeleted) {
                    return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/all/my', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 241
                        },
                        __self: this
                    });
                } else return _react2.default.createElement(_reactRouterDom.Redirect, { to: {
                        pathname: this.state.pollURL,
                        state: { from: { pathname: this.props.location } }
                    }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 242
                    },
                    __self: this
                });
            } else return _react2.default.createElement(_reactRouterDom.Redirect, { to: {
                    pathname: '/login',
                    state: { from: { pathname: this.props.location } }
                }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 246
                },
                __self: this
            });
        }
    }]);

    return PollEditor;
}(_react.Component);

exports.default = PollEditor;