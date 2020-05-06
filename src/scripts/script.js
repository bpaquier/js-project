const img1 = require('../static/img/main_home.jpg');
const img2 = require('../static/img/main_spots.jpg');
const img3 = require('../static/img/main_news.jpg');

// Model qui permet de récupérer la data
class Model {
  constructor() {
    this.data = [
      {
        url: '/',
        documentTitle: 'Homepage',
        imgSrc: img1,
        title: 'Acceuil',
      },
      {
        url: '/spots',
        documentTitle: 'All spots',
        imgSrc: img2,
        title: 'Spots map',
      },
      {
        url: '/news',
        documentTitle: 'News',
        imgSrc: img3,
        title: 'News',
      },
    ];
  }

  getPageByUrl(url) {
    return this.data.find((page) => page.url === url);
  }
}

// View qui permet de modifier le template html
class View {
  constructor() {
    this.container = document.querySelector('.container');
  }

  changedocumentTile(option) {
    document.title = option;
  }

  setBackgroungImage(option) {
    const $imageContainer = document.createElement('div');
    $imageContainer.classList.add('container__image');

    const $backgroundImg = document.createElement('img');
    $backgroundImg.setAttribute('src', option);
    $backgroundImg.classList.add('image');

    $imageContainer.appendChild($backgroundImg);
    this.container.appendChild($imageContainer);
  }

  setMainTitle(option) {
    const $mainTitle = document.createElement('h1');
    $mainTitle.classList.add('container__title');
    $mainTitle.textContent = option;

    this.container.appendChild($mainTitle);
  }
}

// Controller qui permet de gérer l'ensemble de l'application
function controller() {
  const currentUrl = document.location.pathname;
  const data = new Model();

  const currentPage = data.getPageByUrl(currentUrl);

  const render = new View();
  render.changedocumentTile(currentPage.documentTitle);
  render.setBackgroungImage(currentPage.imgSrc);
  render.setMainTitle(currentPage.title);
}

controller();
