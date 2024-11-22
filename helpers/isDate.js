const moment = require('moment');

//?validar de alguna manera la fecha
const isDate = (value) => {

    if(!value){
        //? esto harra que express  validator regrese un error
        return false;
    }
    
    const fecha = moment( value)

    if (fecha.isValid()) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    isDate
}