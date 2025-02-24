import { Box, Flex } from "@mantine/core";
import { Button, FolderItem, Loading } from "../../../components";
import { TextInput } from "../../../components/Form";
import styles from './style.module.scss';
import { IFolder } from "client/src/app/models/folders/type";
import { Control } from "react-hook-form";

type Props = {
  data: IFolder[] | undefined;
  selectedDocument: number;
  control: Control<{
    name: string;
  }>;
  isLoading: boolean;
  disabled: boolean;
  disabledSubmitButton: boolean;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  onDelete: (id: string) => void;
  onClick: (index: number, id: string) => void;
};

const FolderList = ({
  data,
  selectedDocument,
  control,
  isLoading,
  disabled,
  disabledSubmitButton,
  onSubmit,
  onDelete,
  onClick
}: Props) => {
  return (
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
          isLoading ? (
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
          ) : data?.map((item: IFolder, index: number) => {
            return (
              <FolderItem 
                key={item?.id}
                index={index}
                {...item}
                selectedDocument={selectedDocument}
                onDeleteItem={onDelete}
                onClick={onClick}
                disabled={isLoading}
              />
            )
          })
        }
      </Flex>

      <Box>
        <form onSubmit={onSubmit} >
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
            disabled={disabledSubmitButton}
          >
            ADD FOLDER
          </Button>
        </form>
      </Box>
    </Flex>
  );
};
export default FolderList;