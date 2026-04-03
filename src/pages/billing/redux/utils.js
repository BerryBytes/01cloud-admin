export const deletePromo=(promoCodeList,promoId)=>{

const promoIndex=promoCodeList.findIndex((promoCode)=>promoCode.id===promoId)
if(promoIndex<0){
    return promoCodeList
    
}
promoCodeList.splice(promoIndex,1);

    return [...promoCodeList]
}