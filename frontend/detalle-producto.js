document.addEventListener("DOMContentLoaded", () => {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));

  // Botón de regreso
  const backButton = document.getElementById("backButton");
  backButton.addEventListener("click", () => {
    window.location.href = "dashboard.html"; // Cambia a "inicio.html" si prefieres
  });

  if (product) {
    document.getElementById("productImage").src = product.img;
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productDescription").textContent = product.description;
    document.getElementById("productPrice").textContent = `$${product.price}`;

    const specsList = document.getElementById("productSpecs");
    product.specs.forEach(spec => {
      const li = document.createElement("li");
      li.textContent = spec;
      specsList.appendChild(li);
    });
  }

  // Agregar al carrito
  document.getElementById("addToCart").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = cart.findIndex(p => p.name === product.name);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({...product, quantity: 1});
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} agregado al carrito`);
  });
});
