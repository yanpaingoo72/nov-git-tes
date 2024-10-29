import initialRender from "./initialRender";
import listener from "./listener";
import observer from "./observer";

class Invoice {
  init() {
    // console.log("invoice start");
    observer();
    listener();
    initialRender();
  }
}

export default Invoice;
