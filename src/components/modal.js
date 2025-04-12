import { data } from "./data";
import { card } from "./card";
export function createModal(data) {
    const modal = document.createElement('div')
    modal.classList.add('modal')
    modal.innerHTML = `
   <div class="modal-dialog">
            <div class="modal-content p-3">
                <div class="modal-header d-flex justify-content-between align-items-center">
                    <h5 class="modal-title">New Task</h5>
                    <button id="close-modal" class="btn-close"></button>
                </div>
                <div class="modal-body">
                    <form id="task-form">
                        <div class="mb-3">
                            <label for="task-title" class="form-label">Title</label>
                            <input type="text" id="task-title" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label for="task-desc" class="form-label">Description</label>
                            <textarea id="task-desc" class="form-control" rows="3" required></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="task-status" class="form-label">Status</label>
                            <select id="task-status" class="form-select" required>
                                ${data.map(col => `<option value="${col.id}">${col.title}</option>`).join('')}
                            </select>
                        </div>
                    </form>
                </div>
                        <div class="modal-footer d-flex justify-content-end">
                    <button id="add-task" class="btn btn-primary me-2">Add Task</button>
                    <button id="close-modal-footer" class="btn btn-secondary">Close</button>
                </div>
            </div>
        </div>
  `;
    document.body.appendChild(modal)

    //Логика открытия и закрытия модального окна
    const openModalBtn = document.getElementById('new-task-btn')
    const closeModalBtns = [document.getElementById('close-modal'), document.getElementById('close-modal-footer')]
    const addTaskBtn = document.getElementById('add-task')
    const taskForm = document.getElementById('task-form')

    openModalBtn.addEventListener('click', () => {
        modal.style.display = 'block'
    })
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'none'
        })
    })

    //Добавление задачи
    addTaskBtn.addEventListener('click', (e) => {
        e.preventDefault() //отменяем стандартное поведение формы

        const title = document.getElementById('task-title').value
        const description = document.getElementById('task-desc').value
        const status = document.getElementById('task-status').value
        const time = new Date().toLocaleTimeString()

        if (title && description && status) {
            //Найти колонку и добавить задачу в объект
            const column = data.find(col => col.id === status)
            const newTask = { title, description, time }
            column.todos.push(newTask)

            // Обновить отображение задач
            updateColumn(column)
            // Очистить форму и закрыть модальное окно
            taskForm.reset()
            modal.style.display = 'none'
            console.log(data)
        } else {
            alert('Заполните все поля')
        }
    })
}

export function updateColumn(column) {
    const colElement = document.getElementById(column.id)
    const cardContainer = colElement.querySelector('.card-container')
    cardContainer.innerHTML = '' //Очищаем контейнер

    column.todos.forEach(task => {
        cardContainer.appendChild(card(task.title, task.description, task.time))
    })

    //Обновить каунтер
    const taskCounter = colElement.querySelector('.col-header span')
    taskCounter.innerHTML = column.todos.length
}