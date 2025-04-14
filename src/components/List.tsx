import React from "react";

const List = (props: any) => {
  const items = props.value.filter(
    (item: any) => item.note.trim() !== ""
  ).reverse();
  return (
    <ul className="list-group">
      {items.map((item: any) => (
        <li className="list-group-item d-flex justify-content-between align-items-center li-note-item">
          <pre className="note-item">{item.note}</pre>
        </li>
      ))}
    </ul>
  );
};

export default List;
