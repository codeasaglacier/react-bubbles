import React, { useState, useEffect } from "react";
import { axiosAuth } from './axiosAuth'
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
 
  useEffect( () => {
    axiosAuth()
    .get( '/colors' )
    .then( ( res ) => {
      console.log( 'Res.data:', res.data )
      setColorList( res.data )
    })
    .catch( ( err ) => console.log( err ) )
  }, [])


  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
