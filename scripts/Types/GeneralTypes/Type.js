import TypesHandler from './TypesHandler';

/**
 *  Make Mocci Type
 * @class
 * @method constructor
    * @param {object} inf Contains the data of the Type 
 */
class MocciType {

    constructor(inf={}){

        // Check that inf is object;
        if(typeof inf != 'object') return;
        // Check of name and fields;
        if(!inf.name || !inf.fields) return;
        this.name = inf.name;
        this.fields = inf.fields;
        
        if(TypesHandler.checkQuery(this.name)) return;
        
        TypesHandler.addType(this.name, this.fields);
        return {
            name:this.name,
            data:{
                Type: () => this
            }
        }
    }

    /**
     * @method check ( Check that fields are in the type... )
     * @param {object} fields ( Fields or the object we wanna check... )
     */
    check(fields={}){

        /**
         * Still we wanna check of the type...
         */
        for(let field in fields)
            if(!this.isInFields(field))
                return false;

        return true;

    }

    isInFields(field){
        return this.fields.indexOf(field) > -1;
    }

}

export default MocciType;