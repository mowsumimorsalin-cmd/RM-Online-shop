const SUPABASE_URL = "https://bjcvebffuayrslsgntoq.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_5Qpjyf0cWmvxjTnhSRv7KQ_xD7udg0Z";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);


/* =========================
   PRODUCTS
========================= */

const products = [
  {
    id: 1,
    name: "Premium Product One",
    cat: "Featured",
    price: 1290,
    old: 1690,
    discount: 24,
    icon: "👜",
    rating: "★★★★★"
  },
  {
    id: 2,
    name: "Classic Product Two",
    cat: "New Arrivals",
    price: 890,
    old: 1190,
    discount: 25,
    icon: "👕",
    rating: "★★★★★"
  },
  {
    id: 3,
    name: "Modern Product Three",
    cat: "Best Sellers",
    price: 1490,
    old: 1990,
    discount: 25,
    icon: "⌚",
    rating: "★★★★☆"
  },
  {
    id: 4,
    name: "Everyday Product Four",
    cat: "Featured",
    price: 690,
    old: 850,
    discount: 19,
    icon: "🎧",
    rating: "★★★★★"
  },
  {
    id: 5,
    name: "Premium Product Five",
    cat: "New Arrivals",
    price: 1790,
    old: 2190,
    discount: 18,
    icon: "👟",
    rating: "★★★★☆"
  },
  {
    id: 6,
    name: "Special Product Six",
    cat: "Best Sellers",
    price: 990,
    old: 1290,
    discount: 23,
    icon: "🕶️",
    rating: "★★★★★"
  },
  {
    id: 7,
    name: "Simple Product Seven",
    cat: "Featured",
    price: 590,
    old: 750,
    discount: 21,
    icon: "🎒",
    rating: "★★★★☆"
  },
  {
    id: 8,
    name: "Limited Product Eight",
    cat: "Offers",
    price: 1190,
    old: 1590,
    discount: 25,
    icon: "💄",
    rating: "★★★★★"
  }
];


/* =========================
   CATEGORIES
========================= */

const categories = [
  "All Products",
  "New Arrivals",
  "Best Sellers",
  "Featured"
];


/* =========================
   DELIVERY CHARGES
========================= */

const deliveryCharges = {
  "Dhaka City": 80,
  "Dhaka Sub Urban": 100,
  "Outside Dhaka": 120
};


/* =========================
   DISTRICTS
========================= */

const districts = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barishal",
  "Bhola",
  "Bogura",
  "Brahmanbaria",
  "Chandpur",
  "Chattogram",
  "Chuadanga",
  "Cox's Bazar",
  "Cumilla",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jashore",
  "Jhalokathi",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachhari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Moulvibazar",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Netrokona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon"
];


/* =========================
   CART
========================= */

let cart = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

let selectedCat = "All Products";


/* =========================
   HELPERS
========================= */

const money = n =>
  "৳" + Number(n || 0).toLocaleString("en-BD");


function saveCart() {

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  renderCart();

  const count =
    document.querySelector("#cartCount");

  if (count) {
    count.textContent =
      cart.reduce(
        (sum, item) =>
          sum + Number(item.qty || 0),
        0
      );
  }
}


/* =========================
   PRODUCTS
========================= */

function renderProducts(list = products) {

  const grid =
    document.querySelector("#productGrid");

  if (!grid) return;

  grid.innerHTML = list.map(p => `
    <article class="product">

      <div class="discount">
        ${p.discount}% OFF
      </div>

      <div
        class="product-img"
        onclick="openProduct(${p.id})"
      >
        ${p.icon}
      </div>

      <div class="product-body">

        <h3>${p.name}</h3>

        <div class="stars">
          ${p.rating}
        </div>

        <div class="price">

          <b>
            ${money(p.price)}
          </b>

          <span class="old">
            ${money(p.old)}
          </span>

        </div>

        <div class="product-actions">

          <button
            onclick="addToCart(${p.id})"
          >
            Add to Cart
          </button>

          <button
            class="buy"
            onclick="buyNow(${p.id})"
          >
            Buy Now
          </button>

        </div>

      </div>

    </article>
  `).join("");
}


/* =========================
   CATEGORIES
========================= */

function renderCategories() {

  const box =
    document.querySelector("#categoryGrid");

  if (!box) return;

  box.innerHTML =
    categories.map(c => `
      <div
        class="category"
        onclick="filterCategory('${c}')"
      >
        <b>${c}</b>
        <span>
          Explore collection →
        </span>
      </div>
    `).join("");
}


