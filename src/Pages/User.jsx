import { Button } from "@headlessui/react";
import { PaperClipIcon, ChevronLeftIcon, TrashIcon, DocumentPlusIcon } from "@heroicons/react/20/solid";
import { useState, useContext, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { PocketbaseContext } from "../App";
import AddComment from "../Components/AddComment";
//  {
//       "id": "RECORD_ID",
//       "collectionId": "qecj7q7ui221wx6",
//       "collectionName": "Leeds",
//       "created": "2022-01-01 01:00:00.123Z",
//       "updated": "2022-01-01 23:59:59.456Z",
//       "Username": "test",
//       "Email": "test@example.com",
//       "Phone": 123,
//       "Password": "test",
//       "field": [
//         "RELATION_RECORD_ID"
//       ],
//       "Payment": true,
//       "Documents": [
//         "filename.jpg"
//       ]
//     }

export default function User() {
  const pb = useContext(PocketbaseContext);
  const docInputRef = useRef();
  const [userData, setUserdata] = useState({
    id: "",
    collectionName: "Leads",
    created: "",
    updated: "",
    Username: "",
    Email: "",
    Phone: "",
    Password: "",
    Courses: [],
    Payment: false,
    Documents: [],
  });
  const { id } = useParams();

  const [comments, setComments] = useState([]);

  useEffect(() => {
    let fetchUserData = async () => {
      let data = await pb.collection("users").getOne(id);

      setUserdata(data);
    };

    fetchUserData();

    let fetchComments = async () => {
      let data = await pb.collection("Comments").getFullList({
        sort: "-created",
      });

      console.log(data);

      data = data.filter((comment) => comment.user == id);

      console.log(data);

      setComments(data);
    };

    fetchComments();
  }, [id, pb]);

  const onChange = async (e) => {
    const formData = new FormData();

    formData.append("Username", userData["Username"]);
    formData.append("Email", userData["Email"]);
    formData.append("Phone", userData["Phone"]);

    for (let i of docInputRef.current.files) {
      formData.append("Documents", i);
    }

    const record = await pb.collection("leeds").update(id, formData);

    setUserdata(record);
  };

  const deleteFile = async (e) => {
    const newRecord = await pb.collection("Leeds").update(id, {
      "Documents-": [e.currentTarget.id],
    });

    console.log(newRecord);

    setUserdata(newRecord);
  };

  return (
    <div className="m-10">
      <div className="flex flex-1 items-center">
        <Link to="/">
          <ChevronLeftIcon aria-hidden="true" className="h-10 w-10 flex-shrink-0 text-gray-400" />
        </Link>

        <div className="py-4  sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userData.Username}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Application Phone</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userData.Phone}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userData.Email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Salary expectation</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">$120,000</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">About</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum
              aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad
              adipisicing reprehenderit deserunt qui eu.
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                {(userData.Documents || ("No ducments to show" && false)) &&
                  userData.Documents?.map((document) => (
                    <li key={document} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">{document}</span>
                          <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0 flex ">
                        <Button>
                          <a
                            href={`http://localhost:8090/api/files/${userData.collectionName}/${id}/${document}?download=1`}
                            download
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Download
                          </a>
                        </Button>
                        <div id={document} onClick={deleteFile}>
                          <TrashIcon className="h-5 w-5 ml-2 flex-shrink-0 text-red-700" />
                        </div>
                      </div>
                    </li>
                  ))}
                <li className="flex items-center justify-center py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed "
                    >
                      <div className="flex items-center justify-center pt-5 pb-6">
                        <p className="mr-2">Add more documents Drag-&-Drop</p>
                        <DocumentPlusIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                      </div>
                      <input onChange={onChange} ref={docInputRef} id="dropzone-file" type="file" className="hidden" />
                    </label>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Comments</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                {comments &&
                  comments?.map((comment) => (
                    <li className="flex items-center justify-start py-2 pl-2 pr-2 text-sm leading-6" key={comment?.id}>
                      {comment.Comment}
                    </li>
                  ))}
                <li className="flex items-center justify-center w-full py-4 pl-4 pr-5 text-sm leading-6">
                  <AddComment id={id} setComments={setComments} />
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
