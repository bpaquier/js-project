import { app } from './app';
import { particles } from './particles';

document.addEventListener('DOMContentLoaded', () => {
  const img1 = require('../static/img/main_home.jpg');
  const img2 = require('../static/img/main_spots.jpg');
  const img3 = require('../static/img/main_news.jpg');

  // Model qui permet de récupérer la data
  class Model {
    constructor() {
      (this.scrollParallax = () => {
        window.addEventListener('scroll', (e) => {
          let scrollTop = e.target.scrollingElement.scrollTop;

          document.querySelector('.parallax').style.backgroundPositionY = `${
            scrollTop / 2
          }px`;
        });
      }),
        (this.pages = [
          {
            url: '#',
            documentTitle: 'Homepage',
            imgSrc: img1,
            title: 'Acceuil',
            content: `<div></div>`,
            dynamisme: this.scrollParallax,
          },
          {
            url: '#spots',
            documentTitle: 'All spots',
            imgSrc: img2,
            title: 'Spots map',
            content: `<div></div>`,
            dynamisme: this.scrollParallax,
          },
          {
            url: '#news',
            documentTitle: 'News',
            imgSrc: img3,
            title: 'News',
            content: `<div></div>`,
            dynamisme: this.scrollParallax,
          },
        ]);
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

    changedocumentTile(option) {
      document.title = option;
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

    setHeroHeader(option) {
      const fragment = document.createDocumentFragment();

      const $heroHeader = document.createElement('div');
      $heroHeader.classList.add('container__heroHeader');

      const headerBackground = document.createElement('div');
      headerBackground.classList.add('header__background');
      headerBackground.setAttribute('id', 'particles-js');

      const $heroHeaderpicture = document.createElement('div');
      $heroHeaderpicture.classList.add('heroHeader__picture');
      $heroHeaderpicture.classList.add('parallax');
      $heroHeaderpicture.style.backgroundImage = `url(${option.img})`;

      const $heroHeaderTitle = document.createElement('h1');
      $heroHeaderTitle.classList.add('heroHeader__title');
      $heroHeaderTitle.textContent = option.title;

      $heroHeader.appendChild(headerBackground);
      $heroHeader.appendChild($heroHeaderpicture);
      $heroHeader.appendChild($heroHeaderTitle);
      fragment.appendChild($heroHeader);
      this.container.appendChild(fragment);
    }

    run(dynamisme) {
      dynamisme();
    }
  }

  // Controller qui permet de gérer l'ensemble de l'application
  function controller() {
    const data = new Model();

    const currentPage = data.getPageByUrl(location.hash || '#');

    const render = new View(data.pages);
    render.changedocumentTile(currentPage.documentTitle);
    render.setHeroHeader({
      img: currentPage.imgSrc,
      title: currentPage.title,
    });

    if (currentPage.content) {
      render.addContent(currentPage.content);
    }

    if (typeof currentPage.dynamisme === 'function') {
      render.run(currentPage.dynamisme);
    }
    particles();
    app();
  }

  window.addEventListener('hashchange', () => {
    controller();
  });

  controller();
});
