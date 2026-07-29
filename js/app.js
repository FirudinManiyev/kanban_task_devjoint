const tasks = [
    {
        id: 1,
        title: "HTML öyrən",
        description: "Semantic HTML məşqi",
        status: "todo"
    },
    {
        id: 2,
        title: "CSS yaz",
        description: "Flexbox istifadə et",
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

function createTaskCard(task) {

    const card = document.createElement("div");
    card.classList.add("task-card");

    const title = document.createElement("h3");
    title.textContent = task.title;

    const description = document.createElement("p");
    description.textContent = task.description;

    card.append(title);
    card.append(description);

    return card;
}

function renderTasks() {

    todoColumn.textContent = "";
    doingColumn.textContent = "";
    doneColumn.textContent = "";

    tasks.forEach(task => {

        const card = createTaskCard(task);

        if (task.status === "todo") {
            todoColumn.append(card);
        }

        if (task.status === "doing") {
            doingColumn.append(card);
        }

        if (task.status === "done") {
            doneColumn.append(card);
        }

    });

}

renderTasks();