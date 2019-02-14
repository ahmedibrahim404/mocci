import ManipulateQueries from './ManipulateQueries';
export default class MocciQuery {

    constructor(inf={}){

        // Check that inf is object;
        if(typeof inf != 'object') return -1;
        // Check of name and fields;
        if(!inf.name || !inf.type || !inf.resolve) return -1;
        // Check of the Type
        if(!inf.type.data || !inf.type.data.Type || typeof inf.type.data['Type'] != 'function') return -1;

        // Add the Query
        ManipulateQueries.addQuery(inf.name, inf.type, inf.resolve);

        return {
            query:() => MocciQuery
        }

    }

}