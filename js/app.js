let tasks = [
    {
        id: 1,
        title: "HTML öyrən",
        description: "Semantic HTML",
        status: "todo"
    },
    {
        id: 2,
        title: "CSS yaz",
        description: "Flexbox məşqi",
        status: "doing"
    },
    {
        id: 3,
        title: "JavaScript",
        description: "DOM Manipulation",
        status: "done"
    }
];

const todoColumn = document.getElementById("todo");
const doingColumn = document.getElementById("doing");
const doneColumn = document.getElementById("done");

const titleInput = document.getElementById("taskTitle");
const descriptionInput = document.getElementById("taskDescription");
const statusSelect = document.getElementById("taskStatus");
const addTaskBtn = document.getElementById("addTaskBtn");

let editTaskId = null;
let draggedTaskId = null;

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

    const editBtn = document.createElement("button");
    editBtn.textContent = "Redaktə";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Sil";

    editBtn.addEventListener("click", () => startEdit(task.id));
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    card.append(
        title,
        description,
        editBtn,
        deleteBtn
    );

    return card;
}

function renderTasks() {

    todoColumn.textContent = "";
    doingColumn.textContent = "";
    doneColumn.textContent = "";

    tasks.forEach(task => {

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

    if (title === "") {
        alert("Başlıq boş ola bilməz.");
        return;
    }

    if (editTaskId === null) {

        tasks.push({
            id: Date.now(),
            title,
            description,
            status
        });

    } else {

        const task = tasks.find(task => task.id === editTaskId);

        task.title = title;
        task.description = description;
        task.status = status;

        editTaskId = null;

        addTaskBtn.textContent = "Tapşırıq əlavə et";
    }

    titleInput.value = "";
    descriptionInput.value = "";
    statusSelect.value = "todo";

    renderTasks();

});

function startEdit(id) {

    const task = tasks.find(task => task.id === id);

    titleInput.value = task.title;
    descriptionInput.value = task.description;
    statusSelect.value = task.status;

    editTaskId = id;

    addTaskBtn.textContent = "Yadda saxla";

}

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    renderTasks();

}

function setupDropZone(column, status) {

    column.addEventListener("dragover", event => {
        event.preventDefault();
    });

    column.addEventListener("drop", () => {

        if (draggedTaskId === null) return;

        const task = tasks.find(task => task.id === draggedTaskId);

        task.status = status;

        renderTasks();

    });

}

setupDropZone(todoColumn, "todo");
setupDropZone(doingColumn, "doing");
setupDropZone(doneColumn, "done");

renderTasks();