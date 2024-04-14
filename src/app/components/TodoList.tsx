import ListItem from "./ListItem";

import type { Item } from "../types/Item";

type TodoListProps = {
  todo: Item[];
  remove: (id: number) => void;
  select: (id: number) => void;
  done: (id: number) => void;
  fav: (id: number) => void;
};

export default function ToDoList({
  todo,
  remove,
  select,
  done,
  fav,
}: TodoListProps) {
  if (todo.length > 0) {
    const listItem = todo.map((item: Item) => (
      <ListItem
        key={item.id}
        id={item.id}
        name={item.name}
        isSelected={item.selected}
        isDone={item.done}
        isFav={item.fav}
        removeListItem={remove}
        changeSelectedState={select}
        changeDoneState={done}
        changeFavState={fav}
      >
        {/* {item} */}
      </ListItem>
    ));
    return <div className="list"> {listItem} </div>;
  } else {
    return <div className="emptyList"> To-Do list is empty </div>;
  }
}
