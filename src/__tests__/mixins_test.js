jest
  .dontMock('../mixins/asStream.coffee')
  .dontMock('../mixins/streamState.coffee')
  .dontMock('../mixins/targetValue.coffee')
  .dontMock('../util/assign.coffee');

var React = require('react/addons');
var Mixin = require('../index.coffee').Mixin;

var TestUtils = React.addons.TestUtils;

describe('ReactUndo', function () {
  var Component;

  var countNode;
  var stringIncNode;
  var functionIncNode;
  var undefinedIncNode;

  beforeEach(function () {
    Component = React.createClass({
      displayName: "Component",

      mixins: [ Mixin ],

      getInitialState: function () {
        return {
          count: 0
        };
      },

      handleStringInc: function (stream) {
        return stream
          .map(1)
          .scan(this.state.count, function (a, b) { return a + b })
          .skip(1)
          .onValue(this.streamState('count'));
      },

      handleFunctionInc: function (stream) {
        return stream
          .map(1)
          .scan(this.state.count, function (a, b) { return a + b })
          .skip(1)
          .onValue(this.streamState(function (val) {
            return {
              count: val
            }
          }));
      },

      handleUndefinedInc: function (stream) {
        return stream
          .map(1)
          .scan(this.state.count, function (a, b) { return a + b })
          .skip(1)
          .map(function (val) {
            return {
              count: val
            };
          })
          .onValue(this.streamState());
      },

      render: function () {
        return (
          React.createElement("div", null,
            React.createElement("div", {ref: "count"}, this.state.count),
            React.createElement("button", {ref: "stringInc", onClick: this.asStream(this.handleStringInc)}, "inc"),
            React.createElement("button", {ref: "functionInc", onClick: this.asStream(this.handleFunctionInc)}, "inc"),
            React.createElement("button", {ref: "undefinedInc", onClick: this.asStream(this.handleUndefinedInc)}, "inc")
          )
        );
      }
    });

    var instance = React.createElement(Component, {});
    var component = TestUtils.renderIntoDocument(instance);

    countNode = component.refs.count.getDOMNode();
    stringIncNode = component.refs.stringInc.getDOMNode();
    functionIncNode = component.refs.functionInc.getDOMNode();
    undefinedIncNode = component.refs.undefinedInc.getDOMNode();
  });

  it('', function () {
    expect(countNode.innerHTML).toEqual('0');
    TestUtils.Simulate.click(stringIncNode);
    TestUtils.Simulate.click(functionIncNode);
    TestUtils.Simulate.click(undefinedIncNode);
    expect(countNode.innerHTML).toEqual('3');
  });

});
