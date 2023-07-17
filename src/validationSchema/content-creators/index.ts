import * as yup from 'yup';

export const contentCreatorValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
});
