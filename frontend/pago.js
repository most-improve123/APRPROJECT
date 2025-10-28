document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemsTotalElement = document.getElementById("itemsTotal");
  const taxesElement = document.getElementById("taxes");
  const discountElement = document.getElementById("discount");
  const totalElement = document.getElementById("total");

  // Calcular totales
  const itemsTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxes = itemsTotal * 0.1; // 10% de impuesto
  const discount = 0; // Sin descuento por ahora
  const total = itemsTotal + taxes - discount;

  itemsTotalElement.textContent = `$${itemsTotal.toFixed(2)}`;
  taxesElement.textContent = `$${taxes.toFixed(2)}`;
  discountElement.textContent = `-$${discount.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;

  // Manejar el envío del formulario
  document.getElementById("paymentForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("¡Pago realizado con éxito!");
    localStorage.removeItem("cart");
    window.location.href = "dashboard.html";
  });
});
