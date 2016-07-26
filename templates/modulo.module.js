(function() {
    'use strict';

    angular.module('modules.<%= moduleName %>', []);
    angular.module('modules').requires.push('modules.<%= moduleName %>');

})();
