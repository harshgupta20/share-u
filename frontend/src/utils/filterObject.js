export const filterObject = (array, objectData) => {
    let obj = {};
    array.forEach((element)=> {
        if(!(objectData[element]==null) && !(objectData[element]==undefined) && !(objectData[element]=="")){
            obj[element]=objectData[element];
        }
    });
    return obj;
}
