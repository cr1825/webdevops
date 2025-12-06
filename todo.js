let todoList = [];
let currentFilter = 'all';
displayItems();

function addTodo() {
    let inputElement = document.querySelector('#todo-input');
    let dateElement = document.querySelector('#date-input');
    let priorityElement = document.querySelector('#priority-select');

    let todoItem = inputElement.value.trim();
    
    if (!todoItem) {
        alert('Please enter a todo item!');
        return;
    }
    
    let rawDate = dateElement.value;
    let tododate = '';
    
    if (rawDate) {
        let parts = rawDate.split("-");
        tododate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    todoList.push({
        id: Date.now(),
        item: todoItem,
        duedate: tododate,
        priority: priorityElement.value,
        completed: false
    });

    inputElement.value = '';
    dateElement.value = '';
    priorityElement.value = 'medium';

    displayItems();
}

function toggleComplete(id) {
    const todo = todoList.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        displayItems();
    }
}

function deleteTodo(id) {
    todoList = todoList.filter(t => t.id !== id);
    displayItems();
}

function filterTodos(filter) {
    currentFilter = filter;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    displayItems();
}

function updateStats() {
    const total = todoList.length;
    const completed = todoList.filter(t => t.completed).length;
    const pending = total - completed;
    
    document.getElementById('total-count').textContent = total;
    document.getElementById('completed-count').textContent = completed;
    document.getElementById('pending-count').textContent = pending;
}

function displayItems() {
    let containerElement = document.querySelector('.todo-container');
    
    let filteredList = todoList;
    if (currentFilter === 'active') {
        filteredList = todoList.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredList = todoList.filter(t => t.completed);
    }
    
    let newHtml = '';

    for(let i = 0; i < filteredList.length; i++) {
        let todo = filteredList[i];
        let priorityClass = `priority-${todo.priority}`;
        let completedClass = todo.completed ? 'completed' : '';
        
        newHtml += `
        <div class="todo-item ${completedClass}">
            <input type="checkbox" class="checkbox" 
                   ${todo.completed ? 'checked' : ''} 
                   onchange="toggleComplete(${todo.id})" />
            <span>${todo.item}</span>
            <span>${todo.duedate || 'No date'}</span>
            <span class="priority-badge ${priorityClass}">${todo.priority.toUpperCase()}</span>
            <button class='btn-delete' onclick="deleteTodo(${todo.id})">Delete</button>
        </div>`;
    }
    
    containerElement.innerHTML = newHtml;
    updateStats();
}