module app.teamList {
	interface ITeamCallback {
    	(items: app.domain.ITeam[]): any;   
	}
	
	export interface ITeamListModel {
		teams : app.domain.ITeam[];
		teamName : string;
		searchTeams(teamName : string, callback : ITeamCallback) : void;
		log(items : app.domain.ITeam[]) : void;
	}
	
	export class TeamListCtrl implements ITeamListModel {
		teams : app.domain.ITeam[];
		teamName : string;
		
		static $inject=["dataAccessService"];
		constructor(private dataAccessService : app.common.DataAccessService) {
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
		
		log(items : app.domain.ITeam[]) : void {
			// do nothing
		}
	}
	
	angular.module("teamManagement").controller("TeamListCtrl", TeamListCtrl);
}