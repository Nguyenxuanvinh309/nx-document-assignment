import { Box, Flex } from "@mantine/core";
import { yupResolver } from '@hookform/resolvers/yup';
import { useFetch, useMute } from "../../../hooks";
import { Button, FolderItem, Loading } from "../../components";
import { IFolder } from "../../models/folders/type";
import styles from './style.module.scss';
import schema, { FolderType } from "./schema";
import { useForm } from "react-hook-form";
import TextInput from "../../components/Form/TextInput";
import { toast } from "react-toastify";
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
  const { control, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: { name: '' }
  });
  const { isValid } = formState;
  const { request: addRequest, isLoading: isAdding } = useMute<FolderType, null>();
  const { request: deleteRequest, isLoading: isDeleting } = useMute();

  const handleAdd = (data: FolderType) => {
    addRequest({
      url: "/folders",
    },  data, {
      onSuccess: () => {
        refetch();
        reset();
        toast.success('Add Success');
      },
    });
  };
  const handleDelete = (id: string) => {
    deleteRequest({
      url: `/folders/${id}`,
      method: 'DELETE',
    }, null, {
      onSuccess: () => {
        toast.success('Delete Success');
        refetch();
      },
    });
  };

  console.log(isValid);
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
        className={styles.wrapper}
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
          <form onSubmit={handleSubmit(handleAdd)} >
            <TextInput
              name="name"
              control={control}
              placeholder="Folder name"
              variant="unstyled"
              mb={10}
            />
            <Button
              miw={300}
              size="lg"
              fw={600}
              variant="filled"
              type="submit"
              disabled={!isValid || isAdding}
            >
              ADD FOLDER
            </Button>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Folders;




