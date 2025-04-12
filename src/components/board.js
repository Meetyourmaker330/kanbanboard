import { data } from "./data"
import { createModal } from "./modal"
export function createBoard() {
    const board = document.getElementById('board')

    //Функция для создания колонок
    data.forEach(column => {
        const colElement = document.createElement('div')
        colElement.classList.add('col', 'p-3', 'border', 'border-3')
        colElement.setAttribute('id', column.id)

        colElement.innerHTML = `
        <div class="col-header d-flex align-items-center justify-content-between">
        <h3>${column.title}</h3>
        <span>${column.todos.length}</span>
        </div>
        <div class="card-container"></div>
        `
        board.appendChild(colElement)
    })

    //Создаем модальное окно
    createModal(data)
}
