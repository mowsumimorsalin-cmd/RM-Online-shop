const SUPABASE_URL = "https://bjcvebffuayrslsgntoq.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_5Qpjyf0cWmvxjTnhSRv7KQ_xD7udg0Z";

const supabaseClient = supabase.createClient(
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
   CART
========================================================= */

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

let selectedCat = "All Products";

let currentCheckoutItems = [];

let locationData = [];


/* =========================================================
   MONEY
========================================================= */

const money = n =>
  "৳" + Number(n).toLocaleString("en-BD");


/* =========================================================
   BANGLADESH DISTRICTS - ENGLISH
========================================================= */

const districtList = [
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
  "Jhalokati",
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


/* =========================================================
   DHAKA POLICE STATIONS
========================================================= */

const dhakaThanas = [
  "Adabor",
  "Airport",
  "Badda",
  "Banani",
  "Bangshal",
  "Bhashantek",
  "Cantonment",
  "Chackbazar",
  "Darussalam",
  "Daskhinkhan",
  "Demra",
  "Dhanmondi",
  "Gandaria",
  "Gulshan",
  "Hazaribag",
  "Jatrabari",
  "Kadamtoli",
  "Kafrul",
  "Kalabagan",
  "Kamrangirchar",
  "Khilgaon",
  "Khilkhet",
  "Kotwali",
  "Lalbag",
  "Mirpur Model",
  "Mohammadpur",
  "Motijheel",
  "Mugda",
  "New Market",
  "Pallabi",
  "Paltan Model",
  "Ramna Model",
  "Rampura",
  "Rupnagar",
  "Sabujbag",
  "Shah Ali",
  "Shahbag",
  "Sherebanglanagar",
  "Shyampur",
  "Sutrapur",
  "Shahjahanpur",
  "Tejgaon",
  "Tejgaon I/A",
  "Turag",
  "Uttara Model",
  "Uttarkhan",
  "Uttara West",
  "Vatara",
  "Wari"
];


/* =========================================================
   LOCATION DATA
========================================================= */

const LOCATION_DATA_URL =
  "https://iqbalhasandev.github.io/bangladesh-geo-json/bangladesh-geo.json";


/* =========================================================
   NORMALIZE TEXT
========================================================= */

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}


/* =========================================================
   FIND DISTRICT
========================================================= */

function findDistrict(input) {
  const value = normalizeText(input);

  if (!value) return null;

  return districtList.find(
    d => normalizeText(d) === value
  ) || null;
}


/* =========================================================
   DELIVERY CHARGE
   Dhaka = 80
   Other districts = 120
========================================================= */

function getDeliveryCharge(district) {
  const validDistrict = findDistrict(district);

  if (!validDistrict) {
    return 0;
  }

  if (normalizeText(validDistrict) === "dhaka") {
    return 80;
  }

  return 120;
}


/* =========================================================
   LOAD LOCATION DATA
========================================================= */

async function loadLocationData() {
  try {
    const response = await fetch(
      LOCATION_DATA_URL,
      {
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error("Location data could not be loaded.");
    }

    locationData = await response.json();

  } catch (error) {
    console.error(
      "Location data loading error:",
      error
    );

    locationData = [];
  }

  updateDistrictList();
}


/* =========================================================
   UPDATE DISTRICT DATALIST
========================================================= */

function updateDistrictList() {
  const list =
    document.querySelector("#districtList");

  if (!list) return;

  list.innerHTML =
    districtList.map(d => `
      <option value="${d}"></option>
    `).join("");
}


/* =========================================================
   GET THANA / UPAZILA
========================================================= */

function getThanaListForDistrict(district) {

  if (!district) {
    return [];
  }

  /* Dhaka = DMP Police Stations */

  if (
    normalizeText(district) === "dhaka"
  ) {
    return [...dhakaThanas];
  }


  /* Other districts = Upazilas */

  if (!Array.isArray(locationData)) {
    return [];
  }


  for (const division of locationData) {

    if (
      !division ||
      !Array.isArray(division.districts)
    ) {
      continue;
    }


    const foundDistrict =
      division.districts.find(d => {

        const name =
          normalizeText(d.name);

        const bn =
          normalizeText(d.bn_name);

        return (
          name === normalizeText(district) ||
          bn === normalizeText(district)
        );

      });


    if (
      foundDistrict &&
      Array.isArray(foundDistrict.upazilas)
    ) {

      return foundDistrict.upazilas
        .map(u =>
          typeof u === "string"
            ? u
            : u.name
        )
        .filter(Boolean);

    }

  }


  return [];
}


/* =========================================================
   UPDATE THANA DATALIST
========================================================= */

function updateThanaList() {

  const districtInput =
    document.querySelector("#customerDistrict");

  const thanaList =
    document.querySelector("#thanaList");

  const thanaInput =
    document.querySelector("#customerThana");

  if (
    !districtInput ||
    !thanaList
  ) {
    return;
  }


  const district =
    findDistrict(
      districtInput.value
    );


  const list =
    getThanaListForDistrict(
      district
    );


  thanaList.innerHTML =
    list.map(t => `
      <option value="${t}"></option>
    `).join("");


  if (
    thanaInput &&
    !district
  ) {
    thanaInput.value = "";
  }

}


/* =========================================================
   UPDATE DELIVERY CHARGE
========================================================= */

function updateDeliveryCharge() {

  const districtInput =
    document.querySelector("#customerDistrict");

  const deliveryChargeBox =
    document.querySelector("#deliveryCharge");

  const grandTotalBox =
    document.querySelector("#grandTotal");

  if (!districtInput) {
    return;
  }


  const productTotal =
    getCheckoutTotal(
      currentCheckoutItems
    );


  const deliveryCharge =
    getDeliveryCharge(
      districtInput.value
    );


  if (deliveryChargeBox) {
    deliveryChargeBox.textContent =
      money(deliveryCharge);
  }


  if (grandTotalBox) {
    grandTotalBox.textContent =
      money(
        productTotal +
        deliveryCharge
      );
  }

}


/* =========================================================
   PRODUCT RENDER
========================================================= */

function renderProducts(
  list = products
) {

  const grid =
    document.querySelector("#productGrid");

  if (!grid) return;


  grid.innerHTML =
    list.map(p => `

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

          <h3>
            ${p.name}
          </h3>


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


/* =========================================================
   CATEGORY RENDER
========================================================= */

function renderCategories() {

  const grid =
    document.querySelector("#categoryGrid");

  if (!grid) return;


  grid.innerHTML =
    categories.map(c => `

      <div
        class="category"
        onclick="filterCategory('${c}')"
      >

        <b>
          ${c}
        </b>

        <span>
          Explore collection →
        </span>

      </div>

    `).join("");

}


/* =========================================================
   FILTER CATEGORY
========================================================= */

function filterCategory(c) {

  selectedCat = c;


  const productsSection =
    document.querySelector("#products");


  if (productsSection) {

    productsSection.scrollIntoView({
      behavior: "smooth"
    });

  }


  renderProducts(
    c === "All Products"
      ? products
      : products.filter(
          p => p.cat === c
        )
  );

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(id) {

  const item =
    cart.find(
      x => x.id === id
    );


  if (item) {

    item.qty++;

  } else {

    cart.push({
      id: id,
      qty: 1
    });

  }


  saveCart();

  openCart();

}


/* =========================================================
   BUY NOW
========================================================= */

function buyNow(id) {

  currentCheckoutItems = [
    {
      id: id,
      qty: 1
    }
  ];


  openCheckout(
    currentCheckoutItems
  );

}


/* =========================================================
   SAVE CART
========================================================= */

function saveCart() {

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );


  renderCart();


  const count =
    cart.reduce(
      (sum, x) =>
        sum + x.qty,
      0
    );


  const countElement =
    document.querySelector(
      "#cartCount"
    );


  if (countElement) {

    countElement.textContent =
      count;

  }

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

  const box =
    document.querySelector(
      "#cartItems"
    );

  if (!box) return;


  if (!cart.length) {

    box.innerHTML =
      "<p>Your cart is empty.</p>";


    const total =
      document.querySelector(
        "#cartTotal"
      );


    if (total) {

      total.textContent =
        money(0);

    }


    return;
  }


  let total = 0;


  box.innerHTML =
    cart.map(x => {

      const p =
        products.find(
          p => p.id === x.id
        );


      if (!p) {
        return "";
      }


      total +=
        p.price * x.qty;


      return `

        <div class="cart-line">

          <div class="thumb">
            ${p.icon}
          </div>


          <div style="flex:1">

            <b>
              ${p.name}
            </b>


            <div>
              ${money(p.price)}
            </div>


            <div class="qty">

              <button
                onclick="changeQty(${p.id},-1)"
              >
                −
              </button>

              ${x.qty}

              <button
                onclick="changeQty(${p.id},1)"
              >
                +
              </button>

              <button
                onclick="removeItem(${p.id})"
              >
                Remove
              </button>

            </div>

          </div>

        </div>

      `;

    }).join("");


  const totalElement =
    document.querySelector(
      "#cartTotal"
    );


  if (totalElement) {

    totalElement.textContent =
      money(total);

  }

}


/* =========================================================
   CHANGE QTY
========================================================= */

function changeQty(id, n) {

  const item =
    cart.find(
      x => x.id === id
    );


  if (item) {

    item.qty += n;


    if (item.qty <= 0) {

      cart =
        cart.filter(
          y => y.id !== id
        );

    }

  }


  saveCart();

}


/* =========================================================
   REMOVE ITEM
========================================================= */

function removeItem(id) {

  cart =
    cart.filter(
      x => x.id !== id
    );


  saveCart();

}


/* =========================================================
   OPEN CART
========================================================= */

function openCart() {

  const drawer =
    document.querySelector(
      "#cartDrawer"
    );


  if (drawer) {

    drawer.classList.remove(
      "hidden"
    );

  }


  renderCart();

}


/* =========================================================
   OPEN PRODUCT
========================================================= */

function openProduct(id) {

  const p =
    products.find(
      x => x.id === id
    );


  if (!p) return;


  const modalContent =
    document.querySelector(
      "#modalContent"
    );


  if (!modalContent) return;


  modalContent.innerHTML = `

    <div class="detail-grid">

      <div class="detail-img">
        ${p.icon}
      </div>


      <div>

        <p class="eyebrow">
          ${p.cat}
        </p>


        <h2>
          ${p.name}
        </h2>


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


        <p>
          Product description will go here.
          Later you can replace this with your real
          product details, specifications, size/color
          options and delivery information.
        </p>


        <p>
          <b>
            ${p.discount}% discount
          </b>
          · In stock
        </p>


        <button
          class="primary"
          onclick="
            addToCart(${p.id});
            document.querySelector('#productModal').classList.add('hidden')
          "
        >
          Add to Cart
        </button>


        <button
          class="secondary"
          onclick="
            buyNow(${p.id});
            document.querySelector('#productModal').classList.add('hidden')
          "
        >
          Buy Now
        </button>

      </div>

    </div>

  `;


  document.querySelector(
    "#productModal"
  ).classList.remove(
    "hidden"
  );

}


/* =========================================================
   CHECKOUT TOTAL
========================================================= */

function getCheckoutTotal(
  items = []
) {

  return items.reduce(
    (total, item) => {

      const p =
        products.find(
          p => p.id === item.id
        );


      if (!p) {
        return total;
      }


      return total +
        p.price * item.qty;

    },
    0
  );

}


/* =========================================================
   CART TOTAL
========================================================= */

function getCartTotal() {

  return getCheckoutTotal(
    cart
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


  return `RM-${date}-${time}-${random}`;

}


/* =========================================================
   OPEN CHECKOUT
========================================================= */

function openCheckout(
  items = cart
) {

  if (
    !Array.isArray(items) ||
    !items.length
  ) {

    alert(
      "Your cart is empty."
    );

    return;

  }


  currentCheckoutItems =
    items.map(item => ({
      id: item.id,
      qty: item.qty
    }));


  const total =
    getCheckoutTotal(
      currentCheckoutItems
    );


  const summary =
    currentCheckoutItems.map(
      item => {

        const p =
          products.find(
            p => p.id === item.id
          );


        if (!p) {
          return "";
        }


        return `

          <div
            style="
              padding:10px 0;
              border-bottom:1px solid #eee;
            "
          >

            <b>
              ${p.name}
            </b>

            <br>

            Qty:
            ${item.qty}
            ×
            ${money(p.price)}

          </div>

        `;

      }
    ).join("");


  const modalContent =
    document.querySelector(
      "#modalContent"
    );


  if (!modalContent) return;


  modalContent.innerHTML = `

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
          margin:15px 0 8px;
          padding:12px;
          background:#f7f7f7;
          border-radius:8px;
          font-weight:700;
        "
      >

        Product Total:
        <span style="float:right;">
          ${money(total)}
        </span>

      </div>


      <!-- CALL US -->

      <div
        style="
          margin:18px 0;
          padding:14px 16px;
          background:#fff7e6;
          border:2px solid #ffb000;
          border-radius:10px;
        "
      >

        <div
          style="
            font-size:13px;
            font-weight:700;
            margin-bottom:5px;
          "
        >
          Need Help? Call Us
        </div>


        <a
          href="tel:01867646346"
          style="
            display:inline-block;
            font-size:20px;
            font-weight:800;
            color:#d97700;
            text-decoration:none;
            letter-spacing:.5px;
          "
        >
          📞 01867646346
        </a>

      </div>


      <form id="orderForm">


        <!-- FULL NAME -->

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
          autocomplete="name"
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
          autocomplete="tel"
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
          placeholder="House/Road/Area and full delivery address"
          autocomplete="street-address"
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
        </label>


        <input
          id="customerDistrict"
          type="text"
          list="districtList"
          placeholder="Type or select district"
          autocomplete="address-level1"
          required
          style="
            width:100%;
            padding:12px;
            border:1px solid #ddd;
            border-radius:8px;
            box-sizing:border-box;
          "
        >


        <datalist id="districtList"></datalist>


        <!-- DELIVERY CHARGE INFO -->

        <div
          style="
            margin-top:8px;
            padding:10px 12px;
            background:#f8f8f8;
            border-radius:8px;
            font-size:13px;
            line-height:1.7;
          "
        >

          <div>
            Dhaka city delivery charge 80 taka
          </div>

          <div>
            Outside Dhaka city delivery charge 120 taka
          </div>

        </div>


        <!-- THANA -->

        <label
          style="
            display:block;
            margin:12px 0 6px;
          "
        >
          Thana / Upazila
        </label>


        <input
          id="customerThana"
          type="text"
          list="thanaList"
          placeholder="Select district first, then type/select thana"
          autocomplete="address-level2"
          required
          style="
            width:100%;
            padding:12px;
            border:1px solid #ddd;
            border-radius:8px;
            box-sizing:border-box;
          "
        >


        <datalist id="thanaList"></datalist>


        <!-- DELIVERY CHARGE -->

        <div
          style="
            margin-top:15px;
            padding:12px;
            background:#fff7e6;
            border:1px solid #ffb000;
            border-radius:8px;
            font-weight:700;
          "
        >

          <span>
            Delivery Charge:
          </span>

          <span
            id="deliveryCharge"
            style="float:right;"
          >
            ৳0
          </span>

        </div>


        <!-- GRAND TOTAL -->

        <div
          style="
            margin-top:10px;
            padding:14px;
            background:#111;
            color:#fff;
            border-radius:8px;
            font-size:18px;
            font-weight:800;
          "
        >

          <span>
            Grand Total:
          </span>

          <span
            id="grandTotal"
            style="float:right;"
          >
            ${money(total)}
          </span>

        </div>


        <!-- SUBMIT -->

        <button
          id="submitOrderBtn"
          class="primary"
          type="submit"
          style="
            margin-top:18px;
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
  ).classList.remove(
    "hidden"
  );


  updateDistrictList();


  const districtInput =
    document.querySelector(
      "#customerDistrict"
    );


  if (districtInput) {

    districtInput.addEventListener(
      "input",
      function() {

        updateThanaList();
        updateDeliveryCharge();

      }
    );


    districtInput.addEventListener(
      "change",
      function() {

        updateThanaList();
        updateDeliveryCharge();

      }
    );

  }


  const thanaInput =
    document.querySelector(
      "#customerThana"
    );


  if (thanaInput) {

    thanaInput.addEventListener(
      "input",
      updateDeliveryCharge
    );

  }


  document.querySelector(
    "#orderForm"
  ).addEventListener(
    "submit",
    submitOrder
  );

}


/* =========================================================
   REMOVE CHECKED ITEMS FROM CART
========================================================= */

function removeCheckedItemsFromCart(
  checkedItems
) {

  for (
    const checked of checkedItems
  ) {

    const cartItem =
      cart.find(
        x => x.id === checked.id
      );


    if (!cartItem) {
      continue;
    }


    cartItem.qty -=
      checked.qty;


    if (cartItem.qty <= 0) {

      cart =
        cart.filter(
          x => x.id !== checked.id
        );

    }

  }


  saveCart();

}


/* =========================================================
   SUBMIT ORDER
========================================================= */

async function submitOrder(
  event
) {

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
    ).value.trim();


  const thana =
    document.querySelector(
      "#customerThana"
    ).value.trim();


  if (
    !name ||
    !phone ||
    !address ||
    !district ||
    !thana
  ) {

    message.textContent =
      "Please fill in all required information.";

    return;

  }


  if (
    !currentCheckoutItems.length
  ) {

    message.textContent =
      "Your order is empty.";

    return;

  }


  /* Validate District */

  const validDistrict =
    findDistrict(
      district
    );


  if (!validDistrict) {

    message.textContent =
      "Please select a valid district from the list.";

    return;

  }


  /* Validate Thana */

  const availableThanas =
    getThanaListForDistrict(
      district
    );


  const validThana =
    availableThanas.some(
      t =>
        normalizeText(t) ===
        normalizeText(thana)
    );


  if (
    availableThanas.length &&
    !validThana
  ) {

    message.textContent =
      "Please select a valid Thana / Upazila from the list.";

    return;

  }


  const productTotal =
    getCheckoutTotal(
      currentCheckoutItems
    );


  const deliveryCharge =
    getDeliveryCharge(
      district
    );


  const grandTotal =
    productTotal +
    deliveryCharge;


  button.disabled = true;

  button.textContent =
    "Submitting...";

  message.textContent =
    "";


  const orderNumber =
    generateOrderNumber();


  const orderProducts =
    currentCheckoutItems.map(
      item => {

        const p =
          products.find(
            p => p.id === item.id
          );


        return {

          id: p.id,

          name: p.name,

          price: p.price,

          quantity: item.qty

        };

      }
    );


  const completeAddress = [

    `District: ${validDistrict}`,

    `Thana / Upazila: ${thana}`,

    `Full Address: ${address}`,

    `Delivery Charge: ${money(deliveryCharge)}`

  ]
    .filter(Boolean)
    .join("\n");


  /* =======================================================
     SAVE GRAND TOTAL TO SUPABASE
  ======================================================= */

  const {
    error
  } = await supabaseClient
    .from("orders")
    .insert({

      order_number:
        orderNumber,

      customer_name:
        name,

      phone:
        phone,

      address:
        completeAddress,

      products:
        orderProducts,

      total:
        grandTotal,

      status:
        "new"

    });


  if (error) {

    console.error(
      "Order submission error:",
      error
    );


    message.innerHTML = `
      Order could not be submitted.
      Please try again.
    `;


    button.disabled =
      false;


    button.textContent =
      "Submit Order";


    return;

  }


  /* Remove checked items */

  removeCheckedItemsFromCart(
    currentCheckoutItems
  );


  const submittedOrderNumber =
    orderNumber;


  currentCheckoutItems =
    [];


  /* =======================================================
     SUCCESS SCREEN
  ======================================================= */

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
          ${submittedOrderNumber}
        </strong>
      </p>


      <p>
        Our team will call you
        to confirm your order.
      </p>


      <div
        style="
          margin:20px 0;
          padding:14px;
          background:#fff7e6;
          border:2px solid #ffb000;
          border-radius:10px;
        "
      >

        <div
          style="
            font-size:13px;
            font-weight:700;
            margin-bottom:5px;
          "
        >
          Call Us
        </div>


        <a
          href="tel:01867646346"
          style="
            font-size:20px;
            font-weight:800;
            color:#d97700;
            text-decoration:none;
          "
        >
          📞 01867646346
        </a>

      </div>


      <button
        class="primary"
        onclick="
          document.querySelector('#productModal').classList.add('hidden')
        "
      >
        Close
      </button>

    </div>

  `;

}


/* =========================================================
   CART BUTTON
========================================================= */

const cartButton =
  document.querySelector(
    "#cartBtn"
  );


if (cartButton) {

  cartButton.onclick =
    openCart;

}


/* =========================================================
   CLOSE CART
========================================================= */

const closeCartButton =
  document.querySelector(
    "#closeCart"
  );


if (closeCartButton) {

  closeCartButton.onclick =
    () =>
      document.querySelector(
        "#cartDrawer"
      ).classList.add(
        "hidden"
      );

}


/* =========================================================
   CLOSE PRODUCT MODAL
========================================================= */

const closeModalButton =
  document.querySelector(
    "[data-close]"
  );


if (closeModalButton) {

  closeModalButton.onclick =
    () =>
      document.querySelector(
        "#productModal"
      ).classList.add(
        "hidden"
      );

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
    e => {

      const q =
        e.target.value
          .toLowerCase();


      renderProducts(

        products.filter(
          p =>

            (
              selectedCat ===
              "All Products" ||
              p.cat === selectedCat
            )

            &&

            p.name
              .toLowerCase()
              .includes(q)

        )

      );

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
    e => {

      let list =
        [...products];


      if (
        selectedCat !==
        "All Products"
      ) {

        list =
          list.filter(
            p =>
              p.cat ===
              selectedCat
          );

      }


      if (
        e.target.value ===
        "low"
      ) {

        list.sort(
          (a, b) =>
            a.price - b.price
        );

      }


      if (
        e.target.value ===
        "high"
      ) {

        list.sort(
          (a, b) =>
            b.price - a.price
        );

      }


      if (
        e.target.value ===
        "discount"
      ) {

        list.sort(
          (a, b) =>
            b.discount -
            a.discount
        );

      }


      renderProducts(
        list
      );

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
    () =>
      openCheckout(
        cart
      );

}


/* =========================================================
   INITIALIZE
========================================================= */

renderCategories();

renderProducts();

saveCart();

loadLocationData();
/* =========================================================
   RM ONLINE SHOP - DELIVERY CHARGE + CALL HIGHLIGHT ADD-ON
   DO NOT REMOVE THE EXISTING DISTRICT / THANA SYSTEM
========================================================= */

(function () {

  /* -------------------------------------------------------
     DELIVERY CHARGE
     Dhaka = 80
     Other districts = 120
  ------------------------------------------------------- */

  function rmGetDeliveryCharge(district) {

    const validDistrict =
      findDistrict(district);

    if (!validDistrict) {
      return 0;
    }

    return normalizeText(validDistrict) === "dhaka"
      ? 80
      : 120;

  }


  /* -------------------------------------------------------
     UPDATE DELIVERY BOX
  ------------------------------------------------------- */

  function rmUpdateDeliveryBox() {

    const districtInput =
      document.querySelector(
        "#customerDistrict"
      );

    const deliveryBox =
      document.querySelector(
        "#rmDeliveryChargeBox"
      );

    const grandTotal =
      document.querySelector(
        "#rmGrandTotal"
      );

    if (!districtInput || !deliveryBox) {
      return;
    }


    const district =
      findDistrict(
        districtInput.value
      );


    const deliveryCharge =
      rmGetDeliveryCharge(
        districtInput.value
      );


    const productTotal =
      getCheckoutTotal(
        currentCheckoutItems
      );


    /* Selected district charge */

    const selectedText =
      district
        ? `${district} delivery charge: ${money(deliveryCharge)}`
        : "Please select your district";


    deliveryBox.querySelector(
      "#rmSelectedCharge"
    ).textContent =
      selectedText;


    /* Grand total */

    if (grandTotal) {

      grandTotal.textContent =
        money(
          productTotal +
          deliveryCharge
        );

    }

  }


  /* -------------------------------------------------------
     ADD DELIVERY BOX TO CHECKOUT
  ------------------------------------------------------- */

  const rmOriginalOpenCheckout =
    openCheckout;


  openCheckout =
    function (items = cart) {

      rmOriginalOpenCheckout(
        items
      );


      setTimeout(
        function () {

          const districtInput =
            document.querySelector(
              "#customerDistrict"
            );


          const thanaInput =
            document.querySelector(
              "#customerThana"
            );


          const submitButton =
            document.querySelector(
              "#submitOrderBtn"
            );


          if (
            !districtInput ||
            !submitButton
          ) {
            return;
          }


          /* District is required for delivery charge */

          districtInput.required =
            true;


          /* -------------------------------------------------
             DELIVERY CHARGE BOX
          ------------------------------------------------- */

          if (
            !document.querySelector(
              "#rmDeliveryChargeBox"
            )
          ) {

            const box =
              document.createElement(
                "div"
              );


            box.id =
              "rmDeliveryChargeBox";


            box.style.cssText = `
              margin-top:14px;
              padding:15px;
              border:2px solid #ffb000;
              border-radius:10px;
              background:#fffaf0;
              box-sizing:border-box;
              line-height:1.8;
            `;


            box.innerHTML = `

              <div
                style="
                  font-size:17px;
                  font-weight:800;
                  margin-bottom:7px;
                "
              >
                🚚 Delivery Charge
              </div>


              <div
                style="
                  font-size:14px;
                  font-weight:600;
                "
              >
                Dhaka city delivery charge:
                <strong>৳80</strong>
              </div>


              <div
                style="
                  font-size:14px;
                  font-weight:600;
                "
              >
                Outside Dhaka city delivery charge:
                <strong>৳120</strong>
              </div>


              <div
                style="
                  margin-top:9px;
                  padding-top:9px;
                  border-top:1px solid #e5d5ad;
                  font-size:15px;
                  font-weight:800;
                "
              >
                <span>
                  Selected Delivery Charge:
                </span>

                <span
                  id="rmSelectedCharge"
                  style="
                    float:right;
                    color:#d97700;
                  "
                >
                  Please select your district
                </span>
              </div>


              <div
                style="
                  clear:both;
                  margin-top:10px;
                  padding:12px;
                  background:#111;
                  color:#fff;
                  border-radius:8px;
                  font-size:18px;
                  font-weight:800;
                "
              >
                <span>
                  Grand Total
                </span>

                <span
                  id="rmGrandTotal"
                  style="float:right;"
                >
                  ${money(
                    getCheckoutTotal(
                      currentCheckoutItems
                    )
                  )}
                </span>
              </div>

            `;


            /*
              Put Delivery box between
              Thana and Submit Order.
            */

            submitButton.parentNode.insertBefore(
              box,
              submitButton
            );

          }


          /* -------------------------------------------------
             DISTRICT CHANGE
             Existing Thana system remains untouched.
          ------------------------------------------------- */

          districtInput.addEventListener(
            "input",
            rmUpdateDeliveryBox
          );


          districtInput.addEventListener(
            "change",
            rmUpdateDeliveryBox
          );


          /* Initial state */

          rmUpdateDeliveryBox();


        },
        50
      );

    };


  /* -------------------------------------------------------
     MAKE SUPABASE SAVE GRAND TOTAL
     Existing order system remains unchanged.
  ------------------------------------------------------- */

  const rmOriginalFrom =
    supabaseClient.from.bind(
      supabaseClient
    );


  supabaseClient.from =
    function (table) {

      const query =
        rmOriginalFrom(table);


      if (
        table !== "orders"
      ) {
        return query;
      }


      const rmOriginalInsert =
        query.insert.bind(
          query
        );


      query.insert =
        function (values, options) {

          const districtInput =
            document.querySelector(
              "#customerDistrict"
            );


          const district =
            districtInput
              ? districtInput.value.trim()
              : "";


          const deliveryCharge =
            rmGetDeliveryCharge(
              district
            );


          if (
            values &&
            !Array.isArray(values)
          ) {

            const productTotal =
              Number(
                values.total || 0
              );


            const grandTotal =
              productTotal +
              deliveryCharge;


            values = {

              ...values,

              total:
                grandTotal,

              address:
                `${values.address || ""}
Delivery Charge: ${money(deliveryCharge)}
Grand Total: ${money(grandTotal)}`

            };

          }


          return rmOriginalInsert(
            values,
            options
          );

        };


      return query;

    };


  /* -------------------------------------------------------
     TOP + BOTTOM CALL US HIGHLIGHT
  ------------------------------------------------------- */

  function rmAddCallHighlights() {

    if (
      document.querySelector(
        "#rmCallTop"
      )
    ) {
      return;
    }


    /* CSS */

    const style =
      document.createElement(
        "style"
      );


    style.textContent = `

      @keyframes rmPhonePulse {

        0% {
          transform:scale(1);
          box-shadow:0 0 0 0 rgba(255,176,0,.55);
        }

        50% {
          transform:scale(1.03);
          box-shadow:0 0 0 9px rgba(255,176,0,0);
        }

        100% {
          transform:scale(1);
          box-shadow:0 0 0 0 rgba(255,176,0,0);
        }

      }


      .rm-call-highlight {

        display:flex;
        align-items:center;
        justify-content:center;
        gap:9px;

        width:100%;
        box-sizing:border-box;

        padding:8px 12px;

        background:#fff3cd;
        border-top:2px solid #ffb000;
        border-bottom:2px solid #ffb000;

        font-weight:800;
        text-align:center;

        position:relative;
        z-index:9998;

      }


      .rm-call-highlight a {

        color:#d97700;
        text-decoration:none;
        font-size:18px;
        font-weight:900;

      }


      .rm-call-highlight .rm-phone-number {

        animation:
          rmPhonePulse 1.8s infinite;

        display:inline-block;

        padding:2px 7px;

        border-radius:7px;

      }

    `;


    document.head.appendChild(
      style
    );


    /* TOP */

    const top =
      document.createElement(
        "div"
      );


    top.id =
      "rmCallTop";


    top.className =
      "rm-call-highlight";


    top.innerHTML = `

      📞 Call Us:

      <a
        href="tel:01867646346"
      >
        <span
          class="rm-phone-number"
        >
          01867646346
        </span>
      </a>

    `;


    document.body.insertBefore(
      top,
      document.body.firstChild
    );


    /* BOTTOM */

    const bottom =
      document.createElement(
        "div"
      );


    bottom.id =
      "rmCallBottom";


    bottom.className =
      "rm-call-highlight";


    bottom.innerHTML = `

      📞 Need Help?

      <a
        href="tel:01867646346"
      >
        <span
          class="rm-phone-number"
        >
          01867646346
        </span>
      </a>

    `;


    document.body.appendChild(
      bottom
    );

  }


  rmAddCallHighlights();


})();
/* =========================================================
   MOVE DELIVERY CHARGE INFO BELOW THANA
   DO NOT CHANGE DISTRICT / THANA SYSTEM
========================================================= */

(function () {

  function rmMoveDeliveryInfo() {

    const thanaInput =
      document.querySelector("#customerThana");

    const deliveryBox =
      document.querySelector("#rmDeliveryChargeBox");

    if (
      !thanaInput ||
      !deliveryBox
    ) {
      return;
    }


    /* Already moved */
    if (
      document.querySelector("#rmDeliveryInfoBox")
    ) {
      return;
    }


    const children =
      Array.from(
        deliveryBox.children
      );


    if (children.length < 3) {
      return;
    }


    /* Take only the information part */

    const title =
      children[0];

    const dhakaText =
      children[1];

    const outsideText =
      children[2];


    /* Create separate information box */

    const infoBox =
      document.createElement("div");


    infoBox.id =
      "rmDeliveryInfoBox";


    infoBox.style.cssText = `
      margin-top:10px;
      margin-bottom:10px;
      padding:12px 14px;
      background:#f8f8f8;
      border:1px solid #ddd;
      border-radius:8px;
      box-sizing:border-box;
      line-height:1.8;
      font-size:14px;
    `;


    infoBox.appendChild(title);
    infoBox.appendChild(dhakaText);
    infoBox.appendChild(outsideText);


    /* Put the info box directly below Thana */

    thanaInput.parentNode.insertBefore(
      infoBox,
      thanaInput.nextSibling
    );

  }


  /* Run after checkout opens */

  const oldOpenCheckout =
    openCheckout;


  openCheckout =
    function (items = cart) {

      oldOpenCheckout(items);


      setTimeout(
        rmMoveDeliveryInfo,
        100
      );

    };


})();
