import { useQuery } from "@tanstack/react-query";
import { useGetData } from "../configs/api";

type Props = {
  url: string,
  queryKey: string[],
};

const useFetch = ({
  url,
  queryKey,
  ...props
}: Props) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => useGetData(url),
    ...props
  });
};

export default useFetch;