const SUPABASE_URL = "https://bjcvebffuayrslsgntoq.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_5Qpjyf0cWmvxjTnhSRv7KQ_xD7udg0Z";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);


/* =========================================================
   PRODUCTS
========================================================= */

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


/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  "All Products",
  "New Arrivals",
  "Best Sellers",
  "Featured"
];


/* =========================================================
   DELIVERY CHARGES
========================================================= */

const deliveryCharges = {
  "Dhaka City": 80,
  "Dhaka Sub Urban": 100,
  "Outside Dhaka": 120
};


/* =========================================================
   LOCATION DATA
   64 District + Upazila/Thana
========================================================= */

const LOCATION_URL =
  "https://raw.githubusercontent.com/HedaetShahriar/bangladesh-locations-dataset/main/data/bd_locations.json";

let locationData = null;


/* =========================================================
   CART
========================================================= */

let cart = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

let selectedCat = "All Products";


/* =========================================================
   HELPERS
========================================================= */

function money(value) {
  return "৳" + Number(value || 0).toLocaleString("en-BD");
}


function getProduct(id) {
  return products.find(
    product => Number(product.id) === Number(id)
  );
}


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


/* =========================================================
   CALL NOW
========================================================= */

function addCallNowStyles() {

  if (
    document.getElementById(
      "rmCallNowStyles"
    )
  ) {
    return;
  }

  const style =
    document.createElement("style");

  style.id = "rmCallNowStyles";

  style.textContent = `

    @keyframes rmCallBounce {
      0%, 80%, 100% {
        transform: translateY(0);
      }

      90% {
        transform: translateY(-4px);
      }
    }

    @keyframes rmCallPulse {
      0%, 100% {
        transform: scale(1);
        box-shadow:
          0 0 0 0 rgba(220, 38, 38, 0.30);
      }

      50% {
        transform: scale(1.04);
        box-shadow:
          0 0 0 8px rgba(220, 38, 38, 0);
      }
    }

    .rm-call-top {
      width: 100%;
      box-sizing: border-box;
      background: #111;
      color: #fff;
      text-align: center;
      padding: 8px 12px;
      font-size: 14px;
      font-weight: 800;
      position: relative;
      z-index: 9998;
    }

    .rm-call-top a {
      color: #fff;
      text-decoration: none;
      display: inline-block;
      animation:
        rmCallBounce 2.2s infinite;
    }

    .rm-call-bottom {
      width: 100%;
      box-sizing: border-box;
      text-align: center;
      padding: 28px 15px;
      margin-top: 25px;
      background: #f7f7f7;
      border-top: 1px solid #eee;
    }

    .rm-call-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: #dc2626;
      color: #fff !important;
      text-decoration: none !important;
      padding: 13px 25px;
      border-radius: 999px;
      font-size: 16px;
      font-weight: 800;
      animation:
        rmCallPulse 2s infinite;
    }

    .rm-call-icon {
      display: inline-block;
      animation:
        rmCallBounce 1.6s infinite;
    }

    .rm-location-note {
      margin-top: 6px;
      color: #777;
      font-size: 12px;
    }

    .rm-order-call {
      margin-top: 18px;
      text-align: center;
      font-size: 13px;
    }

    .rm-order-call a {
      color: #dc2626;
      font-weight: 800;
      text-decoration: none;
    }

    @media (max-width: 600px) {
      .rm-call-top {
        font-size: 13px;
      }

      .rm-call-button {
        font-size: 15px;
        padding: 12px 21px;
      }
    }
  `;

  document.head.appendChild(style);
}


function addCallNow() {

  addCallNowStyles();

  /* TOP CALL NOW */

  if (
    !document.getElementById(
      "rmCallTop"
    )
  ) {

    const top =
      document.createElement("div");

    top.id = "rmCallTop";
    top.className = "rm-call-top";

    top.innerHTML = `
      📞
      <a href="tel:01867646346">
        CALL NOW — 01867646346
      </a>
    `;

    document.body.prepend(top);
  }


  /* BOTTOM CALL NOW */

  if (
    !document.getElementById(
      "rmCallBottom"
    )
  ) {

    const bottom =
      document.createElement("div");

    bottom.id = "rmCallBottom";
    bottom.className =
      "rm-call-bottom";

    bottom.innerHTML = `
      <a
        class="rm-call-button"
        href="tel:01867646346"
      >
        <span class="rm-call-icon">
          📞
        </span>

        CALL NOW — 01867646346
      </a>

      <div class="rm-location-note">
        Need help with your order?
        Call us directly.
      </div>
    `;

    const footer =
      document.querySelector("footer");

    if (footer) {
      footer.parentNode.insertBefore(
        bottom,
        footer
      );
    } else {
      document.body.appendChild(bottom);
    }
  }
}


