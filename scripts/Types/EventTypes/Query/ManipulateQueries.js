let queries = {

    queries:{},
    addQuery(name, type, resolve){
        this.queries[name] = { name, type, resolve };
    },
    checkQuery(name){
        return this.queries[name];
    }

};

export default queries;