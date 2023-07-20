let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector('.add-toy-form');

  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    data.likes = 0

    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => renderCard(data))
  })

  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(renderToys)

  function renderCard(toy) {
    const card = document.createElement('div')
    card.classList.add('card')

    const h2 = document.createElement('h2')
    h2.textContent = toy.name

    const img = document.createElement('img')
    img.classList.add('toy-avatar')
    img.src = toy.image

    const p = document.createElement('p')
    p.textContent = `${toy.likes} likes`

    const button = document.createElement('button')
    button.classList.add('like-btn')
    button.setAttribute('id', `${toy.id}`)
    button.textContent = 'Like ❤️'

    card.append(h2, img, p, button)
    document.querySelector('#toy-collection').appendChild(card)
    // console.log(card.querySelector('p'))
    card.querySelector('.like-btn').addEventListener('click', () => {
      toy.likes += 1
      card.querySelector('p').textContent = `${toy.likes} likes`
      updateLikes(toy)
    })
  }

  function updateLikes(toyList) {
    fetch(`http://localhost:3000/toys/${toyList.id}`, {
      method: 'PATCH',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(toyList)
    })
      .then(res => res.json())
      .then(toy => console.log(toy))
  }

  function renderToys(toyList) {
    toyList.forEach((toy) => {
      renderCard(toy)
    })
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});