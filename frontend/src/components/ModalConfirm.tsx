import {FC} from "react";
import Modal from "./Modal.tsx";
import Button from "./Button.tsx";

interface ModalProps {
  close: () => void;
  title: string;
  description: string;
}

const ModalDelete: FC<ModalProps> = ({close, title, description}) => {
  return <>
    <Modal close={close}>
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            {title && <h3 className="text-base font-semibold leading-6" id="modal-title">{title}</h3>}

            {description && <div className="mt-2">
                <p className="text-sm">{description}</p>
            </div>}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <Button onClick={close}>OK</Button>
      </div>
    </Modal>
  </>;
}

export default ModalDelete;