document.addEventListener('DOMContentLoaded', () => {
  const img1 = require('../static/img/main_home.jpg');
  const img2 = require('../static/img/main_spots.jpg');
  const img3 = require('../static/img/main_news.jpg');

  // Model qui permet de récupérer la data
  class Model {
    constructor() {
      this.pages = [
        {
          url: '#',
          documentTitle: 'Homepage',
          imgSrc: img1,
          title: 'Acceuil',
          content: `
            <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate suscipit nihil dolores repellendus alias illum vitae. Et unde enim ducimus, exercitationem dolorum, eum omnis autem, quasi ipsa a illum animi.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate suscipit nihil dolores repellendus alias illum vitae. Et unde enim ducimus, exercitationem dolorum, eum omnis autem, quasi ipsa a illum animi.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate suscipit nihil dolores repellendus alias illum vitae. Et unde enim ducimus, exercitationem dolorum, eum omnis autem, quasi ipsa a illum animi.
            </div>
          `,
        },
        {
          url: '#spots',
          documentTitle: 'All spots',
          imgSrc: img2,
          title: 'Spots map',
        },
        {
          url: '#news',
          documentTitle: 'News',
          imgSrc: img3,
          title: 'News',
        },
      ];
    }

    getPageByUrl(url) {
      return this.pages.find((page) => page.url === url);
    }
  }

  // View qui permet de modifier le template html
  class View {
    constructor(pages) {
      this.container = document.querySelector('.container');
      this.container.innerHTML = '';
      this.addHeader(pages);
    }

    addHeader(pages) {
      const fragment = document.createDocumentFragment();

      const $header = document.createElement('header');
      $header.classList.add('header');

      const $ulElt = document.createElement('ul');
      $ulElt.classList.add('header__nav');

      const $title = document.createElement('p');
      $title.classList.add('header__title');
      $title.innerText = 'Worlwide surf spots database';

      pages.forEach((page) => {
        const $liElt = document.createElement('li');
        const $button = document.createElement('div');
        $button.innerText = page.title;
        $button.addEventListener('click', () => {
          location.hash = page.url;
        });

        $liElt.appendChild($button);
        $ulElt.appendChild($liElt);
      });

      $header.appendChild($ulElt);
      $header.appendChild($title);
      fragment.appendChild($header);
      this.container.appendChild(fragment);
    }

    addContent(content) {
      const fragment = document.createDocumentFragment();
      const $content = document.createElement('div');
      $content.classList.add('container__content');
      $content.innerHTML = content;

      fragment.appendChild($content);
      this.container.appendChild(fragment);
    }
    changedocumentTile(option) {
      document.title = option;
    }

    setBackgroungImage(option) {
      const fragment = document.createDocumentFragment();

      const $imageContainer = document.createElement('div');
      $imageContainer.classList.add('container__image');
      $imageContainer.style.backgroundImage = `url(${option})`;

      fragment.appendChild($imageContainer);
      this.container.appendChild(fragment);
    }

    setMainTitle(option) {
      const fragment = document.createDocumentFragment();

      const $mainTitle = document.createElement('h1');
      $mainTitle.classList.add('container__title');
      $mainTitle.textContent = option;

      fragment.appendChild($mainTitle);
      this.container.appendChild(fragment);
    }
  }

  // Controller qui permet de gérer l'ensemble de l'application
  function controller() {
    const data = new Model();

    const currentPage = data.getPageByUrl(location.hash || '#');

    const render = new View(data.pages);
    render.changedocumentTile(currentPage.documentTitle);
    render.setBackgroungImage(currentPage.imgSrc);
    render.setMainTitle(currentPage.title);

    if (currentPage.content) {
      render.addContent(currentPage.content);
    }
  }

  window.addEventListener('hashchange', () => {
    controller();
  });

  controller();
});
