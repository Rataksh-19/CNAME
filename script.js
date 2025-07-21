// تسجيل دخول وهمي وتفعيل رابط السلة
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem('userLoggedIn') === 'true') {
    const cartLink = document.getElementById('cartLink');
    if (cartLink) {
      cartLink.style.display = 'inline-block';
    }
  }

  const signupBtn = document.getElementById('signupBtn');
  if (signupBtn) {
    signupBtn.addEventListener('click', () => {
      alert('تم إنشاء الحساب بنجاح!');
      localStorage.setItem('userLoggedIn', 'true');
      const cartLink = document.getElementById('cartLink');
      if (cartLink) {
        cartLink.style.display = 'inline-block';
      }
    });
  }
});

// القائمة الجانبية
function toggleMenu() {
  const menu = document.getElementById('sidebar');
  if (menu.style.display === 'flex') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'flex';
  }
}

// إضافة منتج إلى السلة
function addToCart(product, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name: product, price: price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`تمت إضافة ${product} إلى السلة`);
}

// عرض محتويات السلة في cart.html
document.addEventListener("DOMContentLoaded", function () {
  const cartItemsElement = document.getElementById('cartItems');
  const totalElement = document.getElementById('total');
  const clearBtn = document.getElementById('clearCartBtn');

  // فقط إذا كنا داخل صفحة cart.html
  if (!cartItemsElement || !totalElement) return;

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    cartItemsElement.innerHTML = "<li>السلة فارغة.</li>";
    totalElement.textContent = "";
    if (clearBtn) clearBtn.style.display = "none";
    return;
  }

  let total = 0;
  cartItemsElement.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price} ريال`;
    cartItemsElement.appendChild(li);
    total += item.price;
  });

  totalElement.textContent = `الإجمالي: ${total} ريال`;

  if (clearBtn) clearBtn.addEventListener('click', clearCart);
});

// زر مسح السلة
function clearCart() {
  if (confirm("هل أنت متأكد من مسح السلة؟")) {
    localStorage.removeItem('cart');
    location.reload();
  }
}
