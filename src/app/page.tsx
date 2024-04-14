"use client";
import { useImmer } from "use-immer";
import { useEffect } from "react";

import ToDoList from "./components/TodoList";

import type { Item } from "./types/Item";

export default function App() {
  const [todo, setTodo] = useImmer<Item[] | []>([]);
  const [inputValue, setInputValue] = useImmer("");
  const doShowActions = useImmer(false);
  const [loaded, setLoaded] = useImmer<boolean>(false);

  const addToList = (value: string) => {
    setTodo([
      ...todo,
      {
        id: todo.length + 1,
        name: value,
        done: false,
        selected: false,
        fav: false,
      },
    ]);
    setInputValue("");
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos !== null) {
      setTodo(JSON.parse(savedTodos));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("todos", JSON.stringify(todo));
    }
  }, [loaded, todo]);

  const removeItem = (id: number) => {
    setTodo(
      todo.filter((el: Item) => {
        return el.id !== id;
      })
    );
  };

  const changeSelectedState = (id: number) => {
    setTodo(
      todo.map((el: Item) => {
        return {
          ...el,
          selected: el.id === id ? !el.selected : el.selected,
        };
      })
    );
  };

  const changeFavState = (id: number) => {
    setTodo(
      todo.map((el: Item) => {
        return {
          ...el,
          fav: el.id === id ? !el.fav : el.fav,
        };
      })
    );
    console.log(todo);
  };

  const changeDoneState = (id: number) => {
    setTodo(
      todo.map((el: Item) => {
        return {
          ...el,
          done: el.id === id ? !el.done : el.done,
        };
      })
    );
  };

  return (
    <div className="appPage">
      <div className="appPage__addTodo">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          disabled={inputValue.length < 1}
          onClick={() => addToList(inputValue)}
        >
          Add
        </button>
      </div>

      {!loaded ? (
        <div className="loading">Loading...</div>
      ) : (
        <ToDoList
          todo={todo}
          remove={removeItem}
          select={changeSelectedState}
          fav={changeFavState}
          done={changeDoneState}
        />
      )}

      {/* {true ? (
        <div className="actionButtons">
          <button>Fav selected</button>
          <button>Done selected</button>
          <button>Remove selected</button>
        </div>
      ) : null} */}
    </div>
  );
}
