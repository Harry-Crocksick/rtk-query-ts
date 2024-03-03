import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TodoTypes } from "../lib/types";

export const todoApiSlice = createApi({
	reducerPath: "",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8080",
	}),
	tagTypes: ['todos'],
	endpoints: (builder) => ({
		//                      ReturnType, QueryArgType
		//                          v           v
		getTodos: builder.query<TodoTypes[], void>({
			query: () => "/todos",
			// transformResponse: (response: { data: TodoTypes[] }, _meta, _arg) => response.data,
			// transformErrorResponse: (response: { status: string | number }, _meta, _arg) => response.status,
			providesTags: ['todos']
			/*
			  providesTags & invalidatesTags signatures (can be any one of belows)
			  - ['todo']
			  - [{type: 'todo'}]
			  - [{type: 'todo', id: 1}]
			  - (result, error, queryArg) => ['todo']
			  - (result, error, queryArg) => [{type: 'todo'}]
			  - (result, error, queryArg) => [{type: 'todo', id: 1}]
			*/
		}),
		getEachPost: builder.query<TodoTypes, string>({
			query: (id) => `/todos/${id}`,
			providesTags: ['todos']
		}),
	}),
});

export const { 
	useGetTodosQuery, 
	useGetEachPostQuery 
} = todoApiSlice;
