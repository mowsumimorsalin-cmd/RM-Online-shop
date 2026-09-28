const SUPABASE_URL = "https://bjcvebffuayrslsgntoq.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_5Qpjyf0cWmvxjTnhSRv7KQ_xD7udg0Z";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const products = [
  {id:1,name:"Premium Product One",cat:"Featured",price:1290,old:1690,discount:24,icon:"👜",rating:"★★★★★"},
  {id:2,name:"Classic Product Two",cat:"New Arrivals",price:890,old:1190,discount:25,icon:"👕",rating:"★★★★★"},
  {id:3,name:"Modern Product Three",cat:"Best Sellers",price:1490,old:1990,discount:25,icon:"⌚",rating:"★★★★☆"},
  {id:4,name:"Everyday Product Four",cat:"Featured",price:690,old:850,discount:19,icon:"🎧",rating:"★★★★★"},
  {id:5,name:"Premium Product Five",cat:"New Arrivals",price:1790,old:2190,discount:18,icon:"👟",rating:"★★★★☆"},
  {id:6,name:"Special Product Six",cat:"Best Sellers",price:990,old:1290,discount:23,icon:"🕶️",rating:"★★★★★"},
  {id:7,name:"Simple Product Seven",cat:"Featured",price:590,old:750,discount:21,icon:"🎒",rating:"★★★★☆"},
  {id:8,name:"Limited Product Eight",cat:"Offers",price:1190,old:1590,discount:25,icon:"💄",rating:"★★★★★"}
];

const categories = [
  "All Products",
  "New Arrivals",
  "Best Sellers",
  "Featured"
];

let cart = JSON.parse(localStorage.getItem("cart") || "[]");
let selectedCat = "All Products";

const money = n => "৳" + Number(n).toLocaleString("en-BD");

