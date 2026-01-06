import { useRef } from "react";
import Modal from "./Modal";

export default function App() {
  const modalRef = useRef(null);

  return (
    <>
      <button onClick={() => modalRef.current.open()}>
        打开 Modal
      </button>

      <button onClick={() => modalRef.current.close()}>
        外部关闭 Modal
      </button>

      <Modal ref={modalRef} />
    </>
  );
}
