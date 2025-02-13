import React from "react"

interface InputProps {
    idRef: React.Ref<HTMLInputElement>;
    nameRef: React.Ref<HTMLInputElement>;
    issueDateRef: React.Ref<HTMLInputElement>;
    expiryDateRef: React.Ref<HTMLInputElement>;
}

export const Input = ({ idRef, nameRef, issueDateRef, expiryDateRef }: InputProps) => {

    return <div className="flex flex-col">
        <input type="text" placeholder="id" ref={idRef} />
        <input type="text" placeholder="name" ref={nameRef} />
        <input type="text" placeholder="issueDate" ref={issueDateRef} />
        <input type="text" placeholder="expiryDate" ref={expiryDateRef} />
    </div>
}