class DefParam {
  public keyword: string;

  constructor(
    keyword: string
  ) {
    this.keyword = keyword;
  }
}

module.exports = (keyword: string) => {
  console.log(keyword);

  const param: DefParam = new DefParam(keyword);

  console.log('param!!!!!!!!!', param);
  fetch(`http://localhost:3000/api?keyword=${keyword}`)
    .then((res) => res.json())
    .then((data) => {
      console.log('data', data);
    })
}