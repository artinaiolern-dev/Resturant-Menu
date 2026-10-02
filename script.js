// ===== Menu Data =====
const MENU = [
  {
    name: "سالاد سزار",
    desc: "کاهو با سس سزار و نان تست، همراه مرغ گریل شده",
    price: 80000,
    cat: "پیش‌غذا",
    img: "images/salad.jpg"
  },
  {
    name: "سالاد فصل",
    desc: "کاهو با سس مخصوص و نان تست",
    price: 90000,
    cat: "پیش‌غذا",
    img: "images/salad_fasl.jpg"
  },
  {
    name: "زیتون پرورده",
    desc: "بسته بندی شده به همراه قاشق",
    price: 20000,
    cat: "پیش‌غذا",
    img: "images/zeyton.jpg"
  },
  {
    name: "پیتزا مارگاریتا",
    desc: "پیتزا با پنیر موزارلا تازه، سس گوجه و ریحان",
    price: 150000,
    cat: "پیتزا",
    img: "images/pizza.jpg"
  },
  {
    name: "پیتزا چیکن",
    desc: "پیتزا با مرغ تازه، سس گوجه و ریحان",
    price: 200000,
    cat: "پیتزا",
    img: "images/pizza_chiken.jpg"
  },
  {
    name: "پیتزا تکس مکس",
    desc: "پیتزا سس تکس مکس، زیتون و ریحان",
    price: 250000,
    cat: "پیتزا",
    img: "images/pizza_taksmaks.jpg"
  },
  {
    name: "لیموناد",
    desc: "نوشیدنی طبیعی لیمو، بدون مواد افزودنی",
    price: 30000,
    cat: "نوشیدنی",
    img: "images/lemonade.jpg"
  },
  {
    name: "نوشابه کوکا کولا",
    desc: "نوشیدنی طبیعی کولا، به همراه یخ و لیوان",
    price: 47000,
    cat: "نوشیدنی",
    img: "images/kokakola.jpg"
  },
  {
    name: "نوشابه فانتا",
    desc: "نوشیدنی طبیعی فانتا، به همراه یخ و لیوان",
    price: 40000,
    cat: "نوشیدنی",
    img: "images/fanta.jpg"
  },
  {
    name: "همبرگر کلاسیک",
    desc: "همبرگر با گوشت تازه، کاهو و گوجه فرنگی",
    price: 120000,
    cat: "همبرگر",
    img: "images/burger_classic.jpg"
  },
  {
    name: "چیز برگر",
    desc: "همبرگر با پنیر چدار، کاهو و سس مخصوص",
    price: 135000,
    cat: "همبرگر",
    img: "images/cheeseburger.jpg"
  },
  {
    name: "همبرگر با قارچ",
    desc: "همبرگر گوشت با قارچ گریل شده و پنیر",
    price: 140000,
    cat: "همبرگر",
    img: "images/mushroom_burger.jpg"
  },
  {
    name: "پاستا آلفردو",
    desc: "پاستا با سس آلفردو و مرغ گریل شده",
    price: 130000,
    cat: "پاستا",
    img: "images/pasta_alfredo.jpg"
  },
  {
    name: "پاستا بولونز",
    desc: "پاستا با سس گوشت و پنیر پارمزان",
    price: 125000,
    cat: "پاستا",
    img: "images/pasta_bolognese.jpg"
  },
  {
    name: "پاستا پستو",
    desc: "پاستا با سس پستو و سبزیجات تازه",
    price: 120000,
    cat: "پاستا",
    img: "images/pasta_pesto.jpg"
  }
];

// ===== DOM Elements =====
const menuDiv      = document.getElementById("menu");
const nav          = document.getElementById("categories");
const modal        = document.getElementById("modal");
const modalImg     = document.getElementById("modalImg");
const modalName    = document.getElementById("modalName");
const modalDesc    = document.getElementById("modalDesc");
const modalPrice   = document.getElementById("modalPrice");
const closeModal   = document.getElementById("closeModal");

// ===== Render Menu =====
function renderMenu(cat = "all") {
  let items = MENU;

  if (cat !== "all") {
    items = MENU.filter(item => item.cat === cat);
  }

  menuDiv.innerHTML = items.map(item => `
    <div class="card"
         data-name="${item.name}"
         data-desc="${item.desc}"
         data-price="${item.price}"
         data-img="${item.img}">
      <img src="${item.img}" alt="${item.name}">
      <div class="info">
        <div class="name">${item.name}</div>
        <div class="price">${item.price.toLocaleString("fa-IR")} تومان</div>
      </div>
    </div>
  `).join("");
}

// ===== Render Categories =====
function renderCategories() {
  const categories = ["all", ...new Set(MENU.map(item => item.cat))];

  nav.innerHTML = categories.map(cat => `
    <button data-cat="${cat}" class="${cat === "all" ? "active" : ""}">
      ${cat === "all" ? "همه" : cat}
    </button>
  `).join("");

  const catBtns = nav.querySelectorAll("button");

  catBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      catBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderMenu(btn.dataset.cat);
    });
  });
}

// ===== Modal Functions =====
function openModal(item) {
  modalImg.src    = item.img;
  modalName.textContent  = item.name;
  modalDesc.textContent  = item.desc;
  modalPrice.textContent = item.price.toLocaleString("fa-IR") + " تومان";

  modal.classList.add("show");
  document.body.classList.add("modal-open");
}

function closeModalFunc() {
  modal.classList.remove("show");
  document.body.classList.remove("modal-open");
}

// ===== Card Click Event =====
menuDiv.addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (!card) return;

  const item = {
    name:  card.dataset.name,
    desc:  card.dataset.desc,
    price: parseInt(card.dataset.price),
    img:   card.dataset.img
  };

  openModal(item);
});

// ===== Close Modal =====
closeModal.addEventListener("click", closeModalFunc);

modal.addEventListener("click", e => {
  if (e.target === modal) closeModalFunc();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("show")) closeModalFunc();
});

// ===== Initial Render =====
renderCategories();
renderMenu();
