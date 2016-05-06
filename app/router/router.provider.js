(function() {
  'use strict';

  angular
  .module('app.router')
  .provider('routerHelper', routerHelperProvider);

  routerHelperProvider.$inject = [
    '$stateProvider',
    '$urlRouterProvider'
  ];

  /* @ngInject */
  function routerHelperProvider(
    $stateProvider,
    $urlRouterProvider) {

      /* jshint validthis:true */
      this.$get = RouterHelper;

      // $locationProvider.html5Mode(true);

      RouterHelper.$inject = ['$state'];
      /* @ngInject */
      function RouterHelper($state) {
        var hasOtherwise = false;

        var service = {
          configureStates: configureStates,
          getStates: getStates
        };

        return service;


        function configureStates(states, otherwisePath) {
          states.forEach(function(state) {
            var check = state.config.templateUrl;
            var doubleCheck = state.config.views;
            var view;

            if (check) {
              state.config.templateUrl = state.config.templateUrl;
            }

            if (doubleCheck) {
              for (var n in doubleCheck) {
                view = doubleCheck[n];
                state.config.views[n].templateUrl = view.templateUrl;
              }
            }

            $stateProvider.state(state.state, state.config);
          });

          if (otherwisePath && !hasOtherwise) {
            hasOtherwise = true;
            $urlRouterProvider.otherwise(otherwisePath);
          }
        }

        function getStates() { return $state.get(); }
      }
    }
  })();
