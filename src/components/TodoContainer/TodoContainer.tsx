import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItems from "../TodoItems/TodoItems";
import { addTodo, updateTodo } from "../../redux/ducks/todoDuck";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../TodoContainer/TodoContainer.css";
import { Todo } from "../../Interface/Todo";
import { TodoContainer } from "../../Interface/TodoContainer";

const todosSelector = (state: any) => state.todoListReducer;
const TodoList = () => {
  const [todos, setTodos] = useState<Todo["todos"]>("");
  const [edit, setEdit] = useState<Todo["todos"]>("");
  const [searchValue, setSearchValue] = useState<Todo["search"]>("");
  const [editingTodo, setEditingTodo] = useState<Todo["edit"]>(false);
  const [editingId, setEditingId] = useState<Todo["editId"]>("");
  const [filteredTodos, setFilteredTodos] = useState([]);

  const dispatch = useDispatch();
  const { todo } = useSelector(todosSelector);
  let elem;

  useEffect(() => {
    filterMessages();
    return () => {
      clearTimeout(elem);
    };
  }, [todo, searchValue]);

  const filterMessages = () => {
    clearTimeout(elem);
    elem = setTimeout(() => {
      const filteredData = todo
        .filter((item) => item.todos.includes(searchValue))
        .sort((a, b) => a.isCompleted > b.isCompleted);
      setFilteredTodos(filteredData);
    }, 400);
  };

  const addTodoItems = (todos) => {
    const obj: Todo = { todos, isCompleted: false };
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
    dispatch(updateTodo({ id: editingId, todos: edit }));
    setEdit("");
    setEditingTodo((prev) => !prev);
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className="search-bar">
        <input
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearch}
          className="search-input"
        />
        <FontAwesomeIcon className="icon" icon={faSearch} />
      </div>
      <div className="todoList">
        {editingTodo ? (
          <div>
            <input
              type="text"
              name="task"
              value={edit}
              onChange={(e) => setEdit(e.target.value)}
              className="edit-todo"
            />
            <button onClick={saveTodo} className="button-save">
              Save
            </button>
          </div>
        ) : (
          <div>
            <input
              value={todos}
              type="text"
              onChange={(e) => setTodos(e.target.value)}
              placeholder="Todos"
              className="todos-input"
            />
            <button onClick={() => addTodoItems(todos)} className="add-todo">
              Add Todo
            </button>
          </div>
        )}
        <div className="todos-container">
          {filteredTodos.map(
            // (item: { id: number; todos: string; isCompleted: boolean }) => (
            (item: TodoContainer) => (
              <div key={item.id}>
                <TodoItems
                  todos={item.todos}
                  id={item.id}
                  editTodos={editTodos}
                  isCompleted={item.isCompleted}
                />
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default TodoList;
