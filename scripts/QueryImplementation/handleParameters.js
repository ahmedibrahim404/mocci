import implementQuery from './index';

let applyChanges = (params, resolveReturn, queryParameters, typeFields, typeName) => {
    
    let dataRequired={};

    // console.log(resolveReturn, params);
    // console.log(resolveReturn);

    for(let param of params){
        if(typeof param == 'string'){
            
            try {
                if(typeFields.hasOwnProperty(param)){
                    if(resolveReturn && resolveReturn[param]) dataRequired[param]=resolveReturn[param];
                } else {
                    throw new Error(`doesn't have Parameter named ${param}`);
                }
            } catch (err){
                console.log(err.stack);
            }

        } else if (typeof param == 'object'){


            
            for(let subparam in param){
                try {
                    
                    // if(subparam == "author") console.log(resolveReturn);

                    if(typeFields.hasOwnProperty(subparam)){
                        let query={};
                        query[subparam]=param[subparam];
        
                        if(query[subparam].inherit){
                            const inheritParams=query[subparam].inherit;
                            for(let paramInherit of inheritParams)
                                if(resolveReturn[paramInherit]){
                                    queryParameters[paramInherit] = resolveReturn[paramInherit];
                                }
                        }

                        dataRequired[subparam] = implementQuery(query, queryParameters);;   
                    } else {
                        // throw new Error(`doesn't have Parameter named ${subparam}`);
                    }  
                } catch (err){
                    console.log(err.stack);
                }
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