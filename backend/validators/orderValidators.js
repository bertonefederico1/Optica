const orderValidators = {};


orderValidators.validatorOrder = (order) => {
    if((!order.supplierLaboratoryID || !order.expectedDeliveryDate) && 
    (req.body.orderLensLE || req.body.orderLensRE)){ 
        throw new Error();
    }
}

module.exports = orderValidators;