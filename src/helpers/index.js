export const propertyPrice = (price)=>
        Number(price).toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP'
        })