function filterCategory(category) {

  selectedCat = category;

  const section =
    document.querySelector("#products");

  if (section) {
    section.scrollIntoView({
      behavior: "smooth"
    });
  }

  renderProducts(
    category === "All Products"
      ? products
      : products.filter(
          p => p.cat === category
        )
  );
}


/* =========================
   ADD TO CART
========================= */

function addToCart(id) {

  /*
    প্রতিবার Add to Cart করলে
    selected product-টি শুধু 1 quantity থাকবে।

    একই product আবার click করলেও
    quantity 2 বা 3 হবে না।
  */

  cart = [
    {
      id: id,
      qty: 1
    }
  ];

  saveCart();

  openCart();
}


/* =========================
   BUY NOW
========================= */

function buyNow(id) {

  /*
    Buy Now করলে শুধু selected product
    quantity 1 সহ cart-এ থাকবে।
  */

  cart = [
    {
      id: id,
      qty: 1
    }
  ];

  saveCart();

  openCart();
}


/* =========================
   CART
========================= */

function renderCart() {

  const box =
    document.querySelector("#cartItems");

  const totalBox =
    document.querySelector("#cartTotal");

  if (!box || !totalBox) return;


  if (!cart.length) {

    box.innerHTML =
      "<p>Your cart is empty.</p>";

    totalBox.textContent =
      money(0);

    return;
  }


  let total = 0;


  box.innerHTML =
    cart.map(item => {

      const product =
        products.find(
          p => p.id === item.id
        );

      if (!product) return "";


      const quantity =
        Number(item.qty || 1);


      total +=
        product.price * quantity;


      return `
        <div class="cart-line">

          <div class="thumb">
            ${product.icon}
          </div>

          <div style="flex:1">

            <b>
              ${product.name}
            </b>

            <div>
              ${money(product.price)}
            </div>

            <div class="qty">

              <button
                onclick="
                  changeQty(${product.id}, -1)
                "
              >
                −
              </button>

              ${quantity}

              <button
                onclick="
                  changeQty(${product.id}, 1)
                "
              >
                +
              </button>

              <button
                onclick="
                  removeItem(${product.id})
                "
              >
                Remove
              </button>

            </div>

          </div>

        </div>
      `;

    }).join("");


  totalBox.textContent =
    money(total);
}


function changeQty(id, amount) {

  const item =
    cart.find(
      x => x.id === id
    );

  if (!item) return;


  item.qty =
    Number(item.qty || 1) +
    amount;


  if (item.qty <= 0) {

    cart =
      cart.filter(
        x => x.id !== id
      );
  }


  saveCart();
}


function removeItem(id) {

  cart =
    cart.filter(
      x => x.id !== id
    );

  saveCart();
}


function openCart() {

  const drawer =
    document.querySelector("#cartDrawer");

  if (!drawer) return;

  drawer.classList.remove("hidden");

  renderCart();
}


/* =========================
   PRODUCT DETAILS
========================= */

function openProduct(id) {

  const product =
    products.find(
      p => p.id === id
    );

  if (!product) return;


  const content =
    document.querySelector(
      "#modalContent"
    );

  if (!content) return;


  content.innerHTML = `

    <div class="detail-grid">

      <div class="detail-img">
        ${product.icon}
      </div>

      <div>

        <p class="eyebrow">
          ${product.cat}
        </p>

        <h2>
          ${product.name}
        </h2>

        <div class="stars">
          ${product.rating}
        </div>

        <div class="price">

          <b>
            ${money(product.price)}
          </b>

          <span class="old">
            ${money(product.old)}
          </span>

        </div>

        <p>
          Product description will go here.
          Later you can replace this with your
          real product details.
        </p>

        <p>
          <b>
            ${product.discount}% discount
          </b>
          · In stock
        </p>

        <button
          class="primary"
          onclick="
            addToCart(${product.id});
            document.querySelector('#productModal')
              .classList.add('hidden');
          "
        >
          Add to Cart
        </button>

        <button
          class="secondary"
          onclick="
            buyNow(${product.id});
            document.querySelector('#productModal')
              .classList.add('hidden');
          "
        >
          Buy Now
        </button>

      </div>

    </div>
  `;


  document.querySelector(
    "#productModal"
  ).classList.remove("hidden");
}


/* =========================
   CART TOTAL
========================= */

function getCartTotal() {

  return cart.reduce(
    (total, item) => {

      const product =
        products.find(
          p => p.id === item.id
        );

      if (!product) {
        return total;
      }

      return total +
        (
          product.price *
          Number(item.qty || 1)
        );

    },
    0
  );
}


