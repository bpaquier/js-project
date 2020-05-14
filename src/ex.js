ocument.addEventListener('DOMContentLoaded', function () {
  class Model {
    constructor() {
      this.pages = [
        {
          title: 'Homepage',
          url: '#',
          background: 'red',
          content: `
						<div>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							<ul>
								<li>Lorem ipsum</li>
								<li>dolor sit</li>
								<li>amet consectetur</li>
							</ul>
						</div>
					`,
          dynamisme: () => {
            document.querySelector('ul').querySelector('li').innerText =
              'Ipsum Lorem';
          },
        },
        {
          title: 'Contact',
          url: '#contact',
          background: 'green',
          form: true,
        },
        {
          title: 'Test',
          url: '#test',
          background: 'purple',
          content: `
						<div>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							<ul>
								<li>Lorem ipsum</li>
								<li>dolor sit</li>
								<li>amet consectetur</li>
							</ul>
						</div>
						<div class="parallax">
						</div>
						<div>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							<ul>
								<li>Lorem ipsum</li>
								<li>dolor sit</li>
								<li>amet consectetur</li>
							</ul>
						</div>
					`,
          dynamisme: () => {
            window.addEventListener('scroll', (e) => {
              let scrollTop = e.target.scrollingElement.scrollTop;

              document.querySelector(
                '.parallax'
              ).style.backgroundPosition = `center calc(50% + ${
                scrollTop / 2
              }px)`;
            });
          },
        },
      ];
    }

    getPageByUrl(url) {
      return this.pages.find((page) => page.url == url);
    }
  }

  class View {
    constructor(pages) {
      this.container = document.querySelector('.container');
      this.container.innerHTML = '';
      this.addHeader(pages);
    }

    run(dynamisme) {
      dynamisme();
    }

    addContent(content) {
      let contentContainer = document.createElement('div');
      contentContainer.classList.add('content');
      contentContainer.innerHTML = content;

      this.container.appendChild(contentContainer);
    }

    addHeader(pages) {
      pages.forEach((page) => {
        const pageButton = document.createElement('button');

        pageButton.innerText = page.title;

        this.container.appendChild(pageButton);

        pageButton.addEventListener('click', () => {
          location.hash = page.url;
        });
      });
    }

    changeTitle(text) {
      const title = document.createElement('h1');

      title.innerText = text;

      this.container.appendChild(title);
    }

    changeBackground(color) {
      this.container.style.background = color;
    }

    addForm() {
      let input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.classList.add('input-text');

      this.container.appendChild(input);
    }
  }

  function controller() {
    let data = new Model();

    const currentPage = data.getPageByUrl(location.hash || '#');

    let page = new View(data.pages);
    page.changeTitle(currentPage.title);
    page.changeBackground(currentPage.background);

    if (currentPage.content) {
      page.addContent(currentPage.content);
    }

    if (typeof currentPage.dynamisme === 'function') {
      page.run(currentPage.dynamisme);
    }

    if (currentPage.form) {
      page.addForm();
    }
  }

  window.addEventListener('hashchange', () => {
    controller();
  });

  controller();
});
