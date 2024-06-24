import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../api';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const NoteSchema = Yup.object().shape({
  title: Yup.string().max(50, 'Title is too long!').required('Title is required'),
  content: Yup.string().max(500, 'Content is too long!').required('Content is required'),
});

const NoteForm: React.FC = () => {
  const queryClient = useQueryClient();

  const createNote = useMutation(
    (newNote: { title: string; content: string }) => api.post('/notes', newNote),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notes');
      },
    }
  );

  return (
    <Card className="mb-4 p-4">
      <Formik
        initialValues={{ title: '', content: '' }}
        validationSchema={NoteSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          createNote.mutate(values, {
            onSuccess: () => {
              resetForm();
              setSubmitting(false);
            },
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <Field
                as={Input}
                className="w-full"
                type="text"
                name="title"
                placeholder="Title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <Field
                as={Textarea}
                className="w-full"
                name="content"
                placeholder="Content"
              />
              <ErrorMessage
                name="content"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <Button
              type="submit"
              className="mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Note'}
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default NoteForm;
