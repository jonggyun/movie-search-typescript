require('./styles/index.scss');

const search = require('./search');

const createHeader = (): HTMLElement => {
  const h1: HTMLHeadingElement = document.createElement('h1');
  h1.textContent = 'Movieeeeeegle';
  return h1;
}

const createInputSection = (): HTMLElement => {
  const section: HTMLElement = document.createElement('section');
  const input: HTMLInputElement = document.createElement('input');
  input.type = 'text';
  input.id = 'keyword';
  input.placeholder = '   input keyword.....';
  input.addEventListener('keypress', (e) => {
    input.setAttribute('value', (<HTMLInputElement>e.target).value);
    const keyword: string = (<HTMLInputElement>document.getElementById('keyword')).value;
    e.keyCode === 13 && search(keyword);
  });

  const ionIcon: HTMLElement = document.createElement('ion-icon');
  ionIcon.className = 'search-button';
  ionIcon.setAttribute('name','search');
  ionIcon.addEventListener('click', () => {
    const keyword: string = (<HTMLInputElement>document.getElementById('keyword')).value;

    search(keyword);
  });

  section.appendChild(input);
  section.appendChild(ionIcon);
  return section;
}

const createMovieListDiv = (): HTMLElement => {
  const div: HTMLElement = document.createElement('div');
  div.className = 'movie-list';
  div.id = 'movie-list';
  return div;
}

document.body.appendChild(createHeader());
document.body.appendChild(createInputSection());
document.body.appendChild(createMovieListDiv());