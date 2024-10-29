import Swal from "sweetalert2";
import {
  createRecordForm,
  recordGroup,
  recordNetTotal,
  recordRowTemplate,
  recordTax,
  recordTotal,
} from "./selectors";
import { fruits } from "./states";
import { v4 as uuidV4 } from "uuid";

export const createRecordFormHandler = (event) => {
  event.preventDefault();
  //   console.log("usubmit");
  const formData = new FormData(createRecordForm);
  //   console.log(formData.get("product_select"));
  //   console.log(formData.get("quantity"));
  const currentProduct = fruits.find(
    ({ id }) => id == formData.get("product_select")
  );

  const isExisted = document.querySelector(
    `[product-id='${currentProduct.id}']`
  );
  console.log(isExisted);
  if (isExisted === null) {
    recordGroup.append(
      createRecordRow(currentProduct, formData.get("quantity"))
    );
    createRecordForm.reset();
  } else {
    Swal.fire({
      title: `Are u sure to add quantity to ${currentProduct.name} `,
      text: `you won't able to revert this`,
      icon: `question`,
      showCancelButton: true,
      confirmButtonText: `Yes, add it`,
    }).then((result) => {
      if (result.isConfirmed) {
        updateRecordQuantity(isExisted.id, parseInt(formData.get("quantity")));
      }
    });
  }

  //   console.log(currentProduct.id

  //   const total = calculateRecordTotal();
  //   const tax = calculateTax(total);

  //   recordTotal.innerText = total;
  //   recordTax.innerText = tax;
  //   recordNetTotal.innerText = total + tax;
};

export const createRecordRow = ({ id, name, price }, quantity) => {
  const recordRow = recordRowTemplate.content.cloneNode(true);
  const recordProductName = recordRow.querySelector(".record-product-name");
  const recordProductPrice = recordRow.querySelector(".record-product-price");
  const recordQuantity = recordRow.querySelector(".record-quantity");
  const recordCost = recordRow.querySelector(".record-cost");
  const currentRecordRow = recordRow.querySelector(".record-row");

  currentRecordRow.setAttribute("product-id", id);
  currentRecordRow.setAttribute("id", uuidV4());

  recordProductName.innerText = name;
  recordProductPrice.innerText = price;
  recordQuantity.innerText = quantity;
  recordCost.innerText = price * quantity;

  return recordRow;
};

export const calculateTax = (amount, percentage = 5) =>
  (amount / 100) * percentage;

export const calculateRecordTotal = () => {
  let total = 0;
  recordGroup.querySelectorAll(".record-cost").forEach((el) => {
    total += parseFloat(el.innerText);
  });
  return total;
};

export const removeRecord = (rowId) => {
  Swal.fire({
    title: "Are u sure to del it?",
    text: "you won't able to revert this",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, del it",
  }).then((result) => {
    if (result.isConfirmed) {
      const currentRecordRow = recordGroup.querySelector(`[id = '${rowId}']`);
      currentRecordRow.remove();

      Swal.fire({
        title: "Deleted",
        text: "Your record has been del!",
        icon: "success",
      });
    }
  });
};
const updateRecordQuantity = (rowId, newQuantity) => {
  const currentRecordRow = recordGroup.querySelector(`[id = '${rowId}']`);
  const recordProductPrice = currentRecordRow.querySelector(
    ".record-product-price"
  );
  const recordQuantity = currentRecordRow.querySelector(".record-quantity");
  const recordCost = currentRecordRow.querySelector(".record-cost");

  if (newQuantity > 0 || recordQuantity.innerText > 1) {
    recordQuantity.innerText = parseInt(recordQuantity.innerText) + newQuantity;
    recordCost.innerText =
      recordProductPrice.innerText * recordQuantity.innerText;
  }
};
//  recordQuantity.innerText = parseInt(recordQuantity.innerText) + newQuantity;
//  recordCost.innerText = recordProductPrice.innerText * recordQuantity.innerText;

export const recordGroupHandler = (event) => {
  if (event.target.classList.contains("record-remove")) {
    const currentRecordRow = event.target.closest(".record-row");
    removeRecord(currentRecordRow.id);
  } else if (event.target.classList.contains("quantity-add")) {
    const currentRecordRow = event.target.closest(".record-row");
    updateRecordQuantity(currentRecordRow.id, 1);
  } else if (event.target.classList.contains("quantity-sub")) {
    const currentRecordRow = event.target.closest(".record-row");
    updateRecordQuantity(currentRecordRow.id, -1);
  }
};
const updateTotal = () => {
  const total = calculateRecordTotal();
  const tax = calculateTax(total);

  recordTotal.innerText = total;
  recordTax.innerText = tax;
  recordNetTotal.innerText = total + tax;
};

export const recordGroupObserver = () => {
  const observerOptions = {
    childList: true,
    subtrees: true,
  };

  const observer = new MutationObserver(updateTotal);
  observer.observe(recordGroup, observerOptions);
};
