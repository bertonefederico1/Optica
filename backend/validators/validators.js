'use strict'


const Validators = {};
const Lens = require('../models/Lens');
const Frame = require('../models/Frame');

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
        if(glasses.healthCareID === ''){
            throw new Error('Verifique los datos ingresados');
        };
    }; 
    if(glasses.tokenPayment === ''){
        glasses.tokenPayment = 0;
    };
    if(glasses.receiptHealthCare && glasses.healthCareID == null){
        throw new Error('Verifique los datos ingresados');
    };
    if(
        glasses.prescriptionNumber === '' ||
        glasses.frameID === '' ||
        glasses.expectedDeliveryDate === '' ||
        glasses.totalAmount === '' ||
        glasses.heightValue === '' ||
        glasses.glassesUtility === '' ||
        glasses.glassesStatus === '' ||
        glasses.prescriptionNumber === null ||
        glasses.frameID === null ||
        glasses.expectedDeliveryDate === null ||
        glasses.totalAmount === null ||
        glasses.heightValue === null ||
        glasses.glassesUtility === null ||
        glasses.glassesStatus === null
    ) {
        throw new Error('Verifique los datos ingresados')
    };
};

Validators.normalizeStock = async (glasses) => {
    try{
        let lens;
        let frame;
        if(!glasses.rightLensID){
            lens = await Lens.findByPk(glasses.rightLensID);
            await Lens.update({
                cantidad: lens.cantidad + 1
            }, {
                where: {
                    codLente: glasses.rightLensID
                }
            });
        };
        if(!glasses.leftLensID){
            lens = await Lens.findByPk(glasses.leftLensID);
            await Lens.update({
                cantidad: lens.cantidad + 1
            }, {
                where: {
                    codLente: glasses.leftLensID
                }
            });
        };
        frame = await Frame.findByPk(glasses.frameID);
        await Frame.update({
            cantidad: frame.cantidad + 1
        }, {
            where: {
                codArmazon: glasses.frameID
            }
        })
    } catch(err) {
        res.status(400).json();
    }
};

module.exports = Validators;