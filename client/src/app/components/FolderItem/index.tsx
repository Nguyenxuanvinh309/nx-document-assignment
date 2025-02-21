import { Flex, Text } from "@mantine/core";
import { IFolder } from "../../models/folders/type";
import { IconTrashFilled } from '@tabler/icons-react';

type Props = IFolder & {
  onDeleteItem: (id: string) => void,
  disabled?: boolean,
}
const FolderItem = ({
  name,
  id,
  disabled = false,
  onDeleteItem,
}: Props) => {
  return (
    <Flex 
      style={{ 
        display: 'flex',
        borderRadius: 8,
        border: '1px solid #00398f',
        cursor: "pointer"
      }}
      p={8}
      px={16}
      mih={50}
      miw={300}
      align={'center'}
      justify={'space-between'}
    >
      <Text fw={600} color="primary">{name}</Text>
      <IconTrashFilled cursor={disabled ? "not-allowed" : "pointer"} color="gray" onClick={() => !disabled && onDeleteItem(id)} />
    </Flex>
  );
};
export default FolderItem;