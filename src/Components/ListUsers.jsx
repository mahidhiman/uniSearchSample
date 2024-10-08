import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PocketbaseContext } from "../App";

const ListUsers = () => {
  const navigate = useNavigate();
  const [leeds, setLeeds] = useState([]);
  const pb = useContext(PocketbaseContext);

  const viewLeed = (id) => {
    navigate("/user/" + id);
  };

  const addUser = () => {
    navigate("/newLead");
  };

  useState(() => {
    let fetchLeads = async () => {
      let results = await pb.collection("users").getFullList({});
      setLeeds(results);

      console.log(results);
    };

    fetchLeads();
  }, []);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Leeds</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the Leeds in your account including their name, title, email and status.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={addUser}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Leed
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Id
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leeds.map((leed) => (
                    <tr key={leed.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{leed.id}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{leed.Username}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{leed.Phone}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{leed.email}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button onClick={() => viewLeed(leed.id)}>
                          <a className="text-indigo-600 hover:text-indigo-900">
                            View<span className="sr-only">, {leed.name}</span>
                          </a>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListUsers;