function renderProducts(list = products) {
  const grid = document.querySelector("#productGrid");

  grid.innerHTML = list.map(p => `
    <article class="product">
      <div class="discount">${p.discount}% OFF</div>

      <div class="product-img" onclick="openProduct(${p.id})">
        ${p.icon}
      </div>

      <div class="product-body">
        <h3>${p.name}</h3>

        <div class="stars">${p.rating}</div>

        <div class="price">
          <b>${money(p.price)}</b>
          <span class="old">${money(p.old)}</span>
        </div>

        <div class="product-actions">
          <button onclick="addToCart(${p.id})">
            Add to Cart
          </button>

          <button class="buy" onclick="buyNow(${p.id})">
            Buy Now
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function renderCategories() {
  document.querySelector("#categoryGrid").innerHTML =
    categories.map(c => `
      <div class="category" onclick="filterCategory('${c}')">
        <b>${c}</b>
        <span>Explore collection →</span>
      </div>
    `).join("");
}

function filterCategory(c) {
  selectedCat = c;

  document.querySelector("#products").scrollIntoView({
    behavior: "smooth"
  });

  renderProducts(
    c === "All Products"
      ? products
      : products.filter(p => p.cat === c)
  );
}

function addToCart(id) {
  const item = cart.find(x => x.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({
      id,
      qty: 1
    });
  }

  saveCart();
  openCart();
}

function buyNow(id) {
  addToCart(id);
  openCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();

  document.querySelector("#cartCount").textContent =
    cart.reduce((s, x) => s + x.qty, 0);
}

function renderCart() {
  const box = document.querySelector("#cartItems");

  if (!cart.length) {
    box.innerHTML = "<p>Your cart is empty.</p>";
    document.querySelector("#cartTotal").textContent = money(0);
    return;
  }

  let total = 0;

  box.innerHTML = cart.map(x => {
    const p = products.find(p => p.id === x.id);

    total += p.price * x.qty;

    return `
      <div class="cart-line">
        <div class="thumb">${p.icon}</div>

        <div style="flex:1">
          <b>${p.name}</b>

          <div>${money(p.price)}</div>

          <div class="qty">
            <button onclick="changeQty(${p.id},-1)">−</button>
            ${x.qty}
            <button onclick="changeQty(${p.id},1)">+</button>
            <button onclick="removeItem(${p.id})">
              Remove
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  document.querySelector("#cartTotal").textContent = money(total);
}

function changeQty(id, n) {
  const x = cart.find(x => x.id === id);

  if (x) {
    x.qty += n;

    if (x.qty <= 0) {
      cart = cart.filter(y => y.id !== id);
    }
  }

  saveCart();
}

function removeItem(id) {
  cart = cart.filter(x => x.id !== id);
  saveCart();
}

function openCart() {
  document.querySelector("#cartDrawer")
    .classList.remove("hidden");

  renderCart();
}

function openProduct(id) {
  const p = products.find(x => x.id === id);

  document.querySelector("#modalContent").innerHTML = `
    <div class="detail-grid">

      <div class="detail-img">
        ${p.icon}
      </div>

      <div>
        <p class="eyebrow">${p.cat}</p>

        <h2>${p.name}</h2>

        <div class="stars">${p.rating}</div>

        <div class="price">
          <b>${money(p.price)}</b>
          <span class="old">${money(p.old)}</span>
        </div>

        <p>
          Product description will go here.
          Later you can replace this with your real product details,
          specifications, size/color options and delivery information.
        </p>

        <p>
          <b>${p.discount}% discount</b> · In stock
        </p>

        <button
          class="primary"
          onclick="addToCart(${p.id});document.querySelector('#productModal').classList.add('hidden')"
        >
          Add to Cart
        </button>

        <button
          class="secondary"
          onclick="buyNow(${p.id});document.querySelector('#productModal').classList.add('hidden')"
        >
          Buy Now
        </button>

      </div>
    </div>
  `;

  document.querySelector("#productModal")
    .classList.remove("hidden");
}

function getCartTotal() {
  return cart.reduce((total, item) => {
    const p = products.find(p => p.id === item.id);

    return total + (p ? p.price * item.qty : 0);
  }, 0);
}

function generateOrderNumber() {
  const now = new Date();

  const date =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");

  const time =
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0");

  const random =
    Math.floor(100 + Math.random() * 900);

  return `RM-${date}-${time}-${random}`;
}

function openCheckout() {
  if (!cart.length) {
    alert("Your cart is empty.");
    return;
  }

  const total = getCartTotal();

  const summary = cart.map(item => {
    const p = products.find(p => p.id === item.id);

    return `
      <div style="padding:8px 0;border-bottom:1px solid #eee;">
        <b>${p.name}</b>
        <br>
        Qty: ${item.qty} × ${money(p.price)}
      </div>
    `;
  }).join("");

  document.querySelector("#modalContent").innerHTML = `
    <div>

      <p class="eyebrow">RM ONLINE SHOP</p>

      <h2>Place Your Order</h2>

      <p>
        Please enter your delivery information.
      </p>

      <div style="margin:18px 0;">
        ${summary}
      </div>

      <h3 style="margin:15px 0;">
        Total: ${money(total)}
      </h3>

      <form id="orderForm">

        <label style="display:block;margin:12px 0 6px;">
          Full Name
        </label>

        <input
          id="customerName"
          type="text"
          placeholder="Your full name"
          required
          style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;"
        >

        <label style="display:block;margin:12px 0 6px;">
          Mobile Number
        </label>

        <input
          id="customerPhone"
          type="tel"
          placeholder="01XXXXXXXXX"
          required
          style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;"
        >

        <label style="display:block;margin:12px 0 6px;">
          Delivery Address
        </label>

        <textarea
          id="customerAddress"
          placeholder="Full delivery address"
          required
          rows="4"
          style="width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;"
        ></textarea>

        <button
          id="submitOrderBtn"
          class="primary"
          type="submit"
          style="margin-top:16px;width:100%;"
        >
          Submit Order
        </button>

      </form>

      <p
        id="orderMessage"
        style="margin-top:12px;"
      ></p>

    </div>
  `;

  document.querySelector("#productModal")
    .classList.remove("hidden");

  document.querySelector("#orderForm")
    .addEventListener("submit", submitOrder);
}

async function submitOrder(event) {
  event.preventDefault();

  const button =
    document.querySelector("#submitOrderBtn");

  const message =
    document.querySelector("#orderMessage");

  const name =
    document.querySelector("#customerName").value.trim();

  const phone =
    document.querySelector("#customerPhone").value.trim();

  const address =
    document.querySelector("#customerAddress").value.trim();

  if (!name || !phone || !address) {
    message.textContent =
      "Please fill in all required information.";

    return;
  }

  if (!cart.length) {
    message.textContent =
      "Your cart is empty.";

    return;
  }

  button.disabled = true;
  button.textContent = "Submitting...";

  message.textContent = "";

  const orderNumber = generateOrderNumber();

  const orderProducts = cart.map(item => {
    const p = products.find(p => p.id === item.id);

    return {
      id: p.id,
      name: p.name,
      price: p.price,
      quantity: item.qty
    };
  });

  const total = getCartTotal();

  const { error } = await supabaseClient
    .from("orders")
    .insert({
      order_number: orderNumber,
      customer_name: name,
      phone: phone,
      address: address,
      products: orderProducts,
      total: total,
      status: "new"
    });

  if (error) {
    console.error(error);

    message.textContent =
      "Order could not be submitted. Please try again.";

    button.disabled = false;
    button.textContent = "Submit Order";

    return;
  }

  cart = [];
  saveCart();

  document.querySelector("#modalContent").innerHTML = `
    <div style="text-align:center;padding:20px;">

      <div style="font-size:48px;">✅</div>

      <h2>Order Submitted</h2>

      <p>
        Thank you for your order.
      </p>

      <p>
        Your Order Number:
        <strong>${orderNumber}</strong>
      </p>

      <p>
        Our team will call you to confirm your order.
      </p>

      <button
        class="primary"
        onclick="document.querySelector('#productModal').classList.add('hidden')"
      >
        Close
      </button>

    </div>
  `;
}

document.querySelector("#cartBtn").onclick = openCart;

document.querySelector("#closeCart").onclick = () =>
  document.querySelector("#cartDrawer")
    .classList.add("hidden");

document.querySelector("[data-close]").onclick = () =>
  document.querySelector("#productModal")
    .classList.add("hidden");

document.querySelector("#searchInput")
  .addEventListener("input", e => {

    const q = e.target.value.toLowerCase();

    renderProducts(
      products.filter(p =>
        (selectedCat === "All Products" ||
         p.cat === selectedCat) &&
        p.name.toLowerCase().includes(q)
      )
    );
  });

document.querySelector("#sortSelect")
  .addEventListener("change", e => {

    let list = [...products];

    if (selectedCat !== "All Products") {
      list = list.filter(p => p.cat === selectedCat);
    }

    if (e.target.value === "low") {
      list.sort((a, b) => a.price - b.price);
    }

    if (e.target.value === "high") {
      list.sort((a, b) => b.price - a.price);
    }

    if (e.target.value === "discount") {
      list.sort((a, b) => b.discount - a.discount);
    }

    renderProducts(list);
  });

document.querySelector("#checkoutBtn")
  .onclick = openCheckout;

renderCategories();
renderProducts();
saveCart();
