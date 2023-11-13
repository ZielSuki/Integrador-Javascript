const productsSpreadsheet = document.querySelector(".products-spreadsheet");
const cartProductsSpreadsheet = document.querySelector(
  ".cart-products-spreadsheet"
);
const overlay = document.querySelector(".overlay");
const addCartSpan = document.querySelector(".logo-header");
const categories = document.querySelector(".categories");
const cart = document.querySelector(".cart");
const menu = document.querySelector(".navlinks");
const cartTotal = document.querySelector(".cart-total");

let cartData = [];
let cols = 0;
let mediaQuery = window.matchMedia("(min-width: 2000px)");

const createProductGrid = () => {
  if (mediaQuery.matches) {
    //si pantalla es mayor o igual a 2000px
    cols = Math.floor(2000 / 330); //se calcula la cantidad de cols del grid con 2000px
  } else if (!mediaQuery.matches) {
    //si no
    cols = Math.floor(document.body.clientWidth / 330); //se calcula según el width de la pantalla
  }
  productsSpreadsheet.style.setProperty("--columns", cols);
};

const filterProducts = () => {
  filteredProductsList = productsData.filter(
    (products) => products.category === appState.activeCategory
  );
  return filteredProductsList;
};

const category = (e) => {
  if (e.target.classList.value == "category") {
    for (const child of categories.children) {
      if (child.classList.value == "category active-category") {
        child.classList.remove("active-category");
      }
    }
    e.target.classList.add("active-category");
    appState.activeCategory = e.target.dataset.category;
    appState.currentProductsIndex = 0;
    renderProducts(filterProducts());
  }
};

/*ARROWS */
const previousIndex = () => {
  if (appState.currentProductsIndex != 0) {
    appState.currentProductsIndex -= 1;
  } else {
    return;
  }
  renderProducts(filterProducts());
};

const nextIndex = () => {
  if ((appState.currentProductsIndex + 1) * cols < filterProducts().length) {
    appState.currentProductsIndex += 1;
  } else {
    return;
  }
  renderProducts(filterProducts());
};
/*ARROWS */

/*PRODUCTS */
function createProduct(product) {
  const { id, name, price, image } = product;
  return `
  <div class="product-card">
    <img src="${image}" />
    <div class="card-info">
      <h3>${name}</h3>
      <span class="material-symbols-outlined" onclick="addToCart(event)" data-id="${id}" data-name="${name}" data-price="${price}" data-image="${image}">
        shopping_cart
      </span>
    </div>
    <p>$ ${price}</p>
  </div>
  `;
}

const renderProducts = (productsList) => {
  createProductGrid();
  productsSpreadsheet.innerHTML = productsList
    .slice(
      cols * appState.currentProductsIndex,
      (appState.currentProductsIndex + 1) * cols
    )
    .map((product) => createProduct(product))
    .join("");
};
/*PRODUCTS */

/*CART */
function createCartProduct(product) {
  const { id, name, price, image, quantity } = product;
  return `
  <div class="container">
    <img src="${image}"/>
    <div class="cart-info">
      <p>${name}</p>
      <p>$ ${price}</p>
      <div class="cart-buttons">
        <button class="minus" data-id="${id}" 
        data-name="${name}" data-price="${price}" 
        onclick="substractFromCart(event)" data-quantity="${quantity}">-</button>
        <span>${quantity}</span>
        <button class="add"data-id="${id}"
        data-name="${name}" data-price="${price}"
        onclick="addFromCart(event)" data-quantity="${quantity}">+</button>
      </div>
    </div>
  </div>
  `;
}

const renderCartProducts = (productsList) => {
  let total = 0;
  console.log(cartData);
  if (cartData.length == 0) {
    cartTotal.innerHTML = `El carrito está vacío`;
    cartProductsSpreadsheet.innerHTML = "";
    return;
  } else {
    for (let i = 0; i < cartData.length; i++) {
      total += cartData[i].price * cartData[i].quantity;
    }
    cartProductsSpreadsheet.innerHTML = productsList
      .map((product) => createCartProduct(product))
      .join("");
    cartTotal.innerHTML = `El total de la compra es: ${total}`;
    return;
  }
};

const addToCart = (event) => {
  let quantity = 1;
  const id = event.target.dataset.id;
  const price = event.target.dataset.price;
  const name = event.target.dataset.name;
  const image = event.target.dataset.image;

  for (let i = 0; i < cartData.length; i++) {
    if (cartData[i].id == id) {
      cartData[i].quantity += 1;
      renderCartProducts(cartData);
      return;
    }
  }
  cartData.push({ id, price, name, image, quantity });
  renderCartProducts(cartData);
  return;
};

const substractFromCart = (event) => {
  const id = event.target.dataset.id;
  for (let i = 0; i < cartData.length; i++) {
    if (cartData[i].id == id) {
      cartData[i].quantity -= 1;
      if (cartData[i].quantity == 0) {
        cartData.splice(i, 1);
      }
      renderCartProducts(cartData);
    }
  }
};

const addFromCart = (event) => {
  const id = event.target.dataset.id;
  for (let i = 0; i < cartData.length; i++) {
    if (cartData[i].id == id) {
      cartData[i].quantity += 1;
      renderCartProducts(cartData);
    }
  }
};

const deleteAllCart = () => {
  if (cartData.length == 0) {
    return;
  }
  if (window.confirm("¿Desea eliminar todo?")) {
    cartData = [];
    renderCartProducts(cartData);
  }
};

const completePayCart = () => {
  if (cartData.length == 0) {
    return;
  }
  if (window.confirm("¿Desea comprar todo?")) {
    cartData = [];
    renderCartProducts(cartData);
    cartTotal.innerHTML = "Gracias por su compra!";
  }
};
/*CART */

const closeMenu = () => {
  menu.classList.remove("toggle-menu");
};

const closeOnClick = () => {
  cart.classList.remove("toggle-cart");
  overlay.classList.remove("show-overlay");
};

const toggleCart = () => {
  overlay.classList.toggle("show-overlay");
  cart.classList.toggle("toggle-cart");
};

const toggleMenu = () => {
  menu.classList.toggle("toggle-menu");
};

const init = () => {
  renderProducts(filterProducts());
  overlay.addEventListener("click", closeOnClick);
  menu.addEventListener("click", closeMenu);
  window.addEventListener("DOMContentLoaded", renderCartProducts(cartData));
};

init();

window.onresize = () => renderProducts(filterProducts());