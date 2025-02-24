import { Flex, Text } from "@mantine/core";
import { Loading } from "../../../components";
import dayjs from 'dayjs';
import styles from './style.module.scss';
import { useMute } from "../../../../hooks";
import { addNewDocument } from "../../../models/documents";

type DocumentProps = Document & {
  id: string,
  title: string,
  createdAt: number;
  content: string;
};

type Props = {
  isLoading: boolean;
  data: DocumentProps[] | undefined;
};

const FolderDetail = ({
  isLoading,
  data
}: Props) => {
  const { request: addRequest, isLoading: isAdding } = useMute<any, null>();
  const handleAdd = () => {
    addRequest(addNewDocument, {
      "title": "New Document 5",
      "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "folderId": "javascript"
    });
  };

  console.log(data);
  return (
    <div className={styles.wrapper}>
      <Flex w="100%" className={styles.container}>
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
          ) : (
            data?.map((item) => {
              return (
                <Flex key={item.id} className={styles.elementContainer}>
                  <Flex className={styles.elementWrapper}>
                    <Text fw={600} className={styles.elementTitle}>
                      {item?.title}
                    </Text>
                    <Text className={styles.elementDate}>
                      {dayjs(item?.createdAt).format('YYYY-MM-DD')}
                    </Text>
                  </Flex>
                  <Text className={styles.elementText}>{item?.content}</Text>
                </Flex>
              )
            })
          )
        }
      </Flex>
      <div onClick={() => handleAdd()} style={{ color: 'red' }}>Tạo</div>
    </div>
  );
};
export default FolderDetail;