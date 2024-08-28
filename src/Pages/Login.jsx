import { useContext, useEffect, useState } from "react";
import { PocketbaseContext } from "../App";
import { Navigate } from "react-router-dom";
const Login = () => {
  const pb = useContext(PocketbaseContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(form.email, form.password);
    const data = await pb.collection("users").authWithPassword("newUser", "Password@123");

    console.log(data, "hello world");
  };

  const onChange = (e) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  useEffect(() => {}, []);
  return (
    <>
      {pb.authStore.model && <Navigate to="/dashboard" replace={true} />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="CompanyLogo"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tigt text-gray-900">
            Sign in to your Account!!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={(e) => {
              onSubmit(e);
            }}
            className="space-y-6"
          >
            <div className="">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email Address
              </label>
              <div className="mt-2">
                <input
                  onChange={onChange}
                  id="email"
                  name="email"
                  type="text"
                  value={form.email}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1 5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot Password
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={onChange}
                  value={form.password}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="Submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not A Member?{" "}
            <a href="" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start with a free trial now
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
