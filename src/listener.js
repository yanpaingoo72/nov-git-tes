import { closeSideBarBtnHandler, manageInventoryBtnHandler } from "./handlers";
import { addNewProductBtnHandler } from "./inventory";
import { createRecordFormHandler, recordRemoveHandler } from "./record";
import { addNewProductBtn, createRecordForm, createRecordFormBtn, manageInventoryBtn, recordGroup } from "./selectors";

const listener = () => {
    manageInventoryBtn.addEventListener("click" , manageInventoryBtnHandler);
    closeSideBarBtn.addEventListener("click" , closeSideBarBtnHandler);
    addNewProductBtn.addEventListener("click" , addNewProductBtnHandler);
    createRecordForm.addEventListener("submit" ,createRecordFormHandler)
    recordGroup.addEventListener("click" , recordRemoveHandler)
};   

export default listener;
