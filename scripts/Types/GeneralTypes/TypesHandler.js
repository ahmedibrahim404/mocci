let types = {
    types:{},
    addType(name, fields){
        this.types[name] = { name, fields };
    },
    checkQuery(name){
        return this.types[name] ? true : false;
    }
};

export default types;