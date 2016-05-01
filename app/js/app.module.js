angular
  .module('ngDiddyborg', ['ngGamepad', 'ngMaterial'])
  .config(function($mdThemingProvider) {
    'use strict';
    $mdThemingProvider.theme('default')
    .primaryPalette('amber')
    .accentPalette('deep-purple');
});
