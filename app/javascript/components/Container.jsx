import * as React from 'react';
import { useContext, useEffect } from 'react';
import { store } from '../providers/TSSProvider';

export default function Container(props){
  const { setWindowDimension, windowWidth } = useContext(store);
  
  useEffect(() => {
    function onResize(){
      setWindowDimension({
        windowWidth: window.innerWidth, 
        windowHeight: window.innerHeight
      });
    }

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };

  }, []);
  
  return (
    <>
      { props.children }
    </>
  )
}