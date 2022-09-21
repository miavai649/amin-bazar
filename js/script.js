let allData;
let count = 0;
let newPrice = 0;
let vat = 0;
let cart = [];
fetch("../data.json")
  .then((res) => res.json())
  .then((data) => {
    allData = data;
    displayData(data);
  });

function displayData(data) {
  const homepageContainer = document.getElementById("homepage-container");
  data.forEach((element) => {
    // console.log(element);
    const { name, img, price, id } = element;
    const div = document.createElement("div");
    div.classList.add("card", "bg-base-900", "shadow-2xl", "p-4");
    div.innerHTML = `
        <figure class="p-5">
        <img
          src="${img}"
          class="rounded-xl w-full h-[250px]"
          alt="Shoes"
        />
      </figure>
      <div class="card-body">
        <div class="flex justify-between">
          <h2 class="card-title text-2xl">${name}</h2>
          <div class="text-lg">
            <span
              ><i class="fa-solid fa-heart mr-4 text-slate-600"></i
            ></span>
            <span
              ><i class="fa-solid fa-square-minus text-red-700"></i
            ></span>
          </div>
        </div>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <h3 class="text-xl font-bold">Price: $${price}</h3>
        <div class="card-actions justify-between">
          <label
          onclick="handleModal('${id}')"
            for="my-modal-3"
            class="btn modal-button btn-info btn-outline w-[46%]"
            ><i class="fa-solid fa-circle-info mr-2"></i>SEE
            DETAILS</label
          >
          <button onclick="handleBuyNow('${id}')" class="btn btn-secondary btn-outline w-[46%]">
            <i class="fa-solid fa-bag-shopping mr-2"></i>Buy Now
          </button>
        </div>
      </div>
        `;
    homepageContainer.appendChild(div);
  });
}

function handleModal(id) {
  const product = allData.find((item) => item.id === id);
  // console.log(product);
  const { img, name, price } = product;
  const modalDetails = document.getElementById("modal-details");
  modalDetails.innerHTML = `
        <img
        src="${img}"
        class="w-[100%] h-[200px] mx-auto object-cover"
        alt="honey jar photo"
      />
      <h3 class="text-xl my-2">
        <span class="text-violet-700">PRODUCT: </span>${name}
      </h3>
      <p class="text-base">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est,
        minima illo doloribus velit officia nisi ea vero dignissimos
        quibusdam quos atque repudiandae dolores laudantium beatae!
        Accusamus suscipit delectus id numquam.
      </p>
      <div class="my-2">
        <h3 class="text-xl text-violet-700">FEATURES:</h3>
        <p class="text-base">
          feature1, feature2, feature3, feature4
        </p>
      </div>
      <h3 class="text-xl font-bold">
        <span class="text-violet-700">PRICE: </span> $<span>${price}</span>
      </h3>
  `;
}

function handleBuyNow(id) {
  count++;
  document.getElementById("clear-btn").classList.remove("hidden");
  const product = allData.find((item) => item.id === id);
  const { id: productId, img, name, price } = product;
  cart.push(product);
  newPrice = newPrice + price;
  vat = newPrice * 0.15;

  const localData = getLocalStorage('cart');
  setLocalStorage('cart', [...localData, product]);

  const cartContainer = document.getElementById("cart-item-container");
  const divContainer = document.createElement("div");
  divContainer.classList.add(
    "my-3",
    "flex",
    "items-center",
    "justify-between",
    "rounded-md",
    "shadow-xl",
    "bg-slate-100",
    "px-3",
    "py-2"
  );
  divContainer.innerHTML = `
      <img
      class="w-[15%]"
      src="${img}"
      alt=""
    />
    <p class="text-base font-semibold">${name}</p>
    <input
      type="text"
      class="border-2 border-green-600 w-12 text-center rounded-md h-8"
      value="1"
    />
    <button onclick="handleRemove('${productId}')"><i class="fa-solid fa-trash text-xl text-red-700"></i></button>
  `;
  cartContainer.appendChild(divContainer);
  document.getElementById("product-count").innerText = count;
  document.getElementById("cart-count").innerText = count;
  document.getElementById("price").innerText = newPrice.toFixed(2);
  document.getElementById("vat").innerText = vat.toFixed(2);
  document.getElementById("total-price").innerText = (newPrice + vat).toFixed(
    2
  );
}

