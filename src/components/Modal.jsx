import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal(props) {
    const {children, open, onHide, className = ' ', onClose} = props;
    const dialogRef = useRef();

    useEffect(()=>{
        if(open) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [open])

    return createPortal(
        <dialog className={`modal ${className}`} ref={dialogRef} onClose={onClose}>
            {children}
        </dialog>, document.getElementById('modal'));
}