import ManipulateQueries from '../Types/EventTypes/Query/ManipulateQueries';
const implementQuery = (query) => {

    if(typeof query != 'object') return;

    for(let set in query){
        if(typeof set != 'string') return;
        
        let queryOrdered=ManipulateQueries.checkQuery(set);
        if(!queryOrdered) return;

        let params = query[set].params;
        delete query[set].params;

        

        return queryOrdered.resolve.bind(null,  query[set], null ).call();

    }
 
}

export default implementQuery;