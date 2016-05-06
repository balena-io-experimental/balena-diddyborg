(function() {
  'use strict';

  angular
    .module('app.touch')
    .run(appRun);

  appRun.$inject = [
    'routerHelper'
  ];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'touch',
      config: {
        templateUrl: 'app/touch/touch.template.html',
        controller: 'DigitalController',
        controllerAs: 'digital',
        url: '/touch'
      }
    }];
  }

})();
