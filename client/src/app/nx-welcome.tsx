import { useFetch, useMute } from "../hooks";
/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 This is a starter component and can be deleted.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 Delete this file and get started with your project!
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
export function NxWelcome() {
  const {
    data, refetch, isLoading
  } = useFetch<{
    id: string,
    name: string,
    type: string
  }[]>({ 
    queryKey: ['folders'],
    url: '/folders'
  });
  const { request } = useMute<{ name: string }, {}>();
  const { request: deleteRequest } = useMute();

  const handleAdd = () => {
    request({
      url: "/folders",
    },  { name: "Math" }, {
      onSuccess: () => {
        refetch();
      },
    });
  };
  const handleDelete = (id: string) => {
    deleteRequest({
      url: `/folders/${id}`,
      method: 'DELETE',
    }, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  console.log(data, isLoading);
  return (
    <>
      {
        isLoading ? <span>Loading...</span> : data?.map((item: {
          id: string,
          name: string
        }) => {
          return (
            <div key={item?.id}>
              <p>{item?.name}-{item?.id}</p>
              <div>
                <button onClick={() => handleDelete(item?.id)}>Delete Folder</button>
              </div>
            </div>
          )
        })
      }
      <div className="wrapper">
        <button onClick={() => handleAdd()}>Add Folder</button>
      </div>
    </>
  );
}

export default NxWelcome;




