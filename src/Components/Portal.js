import { useEffect } from "react";
import ReactDOM from "react-dom";

const Portal = ({ children, setState, DOMrender, DOMevent, ...props }) => {
  const event = DOMevent || document.getElementById("root");
  const portal = DOMrender || document.getElementById("portal");

  useEffect(() => {
    event.addEventListener("click", setState);
  }, [setState, event]);

  useEffect(() => {
    return () => {
      event.removeEventListener("click", setState);
    };
  }, [setState, event]);

  return ReactDOM.createPortal(children, portal);
};

export default Portal;
