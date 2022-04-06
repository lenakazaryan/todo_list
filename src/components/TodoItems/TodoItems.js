import { memo } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setCompleteTodo } from "../../redux/ducks/todoDuck";
import { faEdit, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../TodoItems/TodoItems.css";

function TodoItems({ todos, id, editTodos, isCompleted }) {
  const dispatch = useDispatch();

  function deleteTodos(id) {
    dispatch(deleteTodo(id));
  }

  function toggleComplete(id) {
    dispatch(setCompleteTodo(id));
  }

  console.log("todos", todos);

  return (
    <div className="todo-container">
      <div
        className="todo"
        style={{ backgroundColor: isCompleted ? "green" : "#ccc" }}
      >
        <div>
          <span className="text">{todos}</span>
        </div>
        <div>
          <span
            className="delete"
            onClick={() => {
              deleteTodos(id);
            }}
          >
            <FontAwesomeIcon className="icon" icon={faDeleteLeft} />
          </span>
          <span
            className="edit"
            onClick={() => {
              editTodos(id);
            }}
          >
            <FontAwesomeIcon className="icon" icon={faEdit} />
          </span>

          <span>
            <input
              type="checkbox"
              id="scales"
              name="scales"
              checked={isCompleted}
              onChange={() => toggleComplete(id)}
            />
            <label htmlFor="scales"></label>
            <br></br>
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(TodoItems);
