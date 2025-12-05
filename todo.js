let todoList = [];
let currentFilter = 'all';
displayItems();

function addTodo() {
    let inputElement = document.querySelector('#todo-input');
    let dateElement = document.querySelector('#date-input');
    let priorityElement = document.querySelector('#priority-select'); // ADD THIS

    let todoItem = inputElement.value.trim(); // ADD .trim()
    
    // ADD VALIDATION:
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

    // CHANGE push to include priority and id:
    todoList.push({
        id: Date.now(),
        item: todoItem,
        duedate: tododate,
        priority: priorityElement.value
    });

    inputElement.value = '';
    dateElement.value = '';
    priorityElement.value = 'medium'; // ADD THIS

    displayItems();
}
function filterTodos(filter) {
    currentFilter = filter;
    
    // Update active button
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
    
    // ADD FILTERING:
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
        
        // FIX: Add opening <div> tag:
        newHtml += `
        <div class="todo-item">
            <span>${todo.item}</span>
            <span>${todo.duedate}</span>
            <span class="priority-badge ${priorityClass}">${todo.priority.toUpperCase()}</span>
            <button class='btn-delete' onclick="todoList.splice(${i},1); displayItems();">Delete</button>
        </div>`;
    }
    
    containerElement.innerHTML = newHtml;
    updateStats(); // ADD THIS
}