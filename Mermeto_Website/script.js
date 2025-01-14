// script.js
const cartItemsContainer = document.getElementById("cart-items");
const subtotalElement = document.getElementById("subtotal");
const totalElement = document.getElementById("total");

// Fetch and display cart items
async function fetchCartData() {
  try {
    const response = await fetch(
      "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889"
    );
    const data = await response.json();
    renderCartItems(data.items);
  } catch (error) {
    cartItemsContainer.innerHTML = `<p>Error loading cart items.</p>`;
    console.error("Error fetching cart data:", error);
  }
}

// Render cart items dynamically
function renderCartItems(items) {
  cartItemsContainer.innerHTML = "";
  let subtotal = 0;

  items.forEach((item) => {
    const { image, title, price, quantity } = item;
    const itemSubtotal = price * quantity;
    subtotal += itemSubtotal;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <img src="${image}" alt="${title}">
      <div>
        <p>${title}</p>
        <p>₹${(price / 100).toFixed(2)}</p>
        <p>Qty: <input type="number" value="${quantity}" min="1" class="quantity-input"></p>
      </div>
      <p>₹${(itemSubtotal / 100).toFixed(2)}</p>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  updateTotals(subtotal);
}

// Update totals
function updateTotals(subtotal) {
  subtotalElement.textContent = (subtotal / 100).toFixed(2);
  totalElement.textContent = (subtotal / 100).toFixed(2);
}

// Initial fetch
fetchCartData();
