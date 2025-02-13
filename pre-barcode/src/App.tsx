import { Input } from "./Input";
import SecureQRCode from "./SecureQRCode";
import { useRef } from "react";

function App() {

  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const issueDateRef = useRef<HTMLInputElement>(null);
  const expiryDateRef = useRef<HTMLInputElement>(null);

  return <div>
    <SecureQRCode idRef={idRef} nameRef={nameRef} issueDateRef={issueDateRef} expiryDateRef={expiryDateRef} />
    <Input idRef={idRef} nameRef={nameRef} issueDateRef={issueDateRef} expiryDateRef={expiryDateRef} />
  </div>
}

export default App
