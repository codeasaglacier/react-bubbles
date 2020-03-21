import React, { useState } from "react";
import { axiosAuth } from './axiosAuth'
import { useRouteMatch } from 'react-router-dom'


const initialColor = {
  color: "",
  code: { hex: "" }
};


const ColorList = ({ colors, updateColors, props }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const match = useRouteMatch()


  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    const color = colors.find( item => colorToEdit.code.hex === item.code.hex )
    axiosAuth()
      .put( `/colors/${color}`, colorToEdit )
      .then( res => {
        console.log( '.put Res.data:', res.data )
        setEditing(false)
        updateColors( [ ...colors, res.data ] )
      })
      .catch( err => {
        console.log( 'Error:', err )
      })
  };

  const deleteColor = color => {
    axiosAuth()
      .delete( `/colors/${color.id}` )
      .then( res => {
        console.log( '.delete Res:', res )
      })
      .catch( err => {
        console.log( 'Error:', err )
      })
      updateColors(
        colors.filter( item => {
          return item.id !== color.id
        })
      )
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
