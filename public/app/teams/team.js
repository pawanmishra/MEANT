var app;
(function (app) {
    var domain;
    (function (domain) {
        var TeamMember = (function () {
            function TeamMember(EmpId, firstName, lastName) {
                this.EmpId = EmpId;
                this.firstName = firstName;
                this.lastName = lastName;
            }
            return TeamMember;
        })();
        domain.TeamMember = TeamMember;
        var Team = (function () {
            function Team(name, member_count, members) {
                this.name = name;
                this.member_count = member_count;
                this.members = members;
            }
            return Team;
        })();
        domain.Team = Team;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
