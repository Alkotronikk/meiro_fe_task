import {FC, useState} from "react";
import Modal from "./Modal.tsx";
import Button from "./Button.tsx";
import ModalConfirm from "./ModalConfirm.tsx";

interface ModalProps {
  close: () => void;
  attributeId?: string;
  attributeName: string;
}

const ModalDelete: FC<ModalProps> = ({close, attributeId, attributeName}) => {
  const [waitingForDelete, setWaitingForDelete] = useState(false);
  const [error, setError] = useState(null);
  const [deleted, setDeleted] = useState(false);

  const deleteAttribute = async () => {
    setWaitingForDelete(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:3000/attributes/${attributeId}`
        , {
          method: 'DELETE',
        });
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      setError(null);

      setDeleted(true);
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setWaitingForDelete(false);
    }
  };

  return <>
    {!deleted && <Modal close={close}>
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
                <div
                    className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-danger" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                    </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold leading-6" id="modal-title">Are you sure you want to delete
                        this
                        attribute?</h3>
                    <div className="mt-2">
                        <p className="text-sm">Attribute <strong>{attributeName}</strong> will be
                            permanently removed. This action cannot be undone.</p>
                    </div>

                  {error && <div className="text-sm text-danger">An error occured. Please try again.</div>}
                </div>
            </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <Button variant={'danger'} onClick={deleteAttribute} disabled={waitingForDelete} className={'ml-2'}>Delete
                attribute</Button>
            <Button onClick={close}>Cancel</Button>
        </div>
    </Modal>}
    {deleted && <ModalConfirm close={close} title={'Attributed successfully deleted'}
                              description={`The attribute ${attributeName} has been deleted sucessfully.`}/>}
  </>;
}

export default ModalDelete;