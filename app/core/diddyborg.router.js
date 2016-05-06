(function() {
  'use strict';

  angular
    .module('ngDiddyborg')
    .run(appRun);

  appRun.$inject = [
    'routerHelper'
  ];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates(), '/touch');
  }

  function getStates() {
    return [{
      state: 'main',
      config: {
        templateUrl: 'app/core/diddyborg.template.html'
      },
      url: '/',
    }];
  }
})();
