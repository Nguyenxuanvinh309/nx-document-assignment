import { Flex, Text } from "@mantine/core";
import { IFolder } from "../../models/folders/type";
import { IconTrashFilled } from '@tabler/icons-react';
import styles from './style.module.scss';

type Props = IFolder & {
  onDeleteItem: (id: string) => void,
  disabled?: boolean,
  onClick: (index: number, id: string) => void;
  selectedDocument: number;
  index: number;
}
const FolderItem = ({
  name,
  id,
  disabled = false,
  index,
  selectedDocument,
  onDeleteItem,
  onClick,
}: Props) => {
  return (
    <Flex 
      className={`${styles.element} ${index === selectedDocument ? styles.active : ''}`}
      p={8}
      px={16}
      mih={50}
      miw={300}
      align={'center'}
      justify={'space-between'}
      onClick={() => onClick(index, id)}
    >
      <Text fw={600} className={styles.elementText}>
        {name}
      </Text>
      <IconTrashFilled
        cursor={disabled ? "not-allowed" : "pointer"}
        color="white"
        onClick={() => !disabled && onDeleteItem(id)}
      />
    </Flex>
  );
};
export default FolderItem;