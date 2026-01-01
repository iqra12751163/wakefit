let cart = {};
const sections = document.querySelectorAll(".section");

function hideAll() {
  sections.forEach(s => s.classList.add("hidden"));
}

function showHome() {
  hideAll();
  document.getElementById("home").classList.remove("hidden");
}

function showSection(id) {
  hideAll();
  document.getElementById(id).classList.remove("hidden");

  // ✅ Clear message when opening Contact page
  if (id === "contact") {
    document.getElementById("contactMsg").textContent = "";
  }
}

/* ================= CART ================= */

function addToCart(name, price, img) {
  if (!cart[name]) {
    cart[name] = { price: price, qty: 0, img: img };
  }
  cart[name].qty++;
  updateCart();
  alert("Added to cart");
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  for (let item in cart) {
    const p = cart[item];
    const itemTotal = p.price * p.qty;

    total += itemTotal;
    count += p.qty;

    cartItems.innerHTML += `
      <tr>
        <td><img src="${p.img}" width="70"></td>
        <td>${item}</td>
        <td>
          <button onclick="changeQty('${item}', -1)">−</button>
          ${p.qty}
          <button onclick="changeQty('${item}', 1)">+</button>
        </td>
        <td>₹${itemTotal}</td>
      </tr>
    `;
  }

  cartCount.textContent = count;
  cartTotal.textContent = total;
}

function changeQty(item, change) {
  cart[item].qty += change;

  if (cart[item].qty <= 0) {
    delete cart[item];
  }
  updateCart();
}

function confirmOrder() {
  alert("Order confirmed! Thank you for shopping!");
  cart = {};
  updateCart();
}

/* ================= CONTACT ================= */

function submitContact(e) {
  e.preventDefault();

  const name = document.getElementById("cname").value.trim();
  const email = document.getElementById("cemail").value.trim();
  const phone = document.getElementById("cphone").value.trim();
  const msg = document.getElementById("cmsg").value.trim();

  // ✅ Phone must be exactly 10 digits
  const phoneRegex = /^[0-9]{10}$/;

  if (!phoneRegex.test(phone)) {
    alert("Invalid phone number! Enter exactly 10 digits.");
    return;
  }

  const text = `Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${msg}`;

  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "contact-message.txt";
  a.click();

  document.getElementById("contactMsg").textContent =
    "Thank you for contacting us!";

  e.target.reset();
}

showHome();
let discountApplied = false;

function applyCoupon() {
  const code = document.getElementById("couponCode").value.trim();
  const cartTotal = document.getElementById("cartTotal");

  let total = Number(cartTotal.textContent);

  if (code === "WAKEFIT10" && !discountApplied) {
    total = total - total * 0.10; // 10% OFF
    cartTotal.textContent = Math.round(total);
    discountApplied = true;
    alert("Coupon applied! 10% discount");
  } else if (discountApplied) {
    alert("Coupon already applied");
  } else {
    alert("Invalid coupon code");
  }
}

