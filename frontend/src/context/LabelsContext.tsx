import {createContext, useState, useContext, useEffect} from "react";
import {LABELS_PAGINATION} from "../constants/constants.ts";
import {useInfiniteQuery} from "@tanstack/react-query";

export const LabelsContext = createContext([]);
export const LabelsContextProvider = LabelsContext.Provider;
export const useLabelsContext = () => useContext(LabelsContext);

export const LabelsProvider = ({children}) => {
  const [labels, setLabels] = useState();

  const fetchLabels = async ({pageParam}) => {
    const res = await fetch('http://127.0.0.1:3000/labels?offset=' + pageParam)
    return res.json();
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['labels'],
    queryFn: fetchLabels,
    initialPageParam: 0,
    staleTime: Infinity,
    getNextPageParam: (lastPage, pages) => lastPage?.meta?.hasNextPage ? pages.length * LABELS_PAGINATION : undefined,
  })

  if (hasNextPage) {
    /**
     * Fetch everything
     */
    fetchNextPage();
  }

  useEffect(() => {
    let labelData = [];

    data?.pages?.map(function (page) {
      labelData = labelData.concat(page.data);
    })

    setLabels(labelData);
  }, [data]);

  return (
    <LabelsContextProvider value={{labels}}>
      {children}
    </LabelsContextProvider>
  );
};