/* =========================
   ORDER NUMBER
========================= */

function generateOrderNumber() {

  const now = new Date();


  const date =
    now.getFullYear().toString() +
    String(
      now.getMonth() + 1
    ).padStart(2, "0") +
    String(
      now.getDate()
    ).padStart(2, "0");


  const time =
    String(
      now.getHours()
    ).padStart(2, "0") +

    String(
      now.getMinutes()
    ).padStart(2, "0") +

    String(
      now.getSeconds()
    ).padStart(2, "0");


  const random =
    Math.floor(
      100 +
      Math.random() * 900
    );


  return `RM-${date}-${time}-${random}`;
}


/* =========================
   DISTRICT OPTIONS
========================= */

function getDistrictOptions() {

  return `
    <option value="">
      Select District (Optional)
    </option>

    ${districts.map(
      district => `
        <option value="${district}">
          ${district}
        </option>
      `
    ).join("")}
  `;
}


/* =========================
   CHECKOUT
========================= */

function openCheckout() {

  if (!cart.length) {

    alert(
      "Your cart is empty."
    );

    return;
  }


  const productTotal =
    getCartTotal();


  const summary =
    cart.map(item => {

      const product =
        products.find(
          p => p.id === item.id
        );

      if (!product) return "";


      return `
        <div
          style="
            padding:8px 0;
            border-bottom:1px solid #eee;
          "
        >

          <b>
            ${product.name}
          </b>

          <br>

          Qty:
          ${item.qty}
          ×
          ${money(product.price)}

        </div>
      `;

    }).join("");


  const content =
    document.querySelector(
      "#modalContent"
    );

  if (!content) return;


  content.innerHTML = `

    <div>

      <p class="eyebrow">
        RM ONLINE SHOP
      </p>

      <h2>
        Place Your Order
      </h2>

      <p>
        Please enter your delivery information.
      </p>


      <!-- PRODUCT SUMMARY -->

      <div style="margin:18px 0;">
        ${summary}
      </div>


      <!-- PRODUCT TOTAL -->

      <div
        style="
          padding:10px 0;
          font-weight:600;
        "
      >

        Product Total:

        <span id="productTotal">
          ${money(productTotal)}
        </span>

      </div>


      <!-- ORDER FORM -->

      <form id="orderForm">


        <!-- NAME -->

        <label
          style="
            display:block;
            margin:12px 0 6px;
          "
        >
          Full Name
        </label>

        <input
          id="customerName"
          type="text"
          placeholder="Your full name"
          required
          style="
            width:100%;
            padding:12px;
            border:1px solid #ddd;
            border-radius:8px;
            box-sizing:border-box;
          "
        >


        <!-- PHONE -->

        <label
          style="
            display:block;
            margin:12px 0 6px;
          "
        >
          Mobile Number
        </label>

        <input
          id="customerPhone"
          type="tel"
          placeholder="01XXXXXXXXX"
          required
          style="
            width:100%;
            padding:12px;
            border:1px solid #ddd;
            border-radius:8px;
            box-sizing:border-box;
          "
        >


        <!-- ADDRESS -->

        <label
          style="
            display:block;
            margin:12px 0 6px;
          "
        >
          Delivery Address
        </label>

        <textarea
          id="customerAddress"
          placeholder="Full delivery address"
          required
          rows="4"
          style="
            width:100%;
            padding:12px;
            border:1px solid #ddd;
            border-radius:8px;
            box-sizing:border-box;
          "
        ></textarea>


        <!-- DISTRICT -->

        <label
          style="
            display:block;
            margin:12px 0 6px;
          "
        >
          District
          <small>
            (Optional)
          </small>
        </label>

        <select
          id="customerDistrict"
          style="
            width:100%;
            padding:12px;
            border:1px solid #ddd;
            border-radius:8px;
            background:#fff;
            box-sizing:border-box;
          "
        >

          ${getDistrictOptions()}

        </select>


        <!-- POLICE STATION -->

        <label
          style="
            display:block;
            margin:12px 0 6px;
          "
        >
          Police Station
          <small>
            (Optional)
          </small>
        </label>

        <input
          id="customerPoliceStation"
          type="text"
          placeholder="Police Station"
          style="
            width:100%;
            padding:12px;
            border:1px solid #ddd;
            border-radius:8px;
            box-sizing:border-box;
          "
        >


        <!-- DELIVERY AREA -->

        <label
          style="
            display:block;
            margin:12px 0 6px;
          "
        >
          Delivery Area
          <small>
            (Optional)
          </small>
        </label>

        <select
          id="deliveryArea"
          style="
            width:100%;
            padding:12px;
            border:1px solid #ddd;
            border-radius:8px;
            background:#fff;
            box-sizing:border-box;
          "
        >

          <option value="">
            Select Delivery Area (Optional)
          </option>

          <option value="Dhaka City">
            Dhaka City — ৳80
          </option>

          <option value="Dhaka Sub Urban">
            Dhaka Sub Urban — ৳100
          </option>

          <option value="Outside Dhaka">
            Outside Dhaka — ৳120
          </option>

        </select>


        <!-- DELIVERY CHARGE LIST -->

        <div
          style="
            margin-top:16px;
            padding:12px;
            border:1px solid #eee;
            border-radius:8px;
            background:#fafafa;
          "
        >

          <div
            style="
              display:flex;
              justify-content:space-between;
              padding:5px 0;
            "
          >

            <span>
              Dhaka City
            </span>

            <strong>
              ৳80
            </strong>

          </div>


          <div
            style="
              display:flex;
              justify-content:space-between;
              padding:5px 0;
            "
          >

            <span>
              Dhaka Sub Urban
            </span>

            <strong>
              ৳100
            </strong>

          </div>


          <div
            style="
              display:flex;
              justify-content:space-between;
              padding:5px 0;
            "
          >

            <span>
              Outside Dhaka
            </span>

            <strong>
              ৳120
            </strong>

          </div>

        </div>


        <!-- SELECTED DELIVERY CHARGE -->

        <div
          style="
            margin-top:14px;
            padding:10px 0;
            font-weight:600;
          "
        >

          Delivery Charge:

          <span id="deliveryCharge">
            ৳0
          </span>

        </div>


        <!-- FINAL TOTAL -->

        <div
          style="
            margin-top:8px;
            padding:14px 0;
            font-size:20px;
            font-weight:700;
          "
        >

          Total Amount:

          <span id="finalTotal">
            ${money(productTotal)}
          </span>

        </div>


        <!-- SUBMIT -->

        <button
          id="submitOrderBtn"
          class="primary"
          type="submit"
          style="
            margin-top:16px;
            width:100%;
          "
        >
          Submit Order
        </button>


      </form>


      <p
        id="orderMessage"
        style="
          margin-top:12px;
        "
      ></p>

    </div>
  `;


  document.querySelector(
    "#productModal"
  ).classList.remove("hidden");


  /* DELIVERY CHANGE */

  const deliverySelect =
    document.querySelector(
      "#deliveryArea"
    );

  if (deliverySelect) {

    deliverySelect.addEventListener(
      "change",
      updateDeliveryTotal
    );
  }


  /* FORM SUBMIT */

  const orderForm =
    document.querySelector(
      "#orderForm"
    );

  if (orderForm) {

    orderForm.addEventListener(
      "submit",
      submitOrder
    );
  }
}


