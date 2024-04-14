type ListItemProps = {
  name: string;
  id: number;
  isDone: boolean;
  isFav: boolean;
  isSelected: boolean;
  removeListItem: (id: number) => void;
  changeDoneState: (id: number) => void;
  changeFavState: (id: number) => void;
  changeSelectedState: (id: number) => void;
};

export default function ListItem({
  name,
  id,
  isDone,
  isFav,
  isSelected,
  removeListItem,
  changeDoneState,
  changeFavState,
  changeSelectedState,
}: ListItemProps) {
  return (
    <div className="listItem">
      <input
        type="checkbox"
        name={id.toString()}
        id={id.toString()}
        checked={isSelected}
        onChange={() => changeSelectedState(id)}
      />
      <label
        forhtml={id}
        style={{ "text-decoration": isDone ? "line-through" : "none" }}
      >
        {name}
      </label>
      <button onClick={() => changeFavState(id)}>
        {isFav ? "Unfav" : "Fav"}
      </button>
      <button onClick={() => changeDoneState(id)}>
        {isDone ? "Undone" : "Done"}
      </button>
      <button onClick={() => removeListItem(id)}> Remove </button>
    </div>
  );
}
