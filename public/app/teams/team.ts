module app.domain {
	export interface ITeamMember {
		EmpId : number;
		firstName : string;
		lastName : string;
	}
	
	export class TeamMember implements ITeamMember {
		constructor(public EmpId: number,
					public firstName : string,
					public lastName : string) {
				}
	}
	
	export interface ITeam {
		name : string;
		member_count : number;
		members : ITeamMember[];
	}
	
	export class Team implements ITeam {
		constructor(public name : string,
					public member_count : number,
					public members : app.domain.TeamMember[]) {
		}
	}
}