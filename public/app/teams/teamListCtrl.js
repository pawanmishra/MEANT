var app;
(function (app) {
    var teamList;
    (function (teamList) {
        var TeamListCtrl = (function () {
            function TeamListCtrl(dataAccessService, $location) {
                this.dataAccessService = dataAccessService;
                this.$location = $location;
                this.teams = [];
            }
            TeamListCtrl.prototype.searchTeams = function (teamName, callback) {
                var resource = this.dataAccessService.getTeamResource();
                this.teams = [];
                var _me = this;
                resource.query({ teamName: teamName }, function (data) {
                    angular.forEach(data, function (ff) {
                        var members = [];
                        angular.forEach(ff.members, function (item) {
                            var tempMem = new app.domain.TeamMember(item.EmpId, item.firstName, item.lastName);
                            members.push(tempMem);
                        });
                        var tempTeam = new app.domain.Team(ff.name, members.length, members);
                        _me.teams.push(tempTeam);
                    });
                    callback(_me.teams);
                });
            };
            TeamListCtrl.prototype.delete = function (index) {
                var deletedTeam = this.teams[index];
                this.teams.splice(index, 1);
                var resource = this.dataAccessService.getTeamResource();
                resource.delete({ teamName: deletedTeam.name });
                this.$location.path('/teams');
            };
            TeamListCtrl.prototype.log = function (items) {
                // do nothing
            };
            TeamListCtrl.$inject = ["dataAccessService", "$location"];
            return TeamListCtrl;
        })();
        teamList.TeamListCtrl = TeamListCtrl;
        angular.module("teamManagement").controller("TeamListCtrl", TeamListCtrl);
    })(teamList = app.teamList || (app.teamList = {}));
})(app || (app = {}));
