'use strict'


const Validators = {};

Validators.validatorOrder = (order) => {
    if((!order.supplierLaboratoryID || !order.expectedDeliveryDate) && 
    (order.orderLensLE || order.orderLensRE)){ 
        throw new Error();
    }
};

Validators.validatorGlasses = (glasses) => {
    if(!glasses.receiptHealthCare) {
        glasses.healthCareID = null;
    } else {
        if(glasses.healthCareID == ''){
            throw new Error('Verifique los datos ingresados');
        };
    }; 
    if(glasses.tokenPayment == ''){
        glasses.tokenPayment = 0;
    };
    if(glasses.receiptHealthCare && glasses.healthCareID == null){
        throw new Error('Verifique los datos ingresados');
    };
    if(
        glasses.prescriptionNumber == '' ||
        glasses.frameID == '' ||
        glasses.expectedDeliveryDate == '' ||
        glasses.totalAmount == '' ||
        glasses.heightValue == '' ||
        glasses.glassesUtility == ''
    ) {
        throw new Error('Verifique los datos ingresados')
    };
}

module.exports = Validators;