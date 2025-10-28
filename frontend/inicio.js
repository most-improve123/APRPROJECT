// ---------- Reiniciar producto seleccionado al cargar ----------
localStorage.removeItem("selectedProduct");

// ---------- Forzar recarga si se viene desde cache (botón Atrás) ----------
window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    window.location.reload();
  }
});

// ---------- Manejo del click en botones Comprar ----------
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("buy-btn")) {

    // Revisar si el usuario está logueado
    const loggedIn = localStorage.getItem("loggedIn") === "true";

    if (!loggedIn) {
      const goLogin = confirm("⚠️ Debes iniciar sesión para comprar.\n¿Quieres ir a la página de inicio de sesión?");
      if (goLogin) window.location.href = "index.html";
      return;
    }

    // Capturar información del producto
    const productCard = e.target.closest(".product");
    if (!productCard) return;

    const productName = productCard.querySelector("h3")?.textContent || "Producto";
    const productImg = productCard.querySelector("img")?.src || "";
    
    // Aquí puedes poner precios dinámicos por producto si quieres
    let price = "89.99"; 
    if (productName.toLowerCase().includes("refrigeradora")) price = "499.99";
    if (productName.toLowerCase().includes("televisor")) price = "299.99";
    if (productName.toLowerCase().includes("lavadora")) price = "399.99";
    if (productName.toLowerCase().includes("microondas")) price = "99.99";

    const product = {
      name: productName,
      img: productImg,
      price: price,
      description: "Producto de alta calidad para tu hogar.",
      specs: [
        "Capacidad: 1.5 L",
        "Material: Acero inoxidable",
        "Peso: 2.5 kg",
        "Dimensiones: 15 x 12 x 20 cm"
      ]
    };

    // Guardar en localStorage
    localStorage.setItem("selectedProduct", JSON.stringify(product));

    // Redirigir a página de detalle
    window.location.href = "producto.html";
  }
});
