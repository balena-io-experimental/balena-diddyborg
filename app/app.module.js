(function() {
    'use strict';

    angular
      .module('ngDiddyborg', [
        'ngGamepad',
        'ngMaterial',
        'ui.router',
        'app.router',
        'app.touch',
        'app.keyboard',
        'app.joypad'
      ]);
})();
