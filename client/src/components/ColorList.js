import React, { useState, useEffect } from "react";
import axios from "axios";
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
  
  useEffect( () => {
    const colorToEdit = colors.find( color => {
      return color.id === Number(match.params.id)
    })
  
    console.log( 'colorToEdit', colorToEdit )
  
    if ( colorToEdit ) {
      setColorToEdit( colorToEdit ) 
    }
  }, [ colorToEdit, match.params.id ] )

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axios
      .put( `http://localhost:5000/api/colors/${match.params.id}`, colorToEdit )
      .then( res => {
        console.log( '.put Res.data:', res.data )
        window.location.href = `/protected`
      })
      .catch( err => {
        console.log( 'Error:', err )
      })
  };

  const deleteColor = color => {
    axios
      .delete( `http://localhost:5000/api/colors/${match.params.id}` )
      .then( res => {
        console.log( '.delete Res.data:', res.data )
        window.location.href = `/protected`
      })
      .catch( err => {
        console.log( 'Error:', err )
      })
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
