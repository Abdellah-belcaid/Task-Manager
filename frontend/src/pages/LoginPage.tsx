import { ErrorMessage, Field, Form, Formik } from "formik";
import { Lock, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { LoginValidationSchema } from "../libs/validation/user.validation.shemas";
import { INITIAL_AUTH_VALUES, type AuthenticationRequest } from "../types/user";
import { ROUTES } from "../utils/constants";

const LoginPage: React.FC = () => {
  const { mutate: login, isPending } = useLogin();

  const handlLogin = (values: AuthenticationRequest) => {
    login(values);
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <Formik
          initialValues={INITIAL_AUTH_VALUES}
          validationSchema={LoginValidationSchema}
          onSubmit={handlLogin}
        >
          {() => (
            <Form className="space-y-6">
              <h2 className="text-3xl font-extrabold text-center text-gray-800">
                Welcome Back
              </h2>
              <p className="text-center text-gray-500">
                Please log in to your account
              </p>

              <div>
                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
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

              <div>
                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50"
                disabled={isPending}
              >
                {isPending ? "Logging in..." : "Log In"}
              </button>

              <p className="text-center text-gray-500 mt-4">
                Don't have an account?{" "}
                <Link
                  to={ROUTES.REGISTER}
                  className="text-blue-600 hover:underline"
                >
                  Register here
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