/* =========================================================
   PRODUCTS
========================================================= */

function renderProducts(
  list = products
) {

  const grid =
    document.querySelector(
      "#productGrid"
    );

  if (!grid) return;

  grid.innerHTML =
    list.map(product => `

      <article class="product">

        <div class="discount">
          ${product.discount}% OFF
        </div>

        <div
          class="product-img"
          onclick="openProduct(${product.id})"
        >
          ${product.icon}
        </div>

        <div class="product-body">

          <h3>
            ${product.name}
          </h3>

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

          <div class="product-actions">

            <button
              type="button"
              onclick="addToCart(${product.id})"
            >
              Add to Cart
            </button>

            <button
              type="button"
              class="buy"
              onclick="buyNow(${product.id})"
            >
              Buy Now
            </button>

          </div>

        </div>

      </article>

    `).join("");
}


/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories() {

  const box =
    document.querySelector(
      "#categoryGrid"
    );

  if (!box) return;

  box.innerHTML =
    categories.map(category => `

      <div
        class="category"
        onclick="
          filterCategory('${category}')
        "
      >

        <b>
          ${category}
        </b>

        <span>
          Explore collection →
        </span>

      </div>

    `).join("");
}


function filterCategory(category) {

  selectedCat = category;

  const section =
    document.querySelector(
      "#products"
    );

  if (section) {

    section.scrollIntoView({
      behavior: "smooth"
    });

  }

  renderProducts(
    category === "All Products"
      ? products
      : products.filter(
          product =>
            product.cat === category
        )
  );
}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(id) {

  /*
    One click = selected product only
    Quantity always starts at 1.
  */

  cart = [
    {
      id: Number(id),
      qty: 1
    }
  ];

  saveCart();

  openCart();
}


/* =========================================================
   BUY NOW
========================================================= */

function buyNow(id) {

  /*
    Buy Now:
    1. Selected product only
    2. Quantity 1
    3. Cart drawer closes
    4. Order form opens directly
  */

  cart = [
    {
      id: Number(id),
      qty: 1
    }
  ];

  saveCart();

  const drawer =
    document.querySelector(
      "#cartDrawer"
    );

  if (drawer) {
    drawer.classList.add("hidden");
  }

  setTimeout(() => {
    openCheckout();
  }, 80);
}


/* =========================================================
   CART
========================================================= */

