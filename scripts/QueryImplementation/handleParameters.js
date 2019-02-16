import implementQuery from './index';

let handleParameters = (params, resolveReturn, queryParameters, typeFields) => {
    let dataRequired={};

    for(let param of params){
        if(typeof param == 'string'){
            if(!typeFields.hasOwnProperty(param)) return;
            if(resolveReturn && resolveReturn[param]) dataRequired[param]=resolveReturn[param];
        } else if (typeof param == 'object'){
            for(let subparam in param){
                if(!typeFields.hasOwnProperty(subparam)) return;      
                let query={};
                query[subparam]=param[subparam];
                dataRequired[subparam] = implementQuery(query, queryParameters);
            }
        }

    }
    
    return dataRequired;
}

export default handleParameters;