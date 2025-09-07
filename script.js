//all plants loaded or create
const allTreesBtn = document.getElementById("all_tress");

const loadingAllPlants = async () => {
  const url = `https://openapi.programming-hero.com/api/plants`;
  const res = await fetch(url);
  const data = await res.json();
  displayLoadingAllPlants(data.plants);
};

const displayLoadingAllPlants = (plants) => {
  const cards = document.querySelector(".cards");
  cards.innerHTML = "";
  for (const plant of plants) {
    const createDiv = document.createElement("div");
    // createDiv.classList.add("m-4");
    createDiv.innerHTML = `
      
                       <div class="card bg-base-100 w-96">
                                    <figure>
                                        <img
                                                src="${plant.image}"
                                                alt="${plant.name}"
                                                class="object-cover h-48 w-full"
                                        />
                                    </figure>
                                    <div class="card-body">
                                        <h2 class="card-title">${plant.name}</h2>
                                        <p>
                                           ${plant.description}
                                        </p>
                                        <div class="card-actions justify-between">
                                            <span class="py-1 px-4 rounded-full bg-[#15803D10] text-[#15803D]">${plant.category}</span>
                                            <span class="font-bold">${plant.price}</span>
                                        </div>
                                        <button class="btn rounded-full bg-[#15803D] hover:text-white">Add to Cart</button>
                                    </div>
                                </div>
    
    `;
    cards.append(createDiv);
  }
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
    createDiv.innerHTML = `
      <button onclick="categoryUniqueCard(${category.id})" id="category-container"
                      class="py-1 px-4 hover:bg-[#15803D] rounded-md cursor-pointer hover:text-white"
                >${category.category_name}</button>
    `;
    sidebarContainer.appendChild(createDiv);
  }
};

const categoryUniqueCard = async (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayUniqueCategory(data.plants);
};

const displayUniqueCategory = (plants) => {
  const cards = document.querySelector(".cards");
  cards.innerHTML = "";
  plants.forEach((plant) => {
    const createDiv = document.createElement("div");
    createDiv.innerHTML = `
    <div class="card bg-base-100 w-96">
                                    <figure>
                                        <img
                                                src="${plant.image}"
                                                alt="${plant.name}"
                                                class="object-cover h-48 w-full"
                                        />
                                    </figure>
                                    <div class="card-body">
                                        <h2 onclick="showModalCreating(${plant.id})"  class="card-title">${plant.name}</h2>
                                        <p>
                                           ${plant.description}
                                        </p>
                                        <div class="card-actions justify-between">
                                            <span class="py-1 px-4 rounded-full bg-[#15803D10] text-[#15803D]">${plant.category}</span>
                                            <span class="font-bold">${plant.price}</span>
                                        </div>
                                        <button class="btn rounded-full bg-[#15803D] hover:text-white">Add to Cart</button>
                                    </div>
                                </div>
    `;
    cards.append(createDiv);
  });
};

// show modal creating

// {
//   "id": 7,
//   "image": "https://i.ibb.co.com/FkH6MRhR/banyan-min.jpg",
//   "name": "Banyan Tree",
//   "description": "A majestic shade tree with a vast canopy and iconic aerial roots. Revered in many cultures, it offers shelter to countless birds and animals.",
//   "category": "Shade Tree",
//   "price": 1200
// }
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
    <h2 class="card-title text-bold">${plant.name}</h2>
    <img
                                                src="${plant.image}"
                                                alt="${plant.name}"
                                                class="object-cover h-48 w-full rounded-md"
                                        />
    <span>Category: ${plant.category}</span>
    <span>Price: ${plant.price}</span>
    <p>Description: ${plant.description}</p>
    
  </div>
</div>
  `;
  document.getElementById("card_modal").showModal();
};

allTreesBtn.addEventListener("click", loadingAllPlants);

loadingCategorySelection();

loadingAllPlants();
