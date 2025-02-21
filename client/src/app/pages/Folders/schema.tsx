import { InferType, object } from 'yup';
import * as yup from 'yup';

const schema = object({
  name: yup.string().required('Required field'),
});

export default schema;
export type FolderType = InferType<typeof schema>;