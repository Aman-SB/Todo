import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function Todo() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [editId, setEditID] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    // TO ADD A TASK

    const addTodo = () => {
        //there is value in the todo
        if (todo !== "") {
            setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
            // console.log(todos);
            setTodo("");
        }
        // update the value
        if (editId) {
            const editTodo = todos.find((todo) => todo.id == editId);
            const updateTodo = todos.map((to) =>
                to.id === editTodo.id
                    ? (to = { id: to.id, list: todo, status: false })
                    : (to = { id: to.id, list: to.list, status: false })
            );
            setTodos(updateTodo);
            setEditID(0);
            setTodo("");
        }
    };

    //to make input tag focus
    const inputRef = useRef("null");
    useEffect(() => {
        inputRef.current.focus();
    }); //we need the focus on every render

    //delete the task
    const onDelete = (id) => {
        setTodos(todos.filter((task) => task.id !== id));
    };

    //complete the task
    const onComplete = (id) => {
        let complete = todos.map((list) => {
            if (list.id === id) {
                return { ...list, status: !list.status };
            }
            return list;
        });
        setTodos(complete);
    };

    // TO EDIT A TASK

    const onEdit = (id) => {
        const editTodo = todos.find((list) => list.id === id);
        setTodo(editTodo.list);
        setEditID(editTodo.id);
    };

    return (
        <div className="flex h-max justify-center">
            <div className="hero">
                <h2 className="mb-4">TODO APP</h2>
                <form action="" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={todo}
                        ref={inputRef}
                        placeholder="Enter Your Task"
                        className="input-field ml-2"
                        onChange={(event) => setTodo(event.target.value)}
                    />
                    <button onClick={addTodo}>
                        {" "}
                        {editId ? "EDIT" : "ADD"}{" "}
                    </button>
                </form>
                <div className="form-group">
                    <ul className="list">
                        {todos.map((task) => (
                            <li className="list-items" key={task.id}>
                                <div
                                    className="list-item-list"
                                    id={task.status ? "list-item" : ""}
                                >
                                    {" "}
                                    {task.list}{" "}
                                </div>
                                <span>
                                    <IoMdDoneAll
                                        className="list-item-icons"
                                        id="complete"
                                        title="Complete "
                                        onClick={() => onComplete(task.id)}
                                    />
                                    <FiEdit
                                        className="list-item-icons"
                                        id="edit"
                                        title="Edit"
                                        onClick={() => onEdit(task.id)}
                                    />
                                    <MdDelete
                                        className="list-item-icons"
                                        id="delete"
                                        title="Delete"
                                        onClick={() => onDelete(task.id)}
                                    />
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Todo;
