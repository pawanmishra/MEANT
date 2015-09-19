module app.teamRegistration {
	interface ITeamListModel {
		teamName : string;
		saved : boolean;
		submitted : boolean;
		message : string;
		members : app.domain.ITeamMember[];
		member : app.domain.ITeamMember;
		addMember() : void;
		submit(): void;
		newRecord : boolean;
		remove(index : number) : void;
	}
	
	class TeamRegistrationCtrl implements ITeamListModel {
		teamName : string = "";
		team : app.domain.ITeam;
		members : app.domain.TeamMember[] = [];
		member : app.domain.ITeamMember;
		saved : boolean;
		submitted : boolean = false;
		message : string;
		teamList : app.teamList.ITeamListModel;
		newRecord : boolean = true;
		
		static $inject = ["dataAccessService", "$routeParams", "$location"]
		constructor(private dataAccessService : app.common.DataAccessService,
			private $routeParams : ng.route.ICurrentRoute,
			private $location: ng.ILocationService) {
				
			if($location.path().indexOf('edit') > 0) {
				this.newRecord = !this.newRecord;
				this.initializeEdit($location.path().slice($location.path().lastIndexOf('/') + 1));
			}
		}
		
		initializeEdit(teamName : string) {
			this.teamList = new app.teamList.TeamListCtrl(this.dataAccessService, this.$location);
			this.teamList.searchTeams(teamName, (items) => 
				{
					let item = items[0];
					this.teamName = item.name;
					this.members = item.members;
				});
		}
		
		addMember(): void {
			let mem = new app.domain.TeamMember(this.member.EmpId, this.member.firstName, this.member.lastName);
			this.member.firstName = this.member.lastName = "";
			this.member.EmpId = undefined;
			this.submitted = false;
			this.members.push(mem);
		}
		
		update(): void {
			let _me = this;
			let team : app.domain.ITeam = new app.domain.Team(this.teamName, this.members.length, this.members);
			let resource = this.dataAccessService.getTeamResource();
			resource.update({teamName : _me.teamName}, team, () => this.success(), () => this.failed());
		}
		
		submit(): void {
			if(!this.newRecord) {
				return this.update();
			}
			
			let _me = this;
			let team : app.domain.ITeam = new app.domain.Team(this.teamName, this.members.length, this.members);
			let resource = this.dataAccessService.getTeamResource();
			resource.save(team, () => this.success(), () => this.failed());
		}
		
		success() : void {
			this.saved = this.submitted = true;
			this.members = [];
			this.message = "Records saved successfully!!";
		}
		
		failed() : void {
			this.submitted = true;
			this.saved = false;
			this.members = [];
			this.message = "Some error occurred. Please try again or contact acme@acme.com.";
		}
		
		remove(index : number): void {
			this.members.splice(index, 1);
		}
	}
	
	angular.module("teamManagement").controller("TeamRegistrationCtrl", TeamRegistrationCtrl);
}