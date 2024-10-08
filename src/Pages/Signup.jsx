import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PocketbaseContext } from "../App";
import Alert from "../Components/Alert";

const Signup = () => {
  const pb = useContext(PocketbaseContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    emailVisibility: "true",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await pb.collection("users").create(form);

      navigate("/");
    } catch (e) {
      let data = Object.keys(e.data.data);
      const errorObject = {
        message: e.data.message,
        data: data.map((i, x) => {
          console.log(e.data.data[i], i, x);
          return [i, e.data.data[i]];
        }),
      };

      setError(errorObject);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  const onChange = (e) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };
  return (
    <>
      {pb.authStore.model?.id && <Navigate to="/dashboard" replace={true} />}
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
        <div className="w-68 flex justify-center">{error && <Alert message={error} />}</div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  onChange={onChange}
                  id="username"
                  name="username"
                  type="text"
                  value={form?.username}
                  required
                  className="block w-full rounded-md border-0 py-1 5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email Address
              </label>
              <div className="mt-2">
                <input
                  onChange={onChange}
                  id="email"
                  name="email"
                  type="email"
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  onChange={onChange}
                  value={form.passwordConfirm}
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
            Already A Member?{" "}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Signin now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
