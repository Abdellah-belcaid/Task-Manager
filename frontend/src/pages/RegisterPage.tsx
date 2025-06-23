import { ErrorMessage, Field, Form, Formik } from "formik";
import { Lock, Mail, User } from "lucide-react";
import React from "react";
import { useRegister } from "../hooks/useRegister";
import { RegisterValidationSchema } from "../libs/validation/user.validation.shemas";
import { INITIAL_REGISTER_VALUES } from "../types/user";

const RegisterPage: React.FC = () => {
  const { mutate, isPending } = useRegister();

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-600">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <Formik
          initialValues={INITIAL_REGISTER_VALUES}
          validationSchema={RegisterValidationSchema}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <h2 className="text-3xl font-extrabold text-center text-gray-800">
                Create Account
              </h2>
              <p className="text-center text-gray-500">
                Register to start managing your tasks
              </p>

              {/* Name */}
              <div>
                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
                  <User className="text-gray-400 mr-3" />
                  <Field
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    className="w-full outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-2 text-center"
                />
              </div>

              {/* Email */}
              <div>
                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
                  <Mail className="text-gray-400 mr-3" />
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-2 text-center"
                />
              </div>

              {/* Username */}
              <div>
                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
                  <User className="text-gray-400 mr-3" />
                  <Field
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="w-full outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-2 text-center"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-green-500">
                  <Lock className="text-gray-400 mr-3" />
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-2 text-center"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50"
                disabled={isSubmitting || isPending}
              >
                {isPending ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
