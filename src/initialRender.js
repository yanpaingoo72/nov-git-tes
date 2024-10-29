import { productRender } from "./inventory";
import { fruits } from "./states";

const initialRender = () => {
//   productSideBar.classList.remove("translate-x-full");
  productRender(fruits);
};
export default initialRender;
