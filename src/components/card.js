import { updateColumn } from "./modal"
export function card(title, description, time, updateColumn) {
    const card = document.createElement('div')
    card.classList.add('card', 'text-bg-light', 'mb-3')
    card.innerHTML = `
  <div class="card-header">${title}</div>
  <div class="card-body">
    <h5 class="card-title">${time}</h5>
    <p class="card-text">${description}</p>
  </div>
  <div class="card-footer d-flex justify-content-end">
   <button type="button" class="btn btn-light">edit</button>
   <button type="button" class="btn btn-light mx-3">delete</button>
  </div>
  `
    return card
}