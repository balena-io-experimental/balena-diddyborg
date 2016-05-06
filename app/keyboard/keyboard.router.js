(function() {
  'use strict';

  angular
    .module('app.keyboard')
    .run(appRun);

  appRun.$inject = [
    'routerHelper'
  ];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'keyboard',
      config: {
        templateUrl: 'app/keyboard/keyboard.template.html',
        controller: 'DigitalController',
        controllerAs: 'digital',
        url: '/keyboard'
      }
    }];
  }

})();
