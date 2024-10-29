import { checkoutHandler, closeSideBarBtnHandler, manageInventoryBtnHandler } from "./handlers";
import { addNewProductBtnHandler } from "./inventory";
import { createRecordFormHandler, recordGroupHandler, } from "./record";
import { addNewProductBtn, checkout, createRecordForm, createRecordFormBtn, manageInventoryBtn, recordGroup } from "./selectors";

const listener = () => {
    manageInventoryBtn.addEventListener("click" , manageInventoryBtnHandler);
    closeSideBarBtn.addEventListener("click" , closeSideBarBtnHandler);
    addNewProductBtn.addEventListener("click" , addNewProductBtnHandler);
    createRecordForm.addEventListener("submit" ,createRecordFormHandler)
    recordGroup.addEventListener("click" , recordGroupHandler)
    checkout.addEventListener("click" , checkoutHandler)
};   

export default listener;
