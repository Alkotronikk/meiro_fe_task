import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ModalDelete from "../components/ModalDelete.tsx";
import Loading from "../components/Loading.tsx";
import Button from "../components/Button.tsx";
import {useLabelsContext} from "../context/LabelsContext.tsx";

function Labels({labelIds}) {
  const {labels} = useLabelsContext();

  return <>
    <ul className="list-disc list-inside">
      {labels?.map((label) => {
          return labelIds?.includes(label.id) ? <li key={label.id}>{label.name}</li> : null;
        }
      )}
    </ul>
  </>
}

export default function AttributeDetail() {
  const {id} = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalShown, setModalShown] = useState(false);

  const navigate = useNavigate();

  const handleModalHide = () => {
    setModalShown(false);
  }

  const handleModalShow = () => {
    setModalShown(true);
  }

  useEffect(() => {
    fetchDataForAttributeDetail();
  }, []);

  const fetchDataForAttributeDetail = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/attributes/${id}`
      );
      if (!response.ok) {
        throw new Error(`An error occured: ${response.statusText}`);
      }
      const postsData = await response.json();

      setData(postsData?.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => {
        navigate('..')
      }}>&lt; Back to attributes</Button>

      {data && <>
          <h1 className="block text-2xl font-bold sm:text-4xl text-center">{data?.name}</h1>
          <div className="mt-5 flex flex-col gap-2 mb-4">
              <p className="font-bold"><strong>Labels:</strong></p>

            {data?.labelIds?.length && <Labels labelIds={data.labelIds}/>}
          </div>

          <div className="mt-5 flex flex-col gap-2 mb-4">
              <p className="font-normal">
                  <Button onClick={handleModalShow} variant={'danger'}>Delete attribute</Button>
              </p>
          </div>

        {modalShown && <ModalDelete attributeName={data?.name} attributeId={id} close={handleModalHide}/>}
      </>}

      {loading && <Loading/>}

      {error && <div className="text-sm my-6 text-danger">{error}</div>}
    </>
  );
}