function clearBtn() {
  document.getElementById("cart-item-container").innerHTML = "";
  document.getElementById("clear-btn").classList.add("hidden");
  document.getElementById("cart-count").innerText = 0;
  count = 0;
}

function handleRemove(id) {
  const cartContainer = document.getElementById("cart-item-container");
  cartContainer.innerHTML = "";
  count--;

  document.getElementById("clear-btn").classList.remove("hidden");
  const product = cart.filter((item) => item.id !== id);
  cart = product;

  setLocalStorage('cart', cart)

  product.forEach((data) => {
    const { id: productId, img, name, price } = data;
    newPrice = newPrice - price;
    vat = newPrice * 0.15;

    const divContainer = document.createElement("div");
  divContainer.classList.add(
    "my-3",
    "flex",
    "items-center",
    "justify-between",
    "rounded-md",
    "shadow-xl",
    "bg-slate-100",
    "px-3",
    "py-2"
  );
  divContainer.innerHTML = `
      <img
      class="w-[15%]"
      src="${img}"
      alt=""
    />
    <p class="text-base font-semibold">${name}</p>
    <input
      type="text"
      class="border-2 border-green-600 w-12 text-center rounded-md h-8"
      value="1"
    />
    <button onclick="handleRemove('${productId}')"><i class="fa-solid fa-trash text-xl text-red-700"></i></button>
  `;
  cartContainer.appendChild(divContainer);
  });

  document.getElementById("product-count").innerText = '';
  document.getElementById("product-count").innerText = count;

  document.getElementById("cart-count").innerText = '';
  document.getElementById("cart-count").innerText = count;

  document.getElementById("price").innerText = '';
  document.getElementById("price").innerText = newPrice.toFixed(2);

  document.getElementById("vat").innerText = '';
  document.getElementById("vat").innerText = vat.toFixed(2);

  document.getElementById("total-price").innerText = '';
  document.getElementById("total-price").innerText = (newPrice + vat).toFixed(
    2
  );
}

function clearBtn() {
  document.getElementById("cart-item-container").innerHTML = "";
  document.getElementById("clear-btn").classList.add("hidden");
  document.getElementById("cart-count").innerText = 0;
  count = 0;
}

function displayPrevData(){
  const localData = getLocalStorage('cart');
  const cartContainer = document.getElementById("cart-item-container");
  cartContainer.innerHTML = "";
  count = localData.length || 0;
  cart = localData; 

  localData.forEach(data => {
    const { id: productId, img, name, price } = data;
    newPrice = newPrice + price;
    vat = newPrice * 0.15;

    const divContainer = document.createElement("div");
  divContainer.classList.add(
    "my-3",
    "flex",
    "items-center",
    "justify-between",
    "rounded-md",
    "shadow-xl",
    "bg-slate-100",
    "px-3",
    "py-2"
  );
  divContainer.innerHTML = `
      <img
      class="w-[15%]"
      src="${img}"
      alt=""
    />
    <p class="text-base font-semibold">${name}</p>
    <input
      type="text"
      class="border-2 border-green-600 w-12 text-center rounded-md h-8"
      value="1"
    />
    <button onclick="handleRemove('${productId}')"><i class="fa-solid fa-trash text-xl text-red-700"></i></button>
  `;
  cartContainer.appendChild(divContainer);
  })

  document.getElementById("product-count").innerText = '';
  document.getElementById("product-count").innerText = count;

  document.getElementById("cart-count").innerText = '';
  document.getElementById("cart-count").innerText = count;

  document.getElementById("price").innerText = '';
  document.getElementById("price").innerText = newPrice.toFixed(2);

  document.getElementById("vat").innerText = '';
  document.getElementById("vat").innerText = vat.toFixed(2);

  document.getElementById("total-price").innerText = '';
  document.getElementById("total-price").innerText = (newPrice + vat).toFixed(
    2
  );
}

displayPrevData();