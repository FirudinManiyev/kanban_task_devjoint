const defaultTasks = [
    {
        id: 1,
        title: "HTML öyrən",
        description: "Semantic HTML",
        status: "todo",
        priority: "high"
    },
    {
        id: 2,
        title: "CSS yaz",
        description: "Flexbox məşqi",
        status: "doing",
        priority: "medium"
    },
    {
        id: 3,
        title: "JavaScript",
        description: "DOM Manipulation",
        status: "done",
        priority: "low"
    },
    {
        id: 4,
        title: "JavaScsdfsdfript",
        description: "DOM Manipulation",
        status: "done",
        priority: "low"
    }
];

let tasks;
try {
    const storedTasks = localStorage.getItem("tasks");
    tasks = storedTasks ? JSON.parse(storedTasks) : defaultTasks;
    
    // Validate and sanitize tasks
    tasks = tasks.filter(task => {
        return task && 
               typeof task.id === 'number' && 
               typeof task.title === 'string' && 
               typeof task.description === 'string' &&
               typeof task.status === 'string' &&
               typeof task.priority === 'string' &&
               ['todo', 'doing', 'done'].includes(task.status) &&
               ['high', 'medium', 'low'].includes(task.priority);
    });
    
    // If no valid tasks remain, use defaults
    if (tasks.length === 0) {
        tasks = defaultTasks;
    }
} catch (error) {
    console.error("JSON parse error:", error);
    tasks = defaultTasks;
}

const todoColumn = document.getElementById("todo");
const doingColumn = document.getElementById("doing");
const doneColumn = document.getElementById("done");

const titleInput = document.getElementById("taskTitle");
const descriptionInput = document.getElementById("taskDescription");
const statusSelect = document.getElementById("taskStatus");
const prioritySelect = document.getElementById("taskPriority");

const searchInput = document.getElementById("searchInput");
const priorityFilter = document.getElementById("priorityFilter");

const addTaskBtn = document.getElementById("addTaskBtn");

let editTaskId = null;
let draggedTaskId = null;
let touchDraggedCard = null;
let touchClone = null;
let touchOffsetX = 0;
let touchOffsetY = 0;

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskCard(task) {

    const card = document.createElement("div");
    card.classList.add("task-card");

    card.draggable = true;

    card.addEventListener("dragstart", () => {
        draggedTaskId = task.id;
    });

    card.addEventListener("dragend", () => {
        draggedTaskId = null;
    });

    // Mobile touch support
    card.addEventListener("touchstart", (e) => {
        touchDraggedCard = card;
        draggedTaskId = task.id;
        
        const touch = e.touches[0];
        const rect = card.getBoundingClientRect();
        touchOffsetX = touch.clientX - rect.left;
        touchOffsetY = touch.clientY - rect.top;
        
        touchClone = card.cloneNode(true);
        touchClone.style.position = "fixed";
        touchClone.style.zIndex = "1000";
        touchClone.style.width = rect.width + "px";
        touchClone.style.opacity = "0.8";
        touchClone.style.pointerEvents = "none";
        touchClone.style.left = (touch.clientX - touchOffsetX) + "px";
        touchClone.style.top = (touch.clientY - touchOffsetY) + "px";
        document.body.appendChild(touchClone);
        
        card.style.opacity = "0.3";
    }, { passive: true });

    card.addEventListener("touchmove", (e) => {
        if (!touchClone) return;
        
        const touch = e.touches[0];
        touchClone.style.left = (touch.clientX - touchOffsetX) + "px";
        touchClone.style.top = (touch.clientY - touchOffsetY) + "px";
        
        // Highlight drop zones
        [todoColumn, doingColumn, doneColumn].forEach(col => {
            const rect = col.getBoundingClientRect();
            if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
                touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
                col.classList.add("drag-over");
            } else {
                col.classList.remove("drag-over");
            }
        });
    }, { passive: true });

    card.addEventListener("touchend", (e) => {
        if (!touchClone) return;
        
        const touch = e.changedTouches[0];
        
        // Find which column the touch ended in
        let targetStatus = null;
        [todoColumn, doingColumn, doneColumn].forEach(col => {
            col.classList.remove("drag-over");
            const rect = col.getBoundingClientRect();
            if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
                touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
                if (col.id === "todo") targetStatus = "todo";
                if (col.id === "doing") targetStatus = "doing";
                if (col.id === "done") targetStatus = "done";
            }
        });
        
        // Update task status if dropped in a valid column
        if (targetStatus && draggedTaskId !== null) {
            const taskIndex = tasks.findIndex(task => task.id === draggedTaskId);
            if (taskIndex !== -1) {
                tasks[taskIndex] = {
                    ...tasks[taskIndex],
                    status: targetStatus
                };
                saveTasks();
                renderTasks();
            }
        }
        
        // Cleanup
        document.body.removeChild(touchClone);
        touchClone = null;
        touchDraggedCard = null;
        draggedTaskId = null;
        card.style.opacity = "1";
    });

    const title = document.createElement("h3");
    title.textContent = task.title;

    const description = document.createElement("p");
    description.textContent = task.description;

    const priority = document.createElement("p");
    priority.textContent = "Prioritet: " + task.priority;
    priority.classList.add("priority");
    priority.classList.add(task.priority);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Redaktə";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Sil";

    editBtn.addEventListener("click", () => startEdit(task.id));
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    card.append(
        title,
        description,
        priority,
        editBtn,
        deleteBtn
    );

    return card;
}

