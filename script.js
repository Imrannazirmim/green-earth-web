//all plants loaded or create
const allTreesBtn = document.getElementById("all_tress");
const priceNumber = document.getElementById("price_number");
let pricesArray = [];

//menu bar create

const showSpinnerLoading = () => {
  const spinner = document.getElementById("loading-spinner");
  if (spinner) {
    spinner.classList.remove("hidden");
  }
};

const hideSpinner = () => {
  const spinner = document.getElementById("loading-spinner");
  if (spinner) {
    spinner.classList.add("hidden");
  }
};

const menuBar = document.getElementById("menu-bar");
const toggleMenu = document.getElementById("toggle-menu");
menuBar.addEventListener("click", () => {
  toggleMenu.classList.toggle("active");
});

const loadingAllPlants = async () => {
  try {
    showSpinnerLoading();
    const url = `https://openapi.programming-hero.com/api/plants`;
    const res = await fetch(url);
    const data = await res.json();
    removeActiveList();
    allTreesBtn.classList.add("active");
    displayLoadingAllPlants(data.plants);
    hideSpinner();
  } catch (error) {
    throw new Error(error);
  }
};

const displayLoadingAllPlants = (plants) => {
  const cards = document.querySelector(".cards");
  cards.innerHTML = "";
  for (const plant of plants) {
    const createDiv = document.createElement("div");

    createDiv.innerHTML = `
      
                      <div class="bg-white  rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div class="h-48 overflow-hidden">
                            <img src="${plant.image}" alt="${plant.name}"
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="p-4">
                            <h3 class="font-semibold text-lg mb-2">${plant.name}</h3>
                            <p class="text-sm text-gray-600 mb-3">${plant.description}</p>
                            <div class="flex justify-between items-center mb-3">
                                <span class="text-sm bg-[#15803D20] rounded-full py-1 px-4 font-medium">${plant.category}</span>
                                <span class="font-bold text-lg">৳${plant.price}</span>
                            </div>
                            <button onclick="addToCart(${plant.price}, '${plant.name}')"  class="w-full bg-[#15803D] text-white py-2 rounded-full hover:bg-green-500 transition-colors font-medium">
                                Add to Cart
                            </button>
                        </div>
                    </div>
    
    `;
    cards.append(createDiv);
  }
};

const updateTotalPrice = () => {
  const totalPrice = pricesArray.reduce((acc, idx) => acc + idx, 0);
  priceNumber.innerText = `৳${totalPrice}`;
};

const addToCart = (price, name) => {
  const cartItem = document.querySelector(".cart_item");
  const createDiv = document.createElement("div");
  createDiv.innerHTML = `

                         <div class=" flex justify-between items-center p-2 bg-gray-50 rounded">
                            <div>
                                <div class="font-medium text-sm">${name}</div>
                                <div class="text-xs text-gray-600">৳${price} × 1</div>
                            </div>
                            <button id="remove_btn" class="text-gray-500 hover:text-red-700">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>

    `;
  alert(`${name} has been added to the cart`);
  cartItem.append(createDiv);
  pricesArray.push(price);
  updateTotalPrice();
  const removeEle = createDiv.querySelector("#remove_btn");
  removeEle.addEventListener("click", () => {
    removeEle.parentElement.parentElement.remove();
    pricesArray.splice(pricesArray.indexOf(price), 1); // Remove price
    updateTotalPrice();
  });
};

// category selection

const loadingCategorySelection = async () => {
  const url = `https://openapi.programming-hero.com/api/categories`;
  const res = await fetch(url);
  const data = await res.json();
  categoryDisplaySelection(data.categories);
};

const categoryDisplaySelection = (categories) => {
  const sidebarContainer = document.querySelector(".sidebar");
  for (const category of categories) {
    const createDiv = document.createElement("div");
    createDiv.classList.add("categories");
    createDiv.innerHTML = `
    <li>
      <button onclick="categoryUniqueCard(${category.id})" id="category-container-${category.id}"
                      class="list-item w-full text-left px-3 py-2 rounded hover:bg-[#15803D] hover:text-white  transition-colors"
                >${category.category_name}</button>
                
                </li>
    `;
    sidebarContainer.appendChild(createDiv);
  }
};

const removeActiveList = () => {
  const listItems = document.querySelectorAll(".list-item");
  listItems.forEach((list) => list.classList.remove("active"));
  if (allTreesBtn) allTreesBtn.classList.remove("active");
};

const categoryUniqueCard = async (id) => {
  try {
    showSpinnerLoading();
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    removeActiveList();
    const activeBtn = document.getElementById(`category-container-${id}`);
    if (activeBtn) activeBtn.classList.add("active");
    displayUniqueCategory(data.plants);
    hideSpinner();
  } catch (error) {
    throw new Error(error);
  }
};

const displayUniqueCategory = (plants) => {
  const cards = document.querySelector(".cards");
  cards.innerHTML = "";
  plants.forEach((plant) => {
    const createDiv = document.createElement("div");
    createDiv.innerHTML = `
    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div class="h-48 overflow-hidden">
                            <img src="${plant.image}" alt="${plant.name}"
                                 class="w-full h-full object-cover">
                        </div>
                        <div class="p-4">
                            <h3 onclick="showModalCreating(${plant.id})" class="font-semibold text-lg mb-2 cursor-pointer">${plant.name}</h3>
                            <p class="text-sm text-gray-600 mb-3">${plant.description}</p>
                            <div class="flex justify-between items-center mb-3">
                                <span class="text-sm text-green-500 bg-[#15803D10] rounded-full font-medium">${plant.category}</span>
                                <span class="font-bold text-lg">৳${plant.price}</span>
                            </div>
                            <button class="w-full bg-[#15803D] text-white py-2 rounded-lg hover:bg-green-500 transition-colors font-medium">
                                Add to Cart
                            </button>
                        </div>
                    </div>
    
    `;
    cards.append(createDiv);
  });
};

const showModalCreating = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  showModalDisplay(data.plants);
};

const showModalDisplay = (plant) => {
  const modalDetails = document.getElementById("modal_details");
  modalDetails.innerHTML = `
  <div class="card bg-base-100 w-full">
  <div class="card-body">
    <h2 class="card-title text-bold ">${plant.name}</h2>
    <img
                                                src="${plant.image}"
                                                alt="${plant.name}"
                                                class="object-cover h-48 w-full rounded-md"
                                        />
    <span><strong>Category</strong>: ${plant.category}</span>
    <span><strong>Price</strong>: ${plant.price}</span>
    <p><strong>Description</strong>: ${plant.description}</p>
    
  </div>
</div>
  `;
  document.getElementById("card_modal").showModal();
};

allTreesBtn.addEventListener("click", loadingAllPlants);

loadingCategorySelection();

loadingAllPlants();
