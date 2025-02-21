import { Flex, Text } from "@mantine/core";
import { IFolder } from "../../models/folders/type";

type Props = IFolder & {
  onDeleteItem: (id: string) => void
}
const FolderItem = ({
  name,
  id,
  onDeleteItem
}: Props) => {
  return (
    <Flex 
      style={{ 
        display: 'flex',
        borderRadius: 8
      }}
      bg={'gray.2'}
      p={8}
      px={16}
      mih={50}
      miw={300}
      align={'center'}
    >
      <Text fw={600}>{name}</Text>
      <button onClick={() => onDeleteItem(id)}>Delete Folder</button>
    </Flex>
  );
};
export default FolderItem;