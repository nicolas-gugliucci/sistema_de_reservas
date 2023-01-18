const removeAttributes = (element) => {
    let i = 0;
    while (element.attributes.length > 1) {
        if (element.attributes[i].name == 'id'){
            i++;
        }else{
            element.removeAttribute(element.attributes[i].name);
        };
    };
};

function removeAccents (str){
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};