module app.teamList {
	interface ITeamCallback {
    	(items: app.domain.ITeam[]): any;   
	}
	
	export interface ITeamListModel {
		teams : app.domain.ITeam[];
		teamName : string;
		searchTeams(teamName : string, callback : ITeamCallback) : void;
		log(items : app.domain.ITeam[]) : void;
		delete(index : number) : void;
	}
	
	export class TeamListCtrl implements ITeamListModel {
		teams : app.domain.ITeam[];
		teamName : string;
		
		static $inject=["dataAccessService", "$location"];
		constructor(private dataAccessService : app.common.DataAccessService,
			private $location : ng.ILocationService) {
			this.teams = [];
		}
		
		searchTeams(teamName : string, callback : ITeamCallback) : void {
			var resource = this.dataAccessService.getTeamResource();
			this.teams = [];
			let _me = this;
			resource.query({teamName : teamName}, (data) => {
				angular.forEach(data, function(ff){
					let members : app.domain.ITeamMember[] = [];
					angular.forEach(ff.members, function(item){
						let tempMem = new app.domain.TeamMember(item.EmpId, item.firstName, item.lastName);
						members.push(tempMem);
					})
					let tempTeam = new app.domain.Team(ff.name, members.length, members);
					_me.teams.push(tempTeam);
				});
				callback(_me.teams);
			});
		}
		
		delete(index : number) : void {
			let deletedTeam = this.teams[index];
			this.teams.splice(index, 1);
			var resource = this.dataAccessService.getTeamResource();
			resource.delete({teamName : deletedTeam.name});
			this.$location.path('/teams');
		}
		
		log(items : app.domain.ITeam[]) : void {
			// do nothing
		}
	}
	
	angular.module("teamManagement").controller("TeamListCtrl", TeamListCtrl);
}