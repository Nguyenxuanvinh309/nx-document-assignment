import { HttpMethod } from "client/src/configs/types";

const getFolderList = ({ 
  queryKey: ['folders'],
  url: '/folders'
});

const getFolderDetail = (id: string) => ({ 
  queryKey: ['folder-detail', id],
  url: `/folders/${id}`,
  enabled: !!id
});

const addNewFolder = ({
  url: "/folders",
  method: 'POST' as HttpMethod,
});

const deleteNewFolder = (id: string) => {
  return {
    url: `/folders/${id}`,
    method: 'DELETE' as HttpMethod,
  }
};

export {
  getFolderList,
  addNewFolder,
  deleteNewFolder,
  getFolderDetail
}