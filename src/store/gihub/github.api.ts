import { IServerResponse, IUser, IRepo } from "./../../models/models";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// пример работы reduxjs/toolkit
// создание api
export const githubApi = createApi({
  reducerPath: "github/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/",
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    searchUsers: build.query<IUser[], string>({
      // перывй дженерик что мы получаем, второ1 дженерик что мы закидываем в запрос
      query: (search: string) => ({
        url: `search/users`,
        params: {
          q: search,
          per_page: 10,
        },
      }), //'search/users'
      transformResponse: (resp: IServerResponse<IUser>): IUser[] => {
        return resp.items;
      },
    }),
    getUserRepos: build.query<IRepo[], string>({
      query: (login: string) => ({
        url: `users/${login}/repos`,
      }),
    }),
    createUser: build.mutation<any, void>({
      query: () => "",
    }),
  }),
});

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi; //useGetUserReposQuery = useLazyGetUserReposQuery - когда нужно, а не при загрузки страницы
