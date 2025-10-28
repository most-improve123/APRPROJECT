document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cartItems");
  const subtotalElement = document.getElementById("subtotal");
  const taxElement = document.getElementById("tax");
  const totalElement = document.getElementById("total");
  const proceedButton = document.getElementById("proceedToPayment");

  // Cargar productos del carrito desde localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Mostrar productos en el carrito
  cart.forEach((item, index) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.className = "cart-item";
    cartItemElement.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
      </div>
      <div class="cart-item-quantity">
        <button onclick="decreaseQuantity(${index})">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQuantity(${index})">+</button>
      </div>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
    `;
    cartItemsContainer.appendChild(cartItemElement);
  });

  // Calcular subtotal, impuesto y total
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% de impuesto
  const total = subtotal + tax;

  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  taxElement.textContent = `$${tax.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;

  // Redirigir a la página de pago
  proceedButton.addEventListener("click", () => {
    window.location.href = "pago.html";
  });
});

// Funciones para aumentar o disminuir la cantidad
function increaseQuantity(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}

function decreaseQuantity(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}
