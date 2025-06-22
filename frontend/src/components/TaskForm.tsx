import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { TaskValidationSchema } from "../libs/validation/task.validation.schema";
import type { TaskDTO } from "../types/task";
import { PriorityValues, StatusValues } from "../types/task";

interface TaskFormProps {
  initialValues: TaskDTO;
  onSubmit: (values: TaskDTO) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialValues, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={TaskValidationSchema}
    onSubmit={onSubmit}
  >
    {({ isSubmitting }) => (
      <Form className="space-y-3 max-w-xl mx-auto bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 text-sm">
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700">
            Title
          </label>
          <Field
            name="title"
            type="text"
            placeholder="Enter task title"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <ErrorMessage
            name="title"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block font-medium text-gray-700"
          >
            Description
          </label>
          <Field
            name="description"
            as="textarea"
            placeholder="Enter task description"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="status" className="block font-medium text-gray-700">
              Status
            </label>
            <Field
              name="status"
              as="select"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select status</option>
              {StatusValues.map((value) => (
                <option key={value} value={value}>
                  {value.replace("_", " ")}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="status"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block font-medium text-gray-700"
            >
              Priority
            </label>
            <Field
              name="priority"
              as="select"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select priority</option>
              {PriorityValues.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="priority"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>
        </div>

        <div>
          <label htmlFor="dueDate" className="block font-medium text-gray-700">
            Due Date
          </label>
          <Field
            name="dueDate"
            type="date"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {isSubmitting ? "Submitting..." : "Save Task"}
          </button>
        </div>
      </Form>
    )}
  </Formik>
);

export default TaskForm;
