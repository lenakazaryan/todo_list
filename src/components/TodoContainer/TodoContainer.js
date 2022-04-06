import { useCallback, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItems from "../TodoItems/TodoItems";
import { addTodo, updateTodo } from "../../redux/ducks/todoDuck";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../TodoContainer/TodoContainer.css";


const todosSelector = (state) => state.todoListReducer;

const TodoList = () => {
  const [todos, setTodos] = useState("");
  const [edit, setEdit] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [editingTodo, setEditingTodo] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);

  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { todo } = useSelector(todosSelector);

  useEffect(() => {
    filterMessages();
    return () => {
      clearTimeout(inputRef.current);
    };
  }, [todo, searchValue]);

  const filterMessages = () => {
    clearTimeout(inputRef.current);
    inputRef.current = setTimeout(() => {
      const filteredData = todo
        .filter((item) => item.todos.includes(searchValue))
        .sort((a, b) => a.isCompleted > b.isCompleted);
      setFilteredTodos(filteredData);
    }, 400);
  };

  const addTodoItems = (todos) => {
    const obj = { todos, isCompleted: false };
    if (!todo.length) {
      obj.id = "1";
    } else {
      obj.id = `${todo.length + 1}`;
    }

    dispatch(addTodo(obj));
    setTodos("");
  };

  const editTodos = useCallback((id) => {
    setEditingTodo((prev) => !prev);
    setEditingId(id);
  }, []);

  function saveTodo() {
    setEditingId("");
    dispatch(updateTodo({ id: +editingId, todos: edit }));
    setEdit("");
    setEditingTodo((prev) => !prev);
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
    <div className="search-bar">
    <input placeholder="Search..." value={searchValue} onChange={handleSearch} className="search-input" />
      <FontAwesomeIcon className="icon" icon={faSearch} />
    </div>
      <div className="todoList">
        {editingTodo ? (
          <div>
            <input
              type="text"
              name="task"
              value={edit}
              onChange={(e) => setEdit(e.target.value)} className="edit-todo"
            />
            <button onClick={saveTodo} className="button-save">Save</button>
          </div>
        ) : (
          <div>
            <input
              value={todos}
              type="text"
              onChange={(e) => setTodos(e.target.value) } placeholder="Todos" className="todos-input"
            />
            <button onClick={() => addTodoItems(todos)} className="add-todo">Add Todo</button>
          </div>
        )}
        <div className="todos-container">
          {filteredTodos.map((item) => (
            <div key={item.id}>
              <TodoItems
                todos={item.todos}
                id={item.id}
                editTodos={editTodos}
                isCompleted={item.isCompleted}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TodoList;
