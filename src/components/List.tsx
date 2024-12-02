import React from "react";

const List = (props: any) => {
  const items = props.value.slice().reverse();
  return (
    <ul className="list-group">
      {items.map((item: any) => (
        <li className="list-group-item d-flex justify-content-between align-items-center li-note-item">
          <pre className="note-item">{item.note}</pre>

          <span className="badge badge-primary badge-pill">
            <img
              src="/src/assets/delete.svg"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            ></img>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default List;
