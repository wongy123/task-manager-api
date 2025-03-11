const Tasks = [];

class Task {
    constructor(title, description, dueDate, status) {
        this.id = Tasks.length ? Tasks[Tasks.length - 1].id + 1 : 1;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
    }
}

exports.getAll = async (req, res) => {
    const allTasks = await Tasks;
    res.json(allTasks);
};

exports.get = async (req, res) => {
    const { id } = req.params;

    task = await findTask(Tasks, id);
    
    if(!task){
        return res.status(404).send(`Task ${id} not found`);
    }

    res.send(task);
};

exports.create = async (req, res) => {
    const { title, description, dueDate, status } = req.body;
    newTask = new Task(title, description, dueDate, status);

    await Tasks.push(newTask);

    res.send(newTask);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate, status } = req.body;

    task = await findTask(Tasks, id);
    
    if(!task){
        return res.status(404).send(`Task ${id} not found`);
    }

    const updatedTask = new Task(title, description, dueDate, status);
    updatedTask.id = parseInt(id);

    const index = findIndex(tasks, id)
    if (index !== -1) {
        Tasks.splice(index, 1, updatedTask);
    }

    res.send(updatedTask);

};

exports.delete = async (req, res) => {
    const { id } = req.params;

    const index = findIndex(tasks, id)
    if (index !== -1) {
        Tasks.splice(index, 1);
    }
    else return res.status(404).send(`Task ${id} not found`);

    res.status(200).send();
};

function findIndex(tasks, id){
    return tasks.findIndex(t => t.id === parseInt(id));
}

function findTask(tasks, id){
    return tasks.find(t => t.id === parseInt(id));
}