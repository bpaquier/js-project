import { app } from './particles/app';
import { particles } from './particles/particles';

document.addEventListener('DOMContentLoaded', () => {
  const herobackgoundImageHome = require('../static/img/hero-background-home.jpg');
  const herobackgoundImageSpots = require('../static/img/hero-background-spots.jpg');

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
            imgSrc: herobackgoundImageHome,
            title: 'Acceuil',
            content: `<div></div>`,
            dynamisme: this.scrollParallax,
          },
          {
            url: '#spots',
            documentTitle: 'All-spots',
            imgSrc: herobackgoundImageSpots,
            title: 'Spots map',
            content: `<div></div>`,
            dynamisme: this.scrollParallax,
          },
          {
            url: '#news',
            documentTitle: 'News',
            imgSrc: herobackgoundImageSpots,
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
    constructor(pages, currentPage) {
      this.container = document.querySelector('.container');
      this.container.innerHTML = '';
      this.addHeader(pages, currentPage);
    }

    changedocumentTile(option) {
      document.title = option;
    }

    addHeader(pages, currentPage) {
      const fragment = document.createDocumentFragment();

      const $header = document.createElement('header');
      $header.classList.add('header');

      const $ulElt = document.createElement('ul');
      $ulElt.classList.add('header__nav');
      $ulElt.classList.add(currentPage.documentTitle);

      const $title = document.createElement('p');
      $title.classList.add('header__title');
      $title.innerText = 'Worlwide surf spots database';

      pages.forEach((page) => {
        const $liElt = document.createElement('li');
        $liElt.innerText = page.title;
        $liElt.addEventListener('click', () => {
          location.hash = page.url;
        });
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
      $heroHeader.classList.add('parallax');
      $heroHeader.style.backgroundImage = `url(${option.img})`;

      const $heroParticles = document.createElement('div');
      $heroParticles.setAttribute('id', 'particles-js');

      $heroHeader.appendChild($heroParticles);
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

    const render = new View(data.pages, currentPage);
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
