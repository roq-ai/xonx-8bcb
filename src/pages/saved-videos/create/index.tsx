import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createSavedVideo } from 'apiSdk/saved-videos';
import { Error } from 'components/error';
import { savedVideoValidationSchema } from 'validationSchema/saved-videos';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ClientInterface } from 'interfaces/client';
import { VideoInterface } from 'interfaces/video';
import { getClients } from 'apiSdk/clients';
import { getVideos } from 'apiSdk/videos';
import { SavedVideoInterface } from 'interfaces/saved-video';

function SavedVideoCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SavedVideoInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSavedVideo(values);
      resetForm();
      router.push('/saved-videos');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SavedVideoInterface>({
    initialValues: {
      client_id: (router.query.client_id as string) ?? null,
      video_id: (router.query.video_id as string) ?? null,
    },
    validationSchema: savedVideoValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Saved Video
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<ClientInterface>
            formik={formik}
            name={'client_id'}
            label={'Select Client'}
            placeholder={'Select Client'}
            fetcher={getClients}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<VideoInterface>
            formik={formik}
            name={'video_id'}
            label={'Select Video'}
            placeholder={'Select Video'}
            fetcher={getVideos}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'saved_video',
    operation: AccessOperationEnum.CREATE,
  }),
)(SavedVideoCreatePage);
