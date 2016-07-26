(function() {
    'use strict';
    angular.module('modules.<%= moduleName %>')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('app.<%= moduleName %>', {
                url: '/<%= moduleName %>',
                views: {
                    content: {
                        templateUrl: 'app/modules/<%= moduleName %>/<%= moduleName %>.html',
                        controller: '<%= moduleNameUpper %>Controller',
                        controllerAs: "vm"
                    }
                }
            });
    }
})();
