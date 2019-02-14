

/**
 * @class Represents Mocci Groups of Mocci Type 
 */

const Group = (name) => {
    return { name }
}

export default class MocciGroup {
    constructor(type){
        if(type.name == type.data.Type.call().name)
            return Group(type.name);
    }
}