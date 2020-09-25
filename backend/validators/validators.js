'use strict'


const Validators = {};
const Lens = require('../models/Lens');
const Frame = require('../models/Frame');

Validators.validatorOrder = (order) => {
    if(!order.orderLensLE && !order.orderLensRE){ 
        throw new Error('Debe seleccionar al menos un lente para pedir');
    } else if (order.supplierLaboratoryID === '' || order.expectedDeliveryDate === '' || 
                order.lensDesign === '' || order.lensMaterial === '' || 
                order.lensFinish === '' || order.refractionIndexLE === '' || 
                order.refractionIndexRE === '' || order.lensDiameter === '' || 
                order.lensColor === ''  || order.refractionIndexRE === '' || 
                order.sphericalValueLE === '' || order.sphericalValueRE === '' ||
                 order.cilyndricalValueLE === '' || order.cilyndricalValueRE === '' || 
                 order.glassesNumber === '' || order.axisLE === '' || order.axisRE === '') {
                    throw new Error('Verifique los datos ingresados');
    }
};

Validators.validatorOrderEdit = (order) => {
    if(!order.orderLensLE && !order.orderLensRE){
        throw new Error('Debe seleccionar al menos un lente para pedir');
    } else if (order.supplierLaboratoryID === '' || order.expectedDeliveryDate === '' || 
                order.lensDesign === '' || order.lensMaterial === '' || 
                order.lensFinish === '' || order.lensDiameter === '' || 
                order.lensColor === ''  || order.glassesNumber === '' ||
                order.orderStatus === '') {
        throw new Error('Verifique los datos ingresados');
    }
};

Validators.validatorOrderLE = (order) => {
    if (order.refractionIndexLE === '' || order.sphericalValueLE === '' ||
        order.cilyndricalValueLE === '' || order.axisLE === ''){
        throw new Error('Verifique los datos ingresados');
    };
};

Validators.validatorOrderRE = (order) => {
    if (order.refractionIndexRE === '' || order.sphericalValueRE === '' ||
        order.cilyndricalValueRE === '' || order.axisRE === ''){
        throw new Error('Verifique los datos ingresados');
    };
};

Validators.normalizeOrderLens = async (lensNumber) => {
    await Lens.destroy({
        where: {
            codLente: lensNumber
        }
    })
};


Validators.validatorGlasses = (glasses) => {
    if(!glasses.receiptHealthCare) {
        glasses.healthCareID = null;
    } else {
        if(glasses.healthCareID === null){
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
        throw new Error('Verifique los datos ingresados');
    };
};

Validators.validatorIfIsReceiptedHealthCare = (glasses) => {
    if(glasses.receiptHealthCare && (glasses.healthCareID === '' || glasses.healthCareID === null)){
        throw new Error('Debe elegir una obra social');
    }
};

Validators.validatorIfExistsStockEqualsLenses = async (glasses) => {
    const lens = await Lens.findByPk(glasses.leftLensID);
    if((lens.cantidad - 2) < 0){
        throw new Error('No hay stock disponible del lente seleccionado');
    };
};

Validators.validatorIfExistsStockLE = async (glasses) => {
    const lens = await Lens.findByPk(glasses.leftLensID);
    if((lens.cantidad - 1) < 0) {
        throw new Error('No hay stock disponible del lente seleccionado');
    };
};

Validators.validatorIfExistsStockRE = async (glasses) => {
    const lens = await Lens.findByPk(glasses.rightLensID);
    if((lens.cantidad - 1) < 0) {
        throw new Error('No hay stock disponible del lente seleccionado');
    };
};


Validators.normalizeStockLensLE = async (currentGlasses) => {
    const lens = await Lens.findByPk(currentGlasses.codLenteOI);
    await Lens.update({
        cantidad: lens.cantidad + 1
    }, {
        where: {
            codLente: currentGlasses.codLenteOI
        }
    });
};

Validators.normalizeStockLensRE = async (currentGlasses) => {
    const lens = await Lens.findByPk(currentGlasses.codLenteOD);
    await Lens.update({
        cantidad: lens.cantidad + 1
    }, {
        where: {
            codLente: currentGlasses.codLenteOD
        }
    });
};


Validators.normalizeStockFrame = async (frameID) => {
    const frame = await Frame.findByPk(frameID);
    await Frame.update({
        cantidad: frame.cantidad + 1
    }, {
        where: {
            codArmazon: frame.codArmazon
        }
    });
};

module.exports = Validators;