function renderCart() {

  const box =
    document.querySelector(
      "#cartItems"
    );

  const totalBox =
    document.querySelector(
      "#cartTotal"
    );

  if (!box || !totalBox) {
    return;
  }

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
        getProduct(item.id);

      if (!product) {
        return "";
      }

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
                type="button"
                onclick="
                  changeQty(
                    ${product.id},
                    -1
                  )
                "
              >
                −
              </button>

              ${quantity}

              <button
                type="button"
                onclick="
                  changeQty(
                    ${product.id},
                    1
                  )
                "
              >
                +
              </button>

              <button
                type="button"
                onclick="
                  removeItem(
                    ${product.id}
                  )
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


function changeQty(
  id,
  amount
) {

  const item =
    cart.find(
      product =>
        Number(product.id) ===
        Number(id)
    );

  if (!item) return;

  item.qty =
    Number(item.qty || 1) +
    Number(amount);


  if (item.qty <= 0) {

    cart =
      cart.filter(
        product =>
          Number(product.id) !==
          Number(id)
      );

  }

  saveCart();
}


function removeItem(id) {

  cart =
    cart.filter(
      item =>
        Number(item.id) !==
        Number(id)
    );

  saveCart();
}


function openCart() {

  const drawer =
    document.querySelector(
      "#cartDrawer"
    );

  if (!drawer) return;

  drawer.classList.remove(
    "hidden"
  );

  renderCart();
}


function closeCart() {

  const drawer =
    document.querySelector(
      "#cartDrawer"
    );

  if (!drawer) return;

  drawer.classList.add(
    "hidden"
  );
}


/* =========================================================
   PRODUCT DETAILS
========================================================= */

function openProduct(id) {

  const product =
    getProduct(id);

  if (!product) return;

  const content =
    document.querySelector(
      "#modalContent"
    );

  const modal =
    document.querySelector(
      "#productModal"
    );

  if (!content || !modal) {
    return;
  }


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
          Later you can replace this with
          your real product details.
        </p>

        <p>
          <b>
            ${product.discount}% discount
          </b>
          · In stock
        </p>

        <button
          type="button"
          class="primary"
          onclick="
            addToCart(${product.id});
            document
              .querySelector('#productModal')
              .classList.add('hidden');
          "
        >
          Add to Cart
        </button>

        <button
          type="button"
          class="secondary"
          onclick="
            buyNow(${product.id});
            document
              .querySelector('#productModal')
              .classList.add('hidden');
          "
        >
          Buy Now
        </button>

      </div>

    </div>

  `;

  modal.classList.remove(
    "hidden"
  );
}


/* =========================================================
   CART TOTAL
========================================================= */

function getCartTotal() {

  return cart.reduce(
    (total, item) => {

      const product =
        getProduct(item.id);

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


/* =========================================================
   ORDER NUMBER
========================================================= */

function generateOrderNumber() {

  const now =
    new Date();

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


  return `
    RM-${date}-${time}-${random}
  `.trim();
}


/* =========================================================
   LOCATION DATA LOAD
========================================================= */

async function loadLocationData() {

  if (locationData) {
    populateDistricts();
    return;
  }


  const districtSelect =
    document.querySelector(
      "#customerDistrict"
    );

  if (districtSelect) {

    districtSelect.innerHTML = `
      <option value="">
        Loading Districts...
      </option>
    `;
  }


  try {

    const response =
      await fetch(
        LOCATION_URL,
        {
          cache: "force-cache"
        }
      );


    if (!response.ok) {
      throw new Error(
        "Location data failed."
      );
    }


    const data =
      await response.json();


    if (
      !data ||
      !Array.isArray(
        data.divisions
      )
    ) {
      throw new Error(
        "Invalid location data."
      );
    }


    locationData =
      data.divisions;


    populateDistricts();

  } catch (error) {

    console.error(
      "Location loading error:",
      error
    );


    if (districtSelect) {

      districtSelect.innerHTML = `
        <option value="">
          Select District (Optional)
        </option>
      `;

    }

    const note =
      document.querySelector(
        "#locationNote"
      );

    if (note) {

      note.textContent =
        "District list could not be loaded. You can type your location manually.";

    }
  }
}


/* =========================================================
   DISTRICT LIST
========================================================= */

function getAllDistricts() {

  const list = [];

  if (!Array.isArray(locationData)) {
    return list;
  }


  locationData.forEach(
    division => {

      if (
        !Array.isArray(
          division.districts
        )
      ) {
        return;
      }


      division.districts.forEach(
        district => {

          if (
            district &&
            district.name
          ) {

            list.push(
              district
            );

          }

        }
      );

    }
  );


  return list.sort(
    (a, b) =>
      String(a.name).localeCompare(
        String(b.name)
      )
  );
}


function populateDistricts() {

  const districtSelect =
    document.querySelector(
      "#customerDistrict"
    );

  if (!districtSelect) {
    return;
  }


  districtSelect.innerHTML = `
    <option value="">
      Select District (Optional)
    </option>
  `;


  const districts =
    getAllDistricts();


  districts.forEach(
    district => {

      const option =
        document.createElement(
          "option"
        );

      option.value =
        district.name;

      /*
        Customer sees:
        Bangla name + English name
        if available.
      */

      option.textContent =
        district.bnName
          ? `${district.bnName} (${district.name})`
          : district.name;

      districtSelect.appendChild(
        option
      );

    }
  );
}


/* =========================================================
   FIND SELECTED DISTRICT
========================================================= */

function findDistrict(
  districtName
) {

  if (!Array.isArray(locationData)) {
    return null;
  }


  for (
    const division
    of locationData
  ) {

    if (
      !Array.isArray(
        division.districts
      )
    ) {
      continue;
    }


    const district =
      division.districts.find(
        item =>
          item.name ===
          districtName
      );


    if (district) {
      return district;
    }
  }


  return null;
}


/* =========================================================
   DISTRICT → THANA / UPAZILA
   CUSTOMER SEES ONLY NAME
========================================================= */

function populatePoliceStations() {

  const districtSelect =
    document.querySelector(
      "#customerDistrict"
    );

  const policeInput =
    document.querySelector(
      "#customerPoliceStation"
    );

  const list =
    document.querySelector(
      "#policeStationList"
    );

  if (
    !districtSelect ||
    !policeInput ||
    !list
  ) {
    return;
  }


  list.innerHTML = "";

  policeInput.value = "";


  const districtName =
    districtSelect.value;


  if (!districtName) {

    policeInput.placeholder =
      "Select District first";

    return;
  }


  const district =
    findDistrict(
      districtName
    );


  if (
    !district ||
    !Array.isArray(
      district.upazilas
    )
  ) {

    policeInput.placeholder =
      "Type your Thana / Upazila";

    return;
  }


  /*
    We intentionally do NOT show
    "Thana" or "Upazila".

    Customer sees only the location name.
  */

  const names = [];

  district.upazilas.forEach(
    location => {

      if (
        location &&
        location.name
      ) {

        names.push({
          name:
            location.name,

          bnName:
            location.bnName || ""
        });

      }

    }
  );


  /*
    Remove duplicate names.
  */

  const unique =
    new Map();


  names.forEach(
    item => {

      const key =
        item.name
          .toLowerCase()
          .trim();

      if (
        !unique.has(key)
      ) {

        unique.set(
          key,
          item
        );

      }

    }
  );


  Array.from(
    unique.values()
  )
  .sort(
    (a, b) =>
      String(a.name).localeCompare(
        String(b.name)
      )
  )
  .forEach(
    location => {

      const option =
        document.createElement(
          "option"
        );

      /*
        Value = English name
        Label = Bangla + English
        No type label.
      */

      option.value =
        location.name;

      option.label =
        location.bnName
          ? `${location.bnName} (${location.name})`
          : location.name;

      list.appendChild(
        option
      );

    }
  );


  policeInput.placeholder =
    unique.size
      ? "Type or select location"
      : "Type Police Station / Upazila";

}


/* =========================================================
   CHECKOUT
========================================================= */

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
        getProduct(item.id);

      if (!product) {
        return "";
      }


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

  const modal =
    document.querySelector(
      "#productModal"
    );


  if (
    !content ||
    !modal
  ) {
    return;
  }


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

      <div
        style="
          margin:18px 0;
        "
      >
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
            resize:vertical;
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

          <option value="">
            Loading Districts...
          </option>

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
          list="policeStationList"
          autocomplete="off"
          placeholder="Select District first"
          style="
            width:100%;
            padding:12px;
            border:1px solid #ddd;
            border-radius:8px;
            box-sizing:border-box;
          "
        >

        <datalist
          id="policeStationList"
        ></datalist>


        <div
          id="locationNote"
          class="rm-location-note"
        >
          Select a District to see
          its locations.
        </div>


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


        <!-- DELIVERY CHARGE -->

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


        <!-- CALL NOW -->

        <div class="rm-order-call">

          Need help before confirming?

          <a href="tel:01867646346">
            📞 CALL NOW — 01867646346
          </a>

        </div>


      </form>


      <p
        id="orderMessage"
        style="
          margin-top:12px;
        "
      ></p>

    </div>

  `;


  modal.classList.remove(
    "hidden"
  );


  /*
    Load Districts
  */

  if (locationData) {
    populateDistricts();
  } else {
    loadLocationData();
  }


  /*
    District change
  */

  const districtSelect =
    document.querySelector(
      "#customerDistrict"
    );

  if (districtSelect) {

    districtSelect.addEventListener(
      "change",
      populatePoliceStations
    );

  }


  /*
    Delivery change
  */

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


  /*
    Form submit
  */

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


  /*
    Start with zero delivery charge
  */

  updateDeliveryTotal();
}


/* =========================================================
   DELIVERY TOTAL
========================================================= */

function updateDeliveryTotal() {

  const deliverySelect =
    document.querySelector(
      "#deliveryArea"
    );

  if (!deliverySelect) {
    return;
  }


  const area =
    deliverySelect.value;


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


  const productTotalElement =
    document.querySelector(
      "#productTotal"
    );


  if (chargeElement) {

    chargeElement.textContent =
      money(charge);

  }


  if (totalElement) {

    totalElement.textContent =
      money(finalTotal);

  }


  if (productTotalElement) {

    productTotalElement.textContent =
      money(productTotal);

  }
}


/* =========================================================
   SUBMIT ORDER
========================================================= */

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
    document
      .querySelector(
        "#customerName"
      )
      .value
      .trim();


  const phone =
    document
      .querySelector(
        "#customerPhone"
      )
      .value
      .trim();


  const address =
    document
      .querySelector(
        "#customerAddress"
      )
      .value
      .trim();


  const districtElement =
    document.querySelector(
      "#customerDistrict"
    );


  const policeElement =
    document.querySelector(
      "#customerPoliceStation"
    );


  const deliveryElement =
    document.querySelector(
      "#deliveryArea"
    );


  const district =
    districtElement
      ? districtElement.value
      : "";


  const policeStation =
    policeElement
      ? policeElement.value.trim()
      : "";


  const deliveryArea =
    deliveryElement
      ? deliveryElement.value
      : "";


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

    if (message) {

      message.textContent =
        "Please fill in your Name, Mobile Number and Delivery Address.";

    }

    return;
  }


  /*
    Basic Bangladesh / international
    phone length validation.
  */

  const phoneDigits =
    phone.replace(
      /\D/g,
      ""
    );


  if (
    phoneDigits.length < 10 ||
    phoneDigits.length > 15
  ) {

    if (message) {

      message.textContent =
        "Please enter a valid mobile number.";

    }

    return;
  }


  if (!cart.length) {

    if (message) {

      message.textContent =
        "Your cart is empty.";

    }

    return;
  }


  if (button) {

    button.disabled = true;
    button.textContent =
      "Submitting...";
    button.style.opacity =
      "0.6";

  }


  if (message) {
    message.textContent = "";
  }


  const orderNumber =
    generateOrderNumber();


  const orderProducts =
    cart.map(item => {

      const product =
        getProduct(item.id);


      return {

        id:
          product.id,

        name:
          product.name,

        price:
          product.price,

        quantity:
          Number(item.qty),

        subtotal:
          product.price *
          Number(item.qty)

      };

    });


  try {

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

      console.error(
        "Supabase order error:",
        error
      );


      if (message) {

        message.textContent =
          "Order could not be submitted. Please try again.";

      }


      if (button) {

        button.disabled = false;

        button.textContent =
          "Submit Order";

        button.style.opacity =
          "1";

      }

      return;
    }


    /*
      Clear cart only after
      successful Supabase insert.
    */

    cart = [];

    saveCart();


    /*
      SUCCESS SCREEN
    */

    const content =
      document.querySelector(
        "#modalContent"
      );


    if (content) {

      content.innerHTML = `

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

          <a
            href="tel:01867646346"
            style="
              display:inline-flex;
              align-items:center;
              justify-content:center;
              gap:7px;
              margin-top:10px;
              padding:12px 20px;
              border-radius:999px;
              background:#dc2626;
              color:#fff;
              text-decoration:none;
              font-weight:800;
            "
          >
            📞 CALL NOW — 01867646346
          </a>

          <br>

          <button
            type="button"
            class="primary"
            onclick="
              document
                .querySelector('#productModal')
                .classList.add('hidden');
            "
            style="
              margin-top:15px;
            "
          >
            Close
          </button>

        </div>

      `;

    }

  } catch (error) {

    console.error(
      "Order submission error:",
      error
    );


    if (message) {

      message.textContent =
        "Something went wrong. Please try again.";

    }


    if (button) {

      button.disabled = false;

      button.textContent =
        "Submit Order";

      button.style.opacity =
        "1";

    }

  }

}