/* =========================
   DELIVERY TOTAL
========================= */

function updateDeliveryTotal() {

  const area =
    document.querySelector(
      "#deliveryArea"
    ).value;


  const charge =
    deliveryCharges[area] || 0;


  const productTotal =
    getCartTotal();


  const finalTotal =
    productTotal + charge;


  const chargeElement =
    document.querySelector(
      "#deliveryCharge"
    );


  const totalElement =
    document.querySelector(
      "#finalTotal"
    );


  if (chargeElement) {

    chargeElement.textContent =
      money(charge);
  }


  if (totalElement) {

    totalElement.textContent =
      money(finalTotal);
  }
}


/* =========================
   SUBMIT ORDER
========================= */

async function submitOrder(event) {

  event.preventDefault();


  const button =
    document.querySelector(
      "#submitOrderBtn"
    );


  const message =
    document.querySelector(
      "#orderMessage"
    );


  const name =
    document.querySelector(
      "#customerName"
    ).value.trim();


  const phone =
    document.querySelector(
      "#customerPhone"
    ).value.trim();


  const address =
    document.querySelector(
      "#customerAddress"
    ).value.trim();


  const district =
    document.querySelector(
      "#customerDistrict"
    ).value;


  const policeStation =
    document.querySelector(
      "#customerPoliceStation"
    ).value.trim();


  const deliveryArea =
    document.querySelector(
      "#deliveryArea"
    ).value;


  const deliveryCharge =
    deliveryCharges[
      deliveryArea
    ] || 0;


  const productTotal =
    getCartTotal();


  const finalTotal =
    productTotal +
    deliveryCharge;


  if (
    !name ||
    !phone ||
    !address
  ) {

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

  button.textContent =
    "Submitting...";

  message.textContent = "";


  const orderNumber =
    generateOrderNumber();


  const orderProducts =
    cart.map(item => {

      const product =
        products.find(
          p => p.id === item.id
        );


      return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: item.qty
      };

    });


  const { error } =
    await supabaseClient
      .from("orders")
      .insert({

        order_number:
          orderNumber,

        customer_name:
          name,

        phone:
          phone,

        address:
          address,

        district:
          district || null,

        police_station:
          policeStation || null,

        delivery_area:
          deliveryArea || null,

        delivery_charge:
          deliveryCharge,

        products:
          orderProducts,

        total:
          finalTotal,

        status:
          "new"

      });


  if (error) {

    console.error(error);

    message.textContent =
      "Order could not be submitted. Please try again.";

    button.disabled = false;

    button.textContent =
      "Submit Order";

    return;
  }


  /* CLEAR CART */

  cart = [];

  saveCart();


  /* SUCCESS */

  document.querySelector(
    "#modalContent"
  ).innerHTML = `

    <div
      style="
        text-align:center;
        padding:20px;
      "
    >

      <div
        style="
          font-size:48px;
        "
      >
        ✅
      </div>


      <h2>
        Order Submitted
      </h2>


      <p>
        Thank you for your order.
      </p>


      <p>
        Your Order Number:
        <strong>
          ${orderNumber}
        </strong>
      </p>


      <p>
        Product Total:
        <strong>
          ${money(productTotal)}
        </strong>
      </p>


      <p>
        Delivery Charge:
        <strong>
          ${money(deliveryCharge)}
        </strong>
      </p>


      <p>
        Total Amount:
        <strong>
          ${money(finalTotal)}
        </strong>
      </p>


      <p>
        Our team will call you
        to confirm your order.
      </p>


      <button
        class="primary"
        onclick="
          document.querySelector('#productModal')
            .classList.add('hidden');
        "
      >
        Close
      </button>

    </div>
  `;
}


