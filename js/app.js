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
    }
];

let tasks = JSON.parse(localStorage.getItem("tasks")) || defaultTasks;

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

}

addTaskBtn.addEventListener("click", () => {

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const status = statusSelect.value;
    const priority = prioritySelect.value;

    if (title === "") {
        alert("Başlıq boş ola bilməz.");
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
    });

    column.addEventListener("drop", () => {

        if (draggedTaskId === null) return;

        const task = tasks.find(task => task.id === draggedTaskId);

        if (!task) return;

        task.status = status;

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