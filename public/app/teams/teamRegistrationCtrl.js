var app;
(function (app) {
    var teamRegistration;
    (function (teamRegistration) {
        var TeamRegistrationCtrl = (function () {
            function TeamRegistrationCtrl(dataAccessService, $routeParams, $location) {
                this.dataAccessService = dataAccessService;
                this.$routeParams = $routeParams;
                this.$location = $location;
                this.teamName = "";
                this.members = [];
                this.submitted = false;
                this.newRecord = true;
                if ($location.path().indexOf('edit') > 0) {
                    this.newRecord = !this.newRecord;
                    this.initializeEdit($location.path().slice($location.path().lastIndexOf('/') + 1));
                }
            }
            TeamRegistrationCtrl.prototype.initializeEdit = function (teamName) {
                var _this = this;
                this.teamList = new app.teamList.TeamListCtrl(this.dataAccessService, this.$location);
                this.teamList.searchTeams(teamName, function (items) {
                    var item = items[0];
                    _this.teamName = item.name;
                    _this.members = item.members;
                });
            };
            TeamRegistrationCtrl.prototype.addMember = function () {
                var mem = new app.domain.TeamMember(this.member.EmpId, this.member.firstName, this.member.lastName);
                this.member.firstName = this.member.lastName = "";
                this.member.EmpId = undefined;
                this.submitted = false;
                this.members.push(mem);
            };
            TeamRegistrationCtrl.prototype.update = function () {
                var _this = this;
                var _me = this;
                var team = new app.domain.Team(this.teamName, this.members.length, this.members);
                var resource = this.dataAccessService.getTeamResource();
                resource.update({ teamName: _me.teamName }, team, function () { return _this.success(); }, function () { return _this.failed(); });
            };
            TeamRegistrationCtrl.prototype.submit = function () {
                var _this = this;
                if (!this.newRecord) {
                    return this.update();
                }
                var _me = this;
                var team = new app.domain.Team(this.teamName, this.members.length, this.members);
                var resource = this.dataAccessService.getTeamResource();
                resource.save(team, function () { return _this.success(); }, function () { return _this.failed(); });
            };
            TeamRegistrationCtrl.prototype.success = function () {
                this.saved = this.submitted = true;
                this.members = [];
                this.message = "Records saved successfully!!";
            };
            TeamRegistrationCtrl.prototype.failed = function () {
                this.submitted = true;
                this.saved = false;
                this.members = [];
                this.message = "Some error occurred. Please try again or contact acme@acme.com.";
            };
            TeamRegistrationCtrl.prototype.remove = function (index) {
                this.members.splice(index, 1);
            };
            TeamRegistrationCtrl.$inject = ["dataAccessService", "$routeParams", "$location"];
            return TeamRegistrationCtrl;
        })();
        angular.module("teamManagement").controller("TeamRegistrationCtrl", TeamRegistrationCtrl);
    })(teamRegistration = app.teamRegistration || (app.teamRegistration = {}));
})(app || (app = {}));
