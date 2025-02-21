import { Flex } from "@mantine/core";
import { useFetch, useMute } from "../../../hooks";
import { FolderItem } from "../../components";
import { IFolder } from "../../models/folders/type";
import styles from './style.module.scss';
/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 This is a starter component and can be deleted.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 Delete this file and get started with your project!
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
const Folders = () => {
  const {
    data, refetch, isLoading
  } = useFetch<IFolder[]>({ 
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
    }, {}, {
      onSuccess: () => {
        console.log(1);
        refetch();
      },
    });
  };

  console.log(data, isLoading);
  return (
    <Flex
      style={{
        display: 'flex'
      }}
      justify="flex-start"
      align="flex-start"
      direction="row"
      wrap="wrap"
      gap={16}
    >
      {
        isLoading ? <span>Loading...</span> : data?.map((item: IFolder) => {
          return (
            <FolderItem key={item?.id} {...item} onDeleteItem={handleDelete} />
          )
        })
      }
      
      <div className="wrapper">
        <button onClick={() => handleAdd()}>Add Folder</button>
      </div>
    </Flex>
  );
}

export default Folders;




