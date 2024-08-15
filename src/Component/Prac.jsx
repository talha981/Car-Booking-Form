import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  pickupDate: Yup.date().required('Pickup Date is required').nullable(),
  pickupTime: Yup.string().required('Pickup Time is required'),
  pickupLocation: Yup.string().required('Pickup Location is required'),
  dropOffLocation: Yup.string().when('serviceType', {
    is: (serviceType) => ['AIRPORT DROP OFF', 'POINT TO POINT', 'AIRPORT PICK UP'].includes(serviceType),
    then: Yup.string().required('Drop Off Location is required')
  })
});

const Prac = () => {
  const initialValues = {
    serviceType: '',
    pickupDate: '',
    pickupTime: '',
    pickupLocation: '',
    dropOffLocation: '',
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4 p-4">
          {/* Pickup Date */}
          <div>
            <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700">
              Pickup Date
            </label>
            <Field
              id="pickupDate"
              name="pickupDate"
              type="date"
              className={`mt-1 block w-full p-2 border ${errors.pickupDate && touched.pickupDate ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            <ErrorMessage name="pickupDate" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          {/* Pickup Time */}
          <div>
            <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700">
              Pickup Time
            </label>
            <Field
              id="pickupTime"
              name="pickupTime"
              type="time"
              className={`mt-1 block w-full p-2 border ${errors.pickupTime && touched.pickupTime ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            <ErrorMessage name="pickupTime" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          {/* Pickup Location */}
          <div>
            <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">
              Pickup Location
            </label>
            <Field
              id="pickupLocation"
              name="pickupLocation"
              type="text"
              className={`mt-1 block w-full p-2 border ${errors.pickupLocation && touched.pickupLocation ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            <ErrorMessage name="pickupLocation" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          {/* Drop Off Location */}
          <div>
            <label htmlFor="dropOffLocation" className="block text-sm font-medium text-gray-700">
              Drop Off Location
            </label>
            <Field
              id="dropOffLocation"
              name="dropOffLocation"
              type="text"
              className={`mt-1 block w-full p-2 border ${errors.dropOffLocation && touched.dropOffLocation ? 'border-red-500' : 'border-gray-300'} bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            <ErrorMessage name="dropOffLocation" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Prac;
