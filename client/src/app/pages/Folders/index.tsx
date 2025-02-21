import { Box, Flex } from "@mantine/core";
import { useFetch, useMute } from "../../../hooks";
import { Button, FolderItem, Loading } from "../../components";
import { IFolder } from "../../models/folders/type";
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
  const { request: deleteRequest, isLoading: isDeleting } = useMute();

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
        display: 'flex',
      }}
      justify="flex-start"
      align="flex-start"
      direction="column"
      wrap="wrap"
      w="100%"
      gap={16}
    >
      <Flex 
        style={{
          display: 'flex',
          border: '1px solid gray',
          padding: 16,
          borderRadius: 8,
          height: 'calc(100vh - 32px)',
          boxShadow: '0 0 11px 0 #00000069'
        }}
        direction="column"
        justify="space-between"
        gap={16}
      >
        <Flex
          style={{
            display: 'flex'
          }}
          w="100%"
          justify="flex-start"
          align="flex-start"
          direction="column"
          wrap="wrap"
          gap={16}
        >
          {
            isLoading || isDeleting ? (
              <Flex 
                style={{
                  display: 'flex'
                }}
                justify="center"
                align="center"
                w="inherit"
              >
                <Loading />
              </Flex>
            ) : data?.map((item: IFolder) => {
              return (
                <FolderItem key={item?.id} {...item} onDeleteItem={handleDelete} disabled={isLoading || isDeleting} />
              )
            })
          }
        </Flex>

        <Box>
          <Button miw={300} size="lg" fw={600} variant="filled" onClick={() => handleAdd()}>ADD FOLDER</Button>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Folders;




