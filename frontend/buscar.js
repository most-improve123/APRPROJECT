document.addEventListener("DOMContentLoaded", () => {
  const productsGrid = document.getElementById("productsGrid");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const filterByPriceButton = document.getElementById("filterByPrice");
  const filterByBrandButton = document.getElementById("filterByBrand");

  // Lista de productos
  const products = [
    {
      name: "Stainless Steel Refrigerator",
      img: "img/refrigeradora.png",
      price: 499.99,
      brand: "LG",
      description: "High-capacity refrigerator with energy-saving features.",
      specs: ["Capacity: 20 cu. ft.", "Material: Stainless Steel", "Energy Star Certified"]
    },
    {
      name: "Front-load Washer",
      img: "img/lavadora.png",
      price: 399.99,
      brand: "Samsung",
      description: "Efficient front-load washer with multiple wash cycles.",
      specs: ["Capacity: 4.5 cu. ft.", "Material: Stainless Steel", "12 Wash Cycles"]
    },
    {
      name: "High-Efficiency Oven",
      img: "img/horno.jpg",
      price: 599.99,
      brand: "Whirlpool",
      description: "Convection oven with self-cleaning feature.",
      specs: ["Capacity: 5.0 cu. ft.", "Material: Stainless Steel", "Self-Cleaning"]
    },
    {
      name: "Compact Microwave",
      img: "img/microondas.jpg",
      price: 99.99,
      brand: "Panasonic",
      description: "Compact microwave with 10 power levels.",
      specs: ["Capacity: 1.5 cu. ft.", "Material: Stainless Steel", "10 Power Levels"]
    }
  ];

  // Mostrar todos los productos al cargar la página
  displayProducts(products);

  // Buscar productos
  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
  });

  // Filtrar por precio
  filterByPriceButton.addEventListener("click", () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    displayProducts(sortedProducts);
  });

  // Filtrar por marca
  filterByBrandButton.addEventListener("click", () => {
    const sortedProducts = [...products].sort((a, b) => a.brand.localeCompare(b.brand));
    displayProducts(sortedProducts);
  });

  // Función para mostrar productos
  function displayProducts(productsToDisplay) {
    productsGrid.innerHTML = "";
    productsToDisplay.forEach(product => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <p><strong>Brand:</strong> ${product.brand}</p>
        <button
          class="add-to-cart-button"
          data-name="${product.name}"
          data-img="${product.img}"
          data-price="${product.price}"
          data-description="${product.description}"
          data-specs='${JSON.stringify(product.specs)}'>
          Add to Cart
        </button>
      `;
      productsGrid.appendChild(productCard);
    });

    // Agregar evento a los botones "Add to Cart"
    document.querySelectorAll(".add-to-cart-button").forEach(button => {
      button.addEventListener("click", () => {
        const name = button.getAttribute("data-name");
        const img = button.getAttribute("data-img");
        const price = button.getAttribute("data-price");
        const description = button.getAttribute("data-description");
        const specs = JSON.parse(button.getAttribute("data-specs"));

        const product = { name, img, price, description, specs };
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "detalle-producto.html";
      });
    });
  }
});
