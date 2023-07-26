

// modal file s an example

import React from 'react';
import ReactDOM from 'react-dom';

// create modal and use a portal to mount it in a specific DOM point
const Modal = ({children,hide}) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div className={`${hide ? "hide" : ""}`} >{children}</div>,
        document.getElementById('modal-root'),
      )}
    </React.Fragment>
  )
}


export default Modal;
