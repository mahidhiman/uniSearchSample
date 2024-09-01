import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon, FunnelIcon, GlobeAmericasIcon, EnvelopeOpenIcon } from "@heroicons/react/20/solid";
import pb from "./Pockebase";

const ListCourses = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const staticData = [];
  const [courses, setCourses] = useState([
    {
      university: {
        name: "Essex",
      },
      id: 1,
      coursename: "MSc Management",
      country: "United kingdom",
      requirements: {
        IELTS: {
          reading: 6,
          writing: 6,
          speaking: 6,
          listening: 6,
          overall: 6.5,
        },
        scores: 60,
      },
      fee: 20000,
      scholorships: "",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      link: "",
    },
  ]);
  const [ielts, setIelts] = useState({
    w: 0,
    r: 0,
    s: 0,
    l: 0,
    o: 0,
  });

  useEffect(() => {
    pb.collection("courses")
      .getFullList({ expand: "university, requirements, requirements.ielts" })
      .then((res) => {
        setCourses(
          res.map((i) => {
            return {
              university: {
                name: i.expand.university.name,
              },
              id: i.id,
              coursename: i.coursename,
              country: i.country,
              requirements: {
                IELTS: {
                  reading: i.expand.requirements.expand.ielts.reading,
                  writing: i.expand.requirements.expand.ielts.writing,
                  speaking: i.expand.requirements.expand.ielts.speaking,
                  listening: i.expand.requirements.expand.ielts.listening,
                  overall: i.expand.requirements.expand.ielts.overall,
                },
                scores: i.expand.requirements.Scores,
              },
              fee: i.fee,
              imageUrl:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",

              scholorships: "",
              link: "",
            };
          })
        );
      });
  }, [staticData]);

  const onChange = (e) => {
    setIelts((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const onCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const search = () => {};

  return (
    <div>
      <label htmlFor="search" className="block text-sm font-medium leading-6 text-gray-900">
        Quick search
      </label>
      <div className="relative mt-2 flex items-center">
        <input
          id="search"
          name="search"
          type="text"
          className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">⌘K</kbd>
        </div>
      </div>
      <div className="flex w-full justify-between ">
        <Button
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          className="group text-gray-800 text-sm font-semibold leading-6 transition duration-300 border rounded-lg border-black border-solid my-2 px-2 py-2 hover:bg-indigo-500 hover:text-white hover:border-none"
        >
          <span className="flex flex-row items-center">
            Filter{" "}
            <FunnelIcon aria-hidden="true" className="h-4 w-4 ml-4 text-center shrink-0 text-gray-900 group-hover:text-white" />
          </span>
        </Button>
        <Button
          onClick={search}
          className="group text-sm text-gray-800 font-semibold leading-6 transition duration-300  border rounded-lg border-solid border-black my-2 px-2 py-2 hover:bg-indigo-500 hover:text-white hover:border-none"
        >
          <span className=" flex flex-row items-center">
            Search{" "}
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="h-4 w-4 ml-4 text-center shrink-0 text-gray-900 group-hover:text-white"
            />
          </span>
        </Button>
      </div>
      {
        <div
          className={`flex  transition-all delay-500  w-auto h-68 border-spacing-5 border-2 border-gray-300 border-solid ${
            open ? "" : "hidden"
          }`}
        >
          <form className="flex flex-col w-full">
            <div className="inline-flex justify-around items-center m-2 rounded-md">
              <div>
                <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  defaultValue="Canada"
                  onChange={onCountryChange}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option>United Kingdome</option>
                  <option>Canada</option>
                </select>
              </div>
              <div className="m-4">
                <h2>IELTS</h2>
                <div className="flex flex-row justify-center items-center">
                  <label htmlFor="r">R</label>
                  <input
                    onChange={onChange}
                    id="r"
                    value={ielts.r}
                    type="number"
                    className="m-2 w-20 h-7 wr-2 border-gray-600 rounded-md"
                    min={5}
                    max={9}
                  />
                  <label htmlFor="s">S</label>
                  <input
                    onChange={onChange}
                    id="s"
                    value={ielts.s}
                    type="number"
                    className="m-2 w-20 h-7 wr-2 border-gray-600 rounded-md"
                    min={5}
                    max={9}
                  />
                  <label htmlFor="l">L</label>
                  <input
                    onChange={onChange}
                    id="l"
                    value={ielts.l}
                    type="number"
                    className="m-2 w-20 h-7 wr-2 border-gray-600 rounded-md"
                    min={5}
                    max={9}
                  />
                  <label htmlFor="w">W</label>
                  <input
                    onChange={onChange}
                    id="w"
                    value={ielts.w}
                    type="number"
                    className="m-2 w-20 h-7 wr-2 border-gray-600 rounded-md"
                    min={5}
                    max={9}
                  />
                  <label htmlFor="o">O</label>
                  <input
                    onChange={onChange}
                    id="o"
                    value={ielts.o}
                    type="number"
                    className="m-2 w-20 h-7 wr-2 border-gray-600 rounded-md"
                    min={5}
                    max={9}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      }
      <div>
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <>
              <li key={course.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                <div className="flex w-full items-center justify-between space-x-6 p-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="truncate text-sm font-medium text-gray-900">{course.university?.name}</h3>
                      <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        £{course.fee}
                      </span>
                    </div>
                    <p className="mt-3 truncate text-sm text-gray-500">{course.coursename}</p>
                  </div>
                  <img alt="" src={course.imageUrl} className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" />
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="flex w-0 flex-1">
                      <a
                        href={``}
                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                      >
                        <GlobeAmericasIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                        {course.country}
                      </a>
                    </div>
                    <div className="-ml-px flex w-0 flex-1">
                      <a
                        href={`tel`}
                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                      >
                        <EnvelopeOpenIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                        {course.requirements.scores}%
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListCourses;
