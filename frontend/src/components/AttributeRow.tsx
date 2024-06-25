import {FC} from "react";
import {useNavigate} from "react-router-dom";
import Button from "./Button.tsx";
import {useLabelsContext} from "../context/LabelsContext.tsx";

type Label = {
  id: string
  name: string
}

interface Props {
  id: string
  name: string
  createdAt: string // ISO8601
  labelIds: Array<Label<"id">>
  deleted: boolean;
  showModal: ({name: string, id: string}) => void;
}

const AttributeRow: FC<Props> = ({id, name, createdAt, labelIds, showModal}) => {
  const {labels} = useLabelsContext();

  const labelsFound = labelIds.map((labelId) => {
    return labels.find((label) => label.id === labelId)?.name;
  })

  const handleShowModal = (event) => {
    event.stopPropagation();
    event.preventDefault();

    showModal({name, id});
  }

  const navigate = useNavigate();

  return (
    <tr onClick={() => {
      navigate(`/attributes/${id}`)
    }} className={"hover:bg-white cursor-pointer"}>
      <td className="border px-4 py-2"><strong>{name}</strong></td>
      <td className="border px-4 py-2">{labelsFound.join(', ')}</td>
      <td className="border px-4 py-2">{createdAt}</td>
      <td className="border px-4 py-2 text-right">
        <Button variant={'danger'} onClick={(e) => {
          handleShowModal(e)
        }}>Delete attribute</Button>
      </td>
    </tr>
  )
}

export default AttributeRow;