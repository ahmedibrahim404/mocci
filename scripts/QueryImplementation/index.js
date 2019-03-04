import ManipulateQueries from '../Types/EventTypes/Query/ManipulateQueries';
import handleParameters from './handleParameters';
import TypesHandler from '../Types/GeneralTypes/TypesHandler';
const implementQuery = (query, parent=null) => {
    
    let returnFunction=[];

    if(typeof query != 'object') return -1;

    for(let set in query){
        if(typeof set != 'string') return -1;

        let queryOrdered=ManipulateQueries.checkQuery(set);
        if(!queryOrdered) return -1;


        // get params and delete it from out Object ( parameters of resolve function ).
        let params = query[set].params;

        // query params sent to resolve function
        let queryParams={...query[set]};
        if(queryParams.params) delete queryParams.params;
        if(queryParams.inherit) delete queryParams.inherit;

        // query parent params sent to resolve function
        if(parent && parent.params) delete parent.params;
        if(parent && parent.inherit) delete parent.inherit;

        
        // apply the resolve function.
        let resolveReturn=queryOrdered.resolve.bind(null,  queryParams, parent).call();
        
        // get the parameters of the type to validate the parameters of resolve Function with it.
        let typeFields;
        if(typeof queryOrdered.type.data.Type == 'function'){
            // For Single Query
            typeFields=queryOrdered.type.data.Type.call().fields;
            returnFunction.push(handleParameters(params, resolveReturn, query[set], typeFields, "Single"));
        } else {
            // For Group Query
            let typeName=queryOrdered.type.name;
            if(TypesHandler.checkType(typeName)){
                typeFields=TypesHandler.getType(typeName).fields;
                returnFunction.push(
                    handleParameters(params, resolveReturn, query[set], typeFields, "Group")
                );
            }
        }
        
    }

    return returnFunction;
 
}

export default implementQuery;