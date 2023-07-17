import * as yup from 'yup';

export const videoValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  content_creator_id: yup.string().nullable(),
});
