class Item {
  public actor: string;
  public director: string;
  public image: string;
  public link: string;
  public pubDate: Date;
  public subtitle: string;
  public title: string;
  public userRating: number;

  constructor(
    actor: string,
    director: string,
    image: string,
    link: string,
    pubDate: Date,
    subtitle: string,
    title: string,
    userRating: number
  ){
    this.actor = actor;
    this.director = director;
    this.image = image;
    this.link = link;
    this.pubDate = pubDate;
    this.subtitle = subtitle;
    this.title = title;
    this.userRating = userRating;
  }
}

const createItemDiv = (item: Item): HTMLLIElement => {
  const li = document.createElement('li');

  const p = document.createElement('p');
  const img = document.createElement('img');
  item.image === '' ? img.src = 'https://fakeimg.pl/110x158/282828?text=NoImage!!' : img.src = item.image; 
  p.appendChild(img);
  li.appendChild(p);

  const dl = document.createElement('dl');
  // 영화 제목 + 개봉년도
  const dt = document.createElement('dt');
  const bold = document.createElement('b');
  bold.textContent = item.title.replace('<b>', '').replace('</b>', '') + ' | ' + String(item.pubDate);
  dt.appendChild(bold);
  
  // 영화 평점
  const ddPoint = document.createElement('dd');
  ddPoint.className = 'point';
  ddPoint.textContent = String(item.userRating);

  // 감독 + 출연진
  const ddDirector = document.createElement('dd');
  ddDirector.className = 'peoeple';
  
  const director: string = item.director === '' ? '정보없음|' : item.director.replace(/\|/gi, ', ');
  ddDirector.textContent = '감독: ' + director.substring(0, director.length - 2);
  
  const ddActor = document.createElement('dd');
  const actor: string = item.actor === '' ? '정보없음|' : item.actor.replace(/\|/gi, ', ');
  ddActor.textContent = '출연진: ' + actor.substring(0, actor.length - 2);


  dl.appendChild(dt);
  // dl.appendChild(ddPoint);
  dl.appendChild(ddPoint);
  dl.appendChild(ddDirector);
  dl.appendChild(ddActor);

  li.appendChild(dl);
  return li;
}

module.exports = (keyword: string) => {
  const ul = document.createElement('ul');
  fetch(`http://localhost:3000/api?keyword=${keyword}`)
    .then((res) => res.json())
    .then((data) => {
      data.items.map((item: Item) => {
        const div = createItemDiv(item);
        ul.appendChild(div);
      });

      const movieDiv = document.getElementById('movie-list');
      while(movieDiv.hasChildNodes()) {
        movieDiv.removeChild(movieDiv.firstChild);
      }
      movieDiv.appendChild(ul);
    })
}