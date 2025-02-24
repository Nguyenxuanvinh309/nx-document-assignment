import { Flex } from "@mantine/core";
import { useNavigate, useSearch } from '@tanstack/react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFetch, useMute } from "../../../hooks";
import { IFolder } from "../../models/folders/type";
import schema, { FolderType } from "./schema";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { addNewFolder, getFolderList, deleteNewFolder, getFolderDetail } from "../../models/folders";
import { useEffect, useState } from "react";
import FolderList from "./FolderList";
import FolderDetail from "./FolderDetail";
/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 This is a starter component and can be deleted.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 Delete this file and get started with your project!
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
 type DocumentProps = Document & {
  id: string,
  title: string,
  createdAt: number;
  content: string;
};


const Folders = () => {
  const navigate = useNavigate({ from: '/' });
  const { folderId } = useSearch({ from: '/' });
  const {
    data, refetch, isLoading
  } = useFetch<IFolder[]>(getFolderList);
  const {
    data: detail, isLoading: isDetailLoading
  } = useFetch<DocumentProps[]>(getFolderDetail(folderId as unknown as string));

  const [selectedDocument, setSelectedDocument] = useState(0);
  const { control, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: { name: '' }
  });
  const { isValid } = formState;
  const { request: addRequest, isLoading: isAdding } = useMute<FolderType, null>();
  const { request: deleteRequest, isLoading: isDeleting } = useMute();

  const handleAdd = (data: FolderType) => {
    addRequest(addNewFolder,  data, {
      onSuccess: () => {
        refetch();
        reset();
        toast.success('Add Success');
      },
    });
  };
  
  const handleDelete = (id: string) => {
    deleteRequest(deleteNewFolder(id), null, {
      onSuccess: () => {
        toast.success('Delete Success');
        refetch();
      },
    });
  };

  const handleSelectedDocument = (index: number, id: string) => {
    setSelectedDocument(index);
    navigate({ to: '/', search: { folderId: id } });
  };

  useEffect(() => {
    const currentId = data?.map((item, index) => item?.id === folderId ? index : null).filter(Boolean);
    setSelectedDocument(currentId?.[0] || 0);
  }, [folderId, data, setSelectedDocument]);

  useEffect(() => {
    // Set default open - file
    if (typeof folderId === 'undefined' && data) {
      navigate({ to: '/', search: { folderId: data?.[0]?.id } });
    }
  }, [folderId, data]);

  console.log(detail);
  return (
    <Flex
      style={{
        display: 'flex',
      }}
      justify="flex-start"
      align="flex-start"
      direction="row"
      w="100%"
      gap={16}
    >
      {/* Folder List */}
      <FolderList 
        data={data}
        selectedDocument={selectedDocument}
        control={control}
        isLoading={isLoading || isDeleting}
        disabled={isLoading || isDeleting}
        disabledSubmitButton={!isValid || isAdding}
        onSubmit={handleSubmit(handleAdd)}
        onDelete={handleDelete}
        onClick={handleSelectedDocument}
      />

      {/* Folder detail */}
      <FolderDetail data={detail} isLoading={isDetailLoading} />
    </Flex>
  );
}

export default Folders;




