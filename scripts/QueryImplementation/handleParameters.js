import implementQuery from './index';

let applyChanges = (params, resolveReturn, queryParameters, typeFields) => {
    
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

                if(query[subparam].inherit){
                    const inheritParams=query[subparam].inherit;
                    for(let paramInherit of inheritParams)
                        if(resolveReturn[paramInherit])
                            queryParameters[paramInherit] = resolveReturn[paramInherit];
                }

                dataRequired[subparam] = implementQuery(query, queryParameters);
            }
        }

    }
    return dataRequired;
}

let handleParameters = (params, resolveReturn, queryParameters, typeFields, queryType) => {
    
    if(queryType == "Group") {
        
        const isArr = Object.prototype.toString.call(resolveReturn) == '[object Array]';
        if(isArr)
            for(let piece in resolveReturn)
                resolveReturn[piece] = applyChanges(params, resolveReturn[piece], queryParameters, typeFields);

        return resolveReturn;

    } else return applyChanges(params, resolveReturn, queryParameters, typeFields);
}

export default handleParameters;