import {useState} from "react";
import AttributeRow from "../components/AttributeRow.tsx";
import ModalDelete from "../components/ModalDelete.tsx";
import {useInfiniteQuery} from "@tanstack/react-query";
import React from "react";
import {ATTRIBUTES_PAGINATION} from "../constants/constants.ts";
import {useInView} from "react-intersection-observer";
import Loading from "../components/Loading.tsx";
import {useLabelsContext} from "../context/LabelsContext.tsx";

export default function Attributes() {
  const [searchText, setSearchText] = useState('');
  const [sort, setSort] = useState({sortBy: 'name', sortDir: 'asc'})

  const [modalAttributeName, setModalAttributeName] = useState('');
  const [modalAttributeId, setModalAttributeId] = useState('');
  const [modalShown, setModalShown] = useState(false);

  // const { labels } = useLabelsContext();
  //
  // console.log(labels)


  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSort = ({sortBy, sortDir}) => {
    setSort({
      sortBy, sortDir
    });
  }

  const handleModalHide = () => {
    setModalShown(false);
  }

  const handleModalShow = ({name, id}) => {
    setModalShown(true);
    setModalAttributeId(id);
    setModalAttributeName(name);
  }

  const SortButton = ({sortBy, sortDir}) => {
    const arrow = sortDir === 'asc' ? '&darr;' : '&uarr;';
    const active = sortBy === sort.sortBy && sortDir === sort.sortDir;

    return <button disabled={active}
                   className={'ml-2 opacity-40 hover:opacity-75 disabled:opacity-100 disabled:pointer-events-none'}
                   onClick={() => {
                     handleSort({sortBy, sortDir})
                   }} dangerouslySetInnerHTML={{__html: arrow}}/>
  }

  function AttributesTable() {
    const {ref, inView} = useInView();

    const fetchAttributes = async ({pageParam}) => {
      const params = queryParams(pageParam);

      const res = await fetch('http://127.0.0.1:3000/attributes' + params)
      return res.json()
    }

    const queryParams = (offset: number | undefined = 0): string | undefined => {
      if (searchText) {
        return `?offset=${offset}&sortBy=${sort.sortBy}&sortDir=${sort.sortDir}&searchText=${searchText}`;
      } else {
        return `?offset=${offset}&sortBy=${sort.sortBy}&sortDir=${sort.sortDir}`;
      }
    }

    const {
      data,
      error,
      fetchNextPage,
      isFetchingNextPage,
      status,
    } = useInfiniteQuery({
      queryKey: ['attributes', sort.sortDir, sort.sortBy, searchText],
      queryFn: fetchAttributes,
      getNextPageParam: (lastPage, pages) => {
        return lastPage?.meta?.hasNextPage ? pages.length * ATTRIBUTES_PAGINATION : undefined;
      },
    });

    React.useEffect(() => {
      if (inView) {
        fetchNextPage()
      }
    }, [inView])

    React.useEffect(() => {
      /**
       * Fix inView not causing useEffect to fir on page load
       */

      if (status === 'success') {
        if (inView) {
          fetchNextPage()
        }
      }
    }, [status]);

    return status === 'loading' ? (
      <p>Loading...</p>
    ) : status === 'error' ? (
      <p>Error: {error.message}</p>
    ) : (
      <>
        <table className="border-collapse border mt-5">
          <thead className={'bg-gradient-to-br from-primary to-secondary'}>
          <tr>
            <th className="border p-4 text-start">
              Name
              <SortButton sortBy={'name'} sortDir={'asc'}/>
              <SortButton sortBy={'name'} sortDir={'desc'}/>
            </th>
            <th className="border p-4 text-start">Labels</th>
            <th className="border p-4 text-start" colSpan={2}>
              Created At
              <SortButton sortBy={'createdAt'} sortDir={'asc'}/>
              <SortButton sortBy={'createdAt'} sortDir={'desc'}/>
            </th>
          </tr>
          </thead>
          <tbody>
          {data?.pages?.map((group, i) => (
            <React.Fragment key={i}>
              {group?.data?.map((attribute) => (
                <AttributeRow
                  key={attribute.id}
                  id={attribute?.id}
                  name={attribute?.name}
                  createdAt={attribute?.createdAt}
                  labelIds={attribute?.labelIds}
                  deleted={attribute?.deleted}
                  showModal={handleModalShow}
                />
              ))}
            </React.Fragment>
          ))}
          </tbody>
        </table>

        <div ref={ref}>
          {isFetchingNextPage ? <Loading/> : null}
        </div>
      </>
    )
  }

  return (
    <>
      <h1 className="block text-2xl font-bold sm:text-4xl text-center">Attributes</h1>

      <div className="mt-5 mb-2 flex gap-2 flex-col">
        <label htmlFor="searchTextFilter" className="block text-sm font-medium">Filter attributes</label>
        <input placeholder="Type here..."
               value={searchText}
               className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none hover:ring-2 hover:ring-primary focus:ring-2 focus:ring-secondary"
               onChange={handleSearchTextChange}
               id="searchTextFilter"
        />
      </div>

      <div className="mt-5 mb-2 flex gap-2 flex-col">
        <h2 className="block text-xl font-bold sm:text-2xl">Results:</h2>

        <AttributesTable/>
      </div>

      {modalShown &&
          <ModalDelete
              attributeId={modalAttributeId}
              attributeName={modalAttributeName}
              close={handleModalHide}
          />}
    </>
  );
}