/* =========================================================
   BUTTON EVENTS
========================================================= */

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
    closeCart;

}


const closeModalButton =
  document.querySelector(
    "[data-close]"
  );

if (closeModalButton) {

  closeModalButton.onclick =
    () => {

      const modal =
        document.querySelector(
          "#productModal"
        );

      if (modal) {

        modal.classList.add(
          "hidden"
        );

      }

    };

}


/* =========================================================
   SEARCH
========================================================= */

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
          .toLowerCase()
          .trim();


      const list =
        products.filter(
          product => {

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

          }
        );


      renderProducts(list);

    }
  );

}


/* =========================================================
   SORT
========================================================= */

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


/* =========================================================
   CHECKOUT BUTTON
========================================================= */

const checkoutButton =
  document.querySelector(
    "#checkoutBtn"
  );

if (checkoutButton) {

  checkoutButton.onclick =
    () => {

      closeCart();

      setTimeout(
        openCheckout,
        80
      );

    };

}


/* =========================================================
   START
========================================================= */

renderCategories();

renderProducts();

saveCart();

addCallNow();


/* =========================================================
   GLOBAL FUNCTIONS
========================================================= */

window.addToCart =
  addToCart;

window.buyNow =
  buyNow;

window.openCart =
  openCart;

window.closeCart =
  closeCart;

window.changeQty =
  changeQty;

window.removeItem =
  removeItem;

window.openProduct =
  openProduct;

window.openCheckout =
  openCheckout;

window.updateDeliveryTotal =
  updateDeliveryTotal;

window.submitOrder =
  submitOrder;

window.filterCategory =
  filterCategory;
