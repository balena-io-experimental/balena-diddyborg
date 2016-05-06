(function() {
  'use strict';

  angular
    .module('app.joypad')
    .run(appRun);

  appRun.$inject = [
    'routerHelper'
  ];

  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'joypad',
      config: {
        templateUrl: 'app/joypad/joypad.template.html',
        // controller: 'DiddyborgController',
        // controllerAs: 'mdc',
        url: '/joypad'
      }
    }];
  }

})();
