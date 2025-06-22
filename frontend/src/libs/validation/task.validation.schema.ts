import * as Yup from "yup";
import { PriorityValues, StatusValues } from "../../types/task";

export const TaskValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  status: Yup.mixed().oneOf(StatusValues).required("Status is required"),
  priority: Yup.mixed().oneOf(PriorityValues).required("Priority is required"),
  dueDate: Yup.date().nullable(),
});