/* =========================
   BUTTON EVENTS
========================= */

const cartButton =
  document.querySelector(
    "#cartBtn"
  );

if (cartButton) {

  cartButton.onclick =
    openCart;
}


const closeCartButton =
  document.querySelector(
    "#closeCart"
  );

if (closeCartButton) {

  closeCartButton.onclick =
    () => {

      document.querySelector(
        "#cartDrawer"
      ).classList.add("hidden");

    };
}


const closeModalButton =
  document.querySelector(
    "[data-close]"
  );

if (closeModalButton) {

  closeModalButton.onclick =
    () => {

      document.querySelector(
        "#productModal"
      ).classList.add("hidden");

    };
}


/* =========================
   SEARCH
========================= */

const searchInput =
  document.querySelector(
    "#searchInput"
  );

if (searchInput) {

  searchInput.addEventListener(
    "input",
    event => {

      const query =
        event.target.value
          .toLowerCase();


      const list =
        products.filter(product => {

          const categoryMatch =
            selectedCat ===
              "All Products" ||
            product.cat ===
              selectedCat;


          const searchMatch =
            product.name
              .toLowerCase()
              .includes(query);


          return (
            categoryMatch &&
            searchMatch
          );

        });


      renderProducts(list);

    }
  );
}


/* =========================
   SORT
========================= */

const sortSelect =
  document.querySelector(
    "#sortSelect"
  );

if (sortSelect) {

  sortSelect.addEventListener(
    "change",
    event => {

      let list =
        [...products];


      if (
        selectedCat !==
        "All Products"
      ) {

        list =
          list.filter(
            product =>
              product.cat ===
              selectedCat
          );
      }


      if (
        event.target.value ===
        "low"
      ) {

        list.sort(
          (a, b) =>
            a.price - b.price
        );
      }


      if (
        event.target.value ===
        "high"
      ) {

        list.sort(
          (a, b) =>
            b.price - a.price
        );
      }


      if (
        event.target.value ===
        "discount"
      ) {

        list.sort(
          (a, b) =>
            b.discount -
            a.discount
        );
      }


      renderProducts(list);

    }
  );
}


/* =========================
   CHECKOUT BUTTON
========================= */

const checkoutButton =
  document.querySelector(
    "#checkoutBtn"
  );

if (checkoutButton) {

  checkoutButton.onclick =
    openCheckout;
}


/* =========================
   START
========================= */

renderCategories();

renderProducts();

saveCart();
