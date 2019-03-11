import { MocciType, MocciString, MocciInteger, MocciQuery, MocciGroup } from './scripts/Types';
import implementQuery from './scripts/QueryImplementation';

const PostType = new MocciType({
    name:"Post",
    fields:{
        title:new MocciString,
    }
});

const UserType = new MocciType({
    name:"User",
    fields:{
        id: new MocciInteger,
        name:new MocciString,
        password: new MocciString,
        age:new MocciInteger,
        post: PostType,
    }
});

const users = [
    { id:1, name:"AHMED", password:"123123" },
    { id:2, name:"HASSAN", password:"131323H" },
    { id:3, name:"MOHAMED", password:"312123" },
    { id:4, name:"A123", password:"YYYY123" },
]

const posts = [
    { user_id:1, title:"HELLO AHMED POST" },
    { user_id:2, title:"HELLO HASSAN POST" },
    { user_id:3, title:"HELLO MOHAMED POST" },
    { user_id:4, title:"HELLO A123 POST" }
]

new MocciQuery({
    name:"user",
    type: UserType,
    resolve(params, parent){
        const user = users.filter((v) => v.id == params.id)
        return user[0];
    }
});

new MocciQuery({
    name:"users",
    type: new MocciGroup(UserType),
    resolve(params, parent){
        // const use = users.filter((v) => v.id == params.id)
        return users;
    }
});

new MocciQuery({
    name:"post",
    type: PostType,
    resolve(params, parent){
        const post = posts.filter((v) => v.user_id == parent.id)
        return post[0];
    }
});


var query = {
    users: {
        params:[
            "id",
            "name",
            "password",
            {
                post:{
                    inherit:["id"],
                    params:[
                        "title",
                    ]
                }
            }
        ]
    },
    user: {
        id:1,
        params:[
            "id",
            "name",
            "password",
            {
                post:{
                    inherit:["id"],
                    params:[
                        "title",
                    ]
                }
            }
        ]
    }
}

console.log(implementQuery(query));

