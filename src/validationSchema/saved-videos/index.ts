import * as yup from 'yup';

export const savedVideoValidationSchema = yup.object().shape({
  client_id: yup.string().nullable(),
  video_id: yup.string().nullable(),
});
