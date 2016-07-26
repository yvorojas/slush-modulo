(function() {
    'use strict';
    angular
        .module('modules.<%= moduleName %>')
        .controller('<%= moduleNameUpper %>Controller', <%= moduleNameUpper %>Controller);

    function <%= moduleNameUpper %>Controller($state, $scope, <%= moduleName %>Service) {
        
        var vm = this;

        //UI Events linked to ViewModel
        vm.uiEvents = {};
       
    }

})();
