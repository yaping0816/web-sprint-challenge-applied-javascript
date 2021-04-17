import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const card = document.createElement('div');
  const headLine = document.createElement('div');
  const author = document.createElement('div');
  const imgContainer = document.createElement('div');
  const img = document.createElement('img');
  const span = document.createElement('span');
  
  card.classList.add('card');
  headLine.classList.add('headline');
  headLine.textContent = article.headline;
  author.classList.add('author');
  imgContainer.classList.add('img-container');
  img.setAttribute('src', article.authorPhoto)
  span.textContent = `By ${article.authorName}`;

  card.appendChild(headLine);
  card.appendChild(author);
  author.appendChild(imgContainer);
  author.appendChild(span);
  imgContainer.appendChild(img);

  card.addEventListener('click', event =>{
    console.log(headLine.textContent);
  })

  return card;
}

// console.log(Card({
//   "authorName": "FIDO WALKSALOT",
//   "authorPhoto": "https://tk-assets.lambdaschool.com/1891c758-b3f4-4ec7-9d88-590bf7c7ceb2_fido.jpg",
//   "headline": "Bootstrap 5: Get a Sneak Peak at all the New Features",
//   "id": "3b04aebe-2097-4c70-9bb4-8a525c410bef"
// }))


const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios.get('https://lambda-times-api.herokuapp.com/articles')
  .then(res =>{
    // const bootstrapArray = res.data.articles.bootstrap;
    // bootstrapArray.forEach(object => {
    //   const newCard = Card(object);
    //   const cardsContainer = document.querySelector(selector);
    //   cardsContainer.appendChild(newCard);
    // });

    // cardsMaker(res.data.articles.bootstrap, selector);

    // Object.keys(res.data.articles).forEach(key =>{
    //   cardsMaker(res.data.articles[key], selector);
    // })

    Object.values(res.data.articles).forEach(value =>{
      cardsMaker(value,selector);
    })
  })
  .catch(err =>{
    console.log(err);
  })
}

const cardsMaker = (dataArray, selector) =>{

  dataArray.forEach(object =>{
    const newCard = Card(object);
    const cardsContainer = document.querySelector(selector);
    cardsContainer.appendChild(newCard);
  })
}

export { Card, cardAppender }
