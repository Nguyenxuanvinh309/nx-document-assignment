import { HttpMethod } from "client/src/configs/types";


const addNewDocument = ({
  url: "/documents",
  method: 'POST' as HttpMethod,
});

export {
  addNewDocument,
}