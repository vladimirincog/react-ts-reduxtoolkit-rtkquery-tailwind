import React, { useEffect, useState } from "react";
import { RepCard } from "../components/RepCard";
import { useDebounce } from "../hooks/debounce";
import { useLazyGetUserReposQuery, useSearchUsersQuery } from "../store/gihub/github.api";

export function HomePage() {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    //data = data: users - переименование data в users
    skip: debounced.length < 3,
    refetchOnFocus: true // при переключении вкладки отрпавляется запрос
  });
  const [fetchRepos, {isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery(); // смотреть комент с data

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0);
    // console.log(debounced);
  }, [debounced, data]);

  const clickUser = (login: string) => {
    fetchRepos(login);
    setDropdown(false);
  }

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-scren">
      {isError && <p className="text-center text-red-600"> Error response</p>}
      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search"
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
        />

        {
          dropdown &&
          <ul className="list-none absolute top-[42px] overflow-y-scroll left-0 right-0 max-h[200px] shadow-md bg-white">
          {isLoading && <p className="text-center">Loading...</p>}
          {data?.map((user) => {
            return (
              <li
                key={user.id}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                onClick={() => clickUser(user.login)}
              >
                {user.login}
              </li>
            );
          })}
        </ul>
        }
        <div className="repos-container">
          { areReposLoading && <p className="text-center">Repos are loading...</p> }
          { repos?.map((repo) => {
              return (
                <RepCard key={repo.id} repo={repo}/>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}
