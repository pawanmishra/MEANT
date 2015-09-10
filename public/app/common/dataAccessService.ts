module app.common {
	interface IDataAccessService {
		getTeamResource() : ng.resource.IResourceClass<ITeamResource>;
	}
	
	interface ITeamResource extends ng.resource.IResource<app.domain.ITeam> {
		//update(ITeam : app.domain.ITeam) : void;
	}
	
	interface ITeamResourceClass extends ng.resource.IResourceClass<ITeamResource> {
		update(params: Object, data: Object, success?: Function, error?: Function) : void;
	}
	
	export class DataAccessService 
		implements IDataAccessService {
		
		static $inject = ["$resource"];
		constructor(private $resource: ng.resource.IResourceService) {
			
		}
		
		//: ng.resource.IResourceClass<ITeamResource>
		getTeamResource() {
			return <ITeamResourceClass> this.$resource("http://localhost:3000/teams/:teamName", {}, {
				transformResponse: function(data, headers) {
                    return angular.fromJson(data);
                },
				post: {method:'POST'},
				query: {method: 'GET', isArray: true },
				update: {method: 'PUT', isArray: false}
			});
		}
	}
	angular.module("common.services").service("dataAccessService", DataAccessService);
}