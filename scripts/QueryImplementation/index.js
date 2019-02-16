import ManipulateQueries from '../Types/EventTypes/Query/ManipulateQueries';
import handleParameters from './handleParameters';

const implementQuery = (query, parent=null) => {
    if(typeof query != 'object') return -1;

    for(let set in query){
        if(typeof set != 'string') return -1;
        
        let queryOrdered=ManipulateQueries.checkQuery(set);
        if(!queryOrdered) return -1;


        // get params and delete it from out Object ( parameters of resolve function ).
        let params = query[set].params;
        delete query[set].params;

        // apply the resolve function.
        let resolveReturn=queryOrdered.resolve.bind(null,  query[set], parent ).call();

        // get the parameters of the type to validate the parameters of resolve Function with it.
        let typeFields=queryOrdered.type.data.Type().fields;

        return handleParameters(params, resolveReturn, query[set], typeFields);
        
    }
 
}

export default implementQuery;