(function() {
  'use strict';
  angular
    .module('ngDiddyborg')
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('amber')
        .accentPalette('deep-purple');
    });
})();
