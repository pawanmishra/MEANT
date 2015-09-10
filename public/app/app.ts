module app {
        angular.module("teamManagement", ["common.services", "ngRoute"]).config(['$routeProvider',
                function($routeProvider) {
                        $routeProvider.when('/register', {
                                templateUrl: '/app/teams/teamRegistrationView.html'
                        });
                        
                        $routeProvider.when('/teams', {
                                templateUrl: '/app/teams/teamListView.html'
                        });
                        
                        $routeProvider.when('/edit/:teamName', {
                                templateUrl: '/app/teams/teamRegistrationView.html'
                        });
                        
                        $routeProvider.otherwise({
                                redirectTo: '/'
                        });
                }]);
}