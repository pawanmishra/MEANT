var app;
(function (app) {
    var common;
    (function (common) {
        var DataAccessService = (function () {
            function DataAccessService($resource) {
                this.$resource = $resource;
            }
            //: ng.resource.IResourceClass<ITeamResource>
            DataAccessService.prototype.getTeamResource = function () {
                return this.$resource("http://localhost:3000/teams/:teamName", {}, {
                    transformResponse: function (data, headers) {
                        return angular.fromJson(data);
                    },
                    post: { method: 'POST' },
                    query: { method: 'GET', isArray: true },
                    update: { method: 'PUT', isArray: false }
                });
            };
            DataAccessService.$inject = ["$resource"];
            return DataAccessService;
        })();
        common.DataAccessService = DataAccessService;
        angular.module("common.services").service("dataAccessService", DataAccessService);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
