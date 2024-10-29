import {
  newProductName,
  newProductPrice,
  productCartTemplate,
  productGroup,
  productSelect,
} from "./selectors";
import { v4 as uuidV4 } from "uuid";
import { fruits } from "./states";

export const addNewProductBtnHandler = () => {
  const createId = uuidV4();
  productGroup.append(
    createProductCard(
      createId,
      newProductName.value,
      newProductPrice.valueAsNumber
    )
  );
  productSelect.append(new Option(`${newProductName.value} - ${newProductPrice.valueAsNumber}`, createId));

  fruits.push({
    id: createId,
    name: newProductName.value,
    price: newProductPrice.valueAsNumber,
  });

  newProductName.value = null;
  newProductPrice.value = null;
};

export const productRender = (fruits) => {
  fruits.forEach(({ id, name, price }) => {
    productGroup.append(createProductCard({ id, name, price }.id, name, price));
    productSelect.append(new Option( `${name} - ${price}`, id));
  });
};

export const createProductCard = (id, name, price) => {
  const productCard = productCartTemplate.content.cloneNode(true);
  const productName = productCard.querySelector(".product-name");
  const productPrice = productCard.querySelector(".product-price");
  const currentProductCart = productCard.querySelector(".product-card");

  currentProductCart.id = id;
  productName.innerText = name;
  productPrice.innerText = price;

  return productCard;
};
