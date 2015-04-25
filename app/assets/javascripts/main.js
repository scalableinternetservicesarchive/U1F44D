// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

// Render top-level React element
var App = require('./components/app');
var React = require('react');
React.render(<App />, document.getElementById('react-node'));
