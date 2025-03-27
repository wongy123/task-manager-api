const Task = require("../models/task");

const { body, query, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { generatePaginationLinks } = require("../utils/generatePaginationLinks");

//Replaced with mongoose schema in ../models/task

// class Task {
//     constructor(title, description, dueDate, status) {
//         this.id = Tasks.length ? Tasks[Tasks.length - 1].id + 1 : 1;
//         this.title = title;
//         this.description = description;
//         this.dueDate = dueDate;
//         this.status = status;
//     }
// }

exports.getAll =
    [
        query('title').optional().trim(),

        asyncHandler(async (req, res, next) => {
            // const allTasks = await Task.find().sort({ dueDate: -1 });
            // res.json(allTasks);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            } else {
                const title = req.query.title || '';

                const taskPage = await Task
                    .find({ title: new RegExp(title, 'i') })
                    .sort({ dueDate: 'asc' })
                    .paginate({ ...req.paginate });

                res
                    .status(200)
                    .links(generatePaginationLinks(
                        req.originalUrl,
                        req.paginate.page,
                        taskPage.totalPages,
                        req.paginate.limit
                    ))
                    .json(taskPage.docs);
            }
            next();
        })
    ];

exports.get = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const task = await Task.findById(id).exec();

    if (!task) {
        const err = new Error(`Task ${id} not found`);
        err.status = 404;
        return next(err);
    }

    res.json(task);
});

exports.create = [
    body("title").trim().isLength({ min: 1 }).escape().withMessage("Title must be specified"),
    body("description").trim().escape(),
    body("dueDate").isISO8601().toDate(),
    body("status").trim().isLength({ min: 1 }).escape().withMessage("Status must be specified"),

    asyncHandler(async (req, res, next) => {
        const { title, description, dueDate, status } = req.body;
        const newTask = new Task({ title: title, description: description, dueDate: dueDate, status: status });

        await newTask.save();
        res.status(201);
        res.json(newTask);
    }),
];

exports.update = [
    body("title").trim().isLength({ min: 1 }).escape().withMessage("Title must be specified"),
    body("description").trim().escape(),
    body("dueDate").isISO8601().toDate(),
    body("status").trim().isLength({ min: 1 }).escape().withMessage("Status must be specified"),
    asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const { title, description, dueDate, status } = req.body;

        const taskExists = await Task.exists({ _id: id });

        if (!taskExists) {
            return res.status(404).json({ error: `Task ${id} not found` });
        }

        const task = await Task.findByIdAndUpdate(id, { title: title, description: description, dueDate: dueDate, status: status, _id: id });
        // updatedTask.id = parseInt(id);
        const newTask = await Task.findById(id);
        res.status(200);
        res.json(newTask);

    }),
];

exports.delete = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
        return res.status(404).json({ error: `Task ${id} not found` });
    }

    await Task.findByIdAndDelete(id);

    res.status(200).send();
});


//Replaced by Mongoose fuctions .findById()
// function findIndex(tasks, id) {
//     return tasks.findIndex(t => t.id === parseInt(id));
// }

// function findTask(tasks, id) {
//     return tasks.find(t => t.id === parseInt(id));
// }