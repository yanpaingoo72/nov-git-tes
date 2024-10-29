import { closeSideBarBtn, manageInventoryBtn, productSideBar } from "./selectors";

export const manageInventoryBtnHandler = () => {
    productSideBar.classList.add("duration-300" , )
    productSideBar.classList.remove("translate-x-full")
    

    
}
export const closeSideBarBtnHandler = () => {
    productSideBar.classList.add("translate-x-full")
    

}

