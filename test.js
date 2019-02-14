import { MocciType, MocciString, MocciInteger, MocciQuery, MocciGroup } from './scripts/Types';
import implementQuery from './scripts/QueryImplementation';

const UserType = new MocciType({
    name:"User",
    fields:{
        name:new MocciString,
        age:new MocciInteger
    }
});


const userQuery = new MocciQuery({
    name:"user",
    type: UserType,
    resolve(params, parent){
        console.log("RECEIVED", params);
    }
});

var query = {
    user: {
        id:15,
        params:[
            "name",
            "password"
        ]
    }
}

implementQuery(query);