function renderTasks() {

    todoColumn.textContent = "";
    doingColumn.textContent = "";
    doneColumn.textContent = "";

    const keyword = searchInput.value.trim().toLowerCase();
    const selectedPriority = priorityFilter.value;

    const filteredTasks = tasks.filter(task => {
        if (!task || !task.title || !task.description) return false;

        const matchesKeyword =
            task.title.toLowerCase().includes(keyword) ||
            task.description.toLowerCase().includes(keyword);

        const matchesPriority =
            selectedPriority === "all" ||
            task.priority === selectedPriority;

        return matchesKeyword && matchesPriority;

    });

    filteredTasks.forEach(task => {

        const card = createTaskCard(task);

        switch (task.status) {

            case "todo":
                todoColumn.append(card);
                break;

            case "doing":
                doingColumn.append(card);
                break;

            case "done":
                doneColumn.append(card);
                break;
        }

    });

    [
        todoColumn,
        doingColumn,
        doneColumn
    ].forEach(column => {

        if (column.children.length === 0) {

            const empty = document.createElement("p");

            empty.textContent = "Tapşırıq yoxdur";

            empty.style.textAlign = "center";
            empty.style.color = "gray";
            empty.style.padding = "20px";

            column.append(empty);

        }

    });

}

addTaskBtn.addEventListener("click", () => {

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const status = statusSelect.value;
    const priority = prioritySelect.value;

    if (title.length < 3) {
        alert("Başlıq minimum 3 simvol olmalıdır.");
        return;
    }
    if (description.length > 200) {
        alert("Təsvir maksimum 200 simvol ola bilər.");
        return;
    }

    const duplicateTask = tasks.find(task =>
        task && task.title && task.title.toLowerCase() === title.toLowerCase() &&
        task.id !== editTaskId
    );

    if (duplicateTask) {
        alert("Bu başlıqda tapşırıq artıq mövcuddur.");
        return;
    }

    if (editTaskId === null) {

        tasks.push({
            id: Date.now(),
            title,
            description,
            status,
            priority
        });

    } else {

        const task = tasks.find(task => task.id === editTaskId);

        if (!task) return;

        task.title = title;
        task.description = description;
        task.status = status;
        task.priority = priority;

        editTaskId = null;
        addTaskBtn.textContent = "Tapşırıq əlavə et";
    }

    saveTasks();

    titleInput.value = "";
    descriptionInput.value = "";
    statusSelect.value = "todo";
    prioritySelect.value = "high";

    renderTasks();

});

function startEdit(id) {

    const task = tasks.find(task => task.id === id);

    if (!task) return;

    titleInput.value = task.title;
    descriptionInput.value = task.description;
    statusSelect.value = task.status;
    prioritySelect.value = task.priority;

    editTaskId = id;

    addTaskBtn.textContent = "Yadda saxla";

}

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();

}

function setupDropZone(column, status) {

    column.addEventListener("dragover", event => {
        event.preventDefault();
        column.classList.add("drag-over");
    });

    column.addEventListener("dragleave", () => {
        column.classList.remove("drag-over");
    });

    column.addEventListener("drop", () => {
        column.classList.remove("drag-over");

        if (draggedTaskId === null) return;

        const taskIndex = tasks.findIndex(task => task.id === draggedTaskId);

        if (taskIndex === -1) return;

        tasks[taskIndex] = {
            ...tasks[taskIndex],
            status
        };

        saveTasks();
        renderTasks();

    });

}

setupDropZone(todoColumn, "todo");
setupDropZone(doingColumn, "doing");
setupDropZone(doneColumn, "done");

searchInput.addEventListener("input", renderTasks);

priorityFilter.addEventListener("change", renderTasks);

if (!localStorage.getItem("tasks")) {
    saveTasks();
}

renderTasks();