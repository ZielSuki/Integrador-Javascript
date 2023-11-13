const productsData = [
  {
    id: 0,
    category: "rubik",
    name: "Mirror Cube",
    price: 250,
    image: "./img/rubik/mirror-cube.jpg",
  },
  {
    id: 1,
    category: "rubik",
    name: "3x3 Cube",
    price: 200,
    image: "./img/rubik/rubik.jpg",
  },
  {
    id: 2,
    category: "rubik",
    name: "Pyraminx",
    price: 300,
    image: "./img/rubik/pyraminx.jpg",
  },
  {
    id: 3,
    category: "rubik",
    name: "Megaminx",
    price: 400,
    image: "./img/rubik/megaminx.jpg",
  },
  {
    id: 4,
    category: "rubik",
    name: "Skewb",
    price: 150,
    image: "./img/rubik/skewb.jpg",
  },
  {
    id: 5,
    category: "ttrpg",
    name: "D&D Dungeon Master Guide",
    price: 60000,
    image: "./img/ttrpg/d&ddmg.jpg",
  },
  {
    id: 6,
    category: "ttrpg",
    name: "D&D Players Handbook",
    price: 60000,
    image: "./img/ttrpg/d&dphb.jpg",
  },
  {
    id: 7,
    category: "ttrpg",
    name: "D&D Monster Manual",
    price: 60000,
    image: "./img/ttrpg/d&dmm.jpg",
  },
  {
    id: 8,
    category: "ttrpg",
    name: "Call Of Cthulhu Investigators Handbook",
    price: 60000,
    image: "./img/ttrpg/cocih.jpg",
  },
  {
    id: 9,
    category: "ttrpg",
    name: "Call Of Cthulhu Keepers Rulebook",
    price: 60000,
    image: "./img/ttrpg/cockr.jpg",
  },
];

const appState = {
  currentProductsIndex: 0,
  activeCategory: "rubik",
};
