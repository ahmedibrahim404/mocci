let types = {
    types:{},
    addType(name, fields){
        if(!this.checkType(name))
            this.types[name] = { name, fields };
    },
    checkType(name){
        return this.types[name] ? true : false;
    },
    getType(name) {
        return this.types[name] ? this.types[name] : false;
    }


};

export default types;