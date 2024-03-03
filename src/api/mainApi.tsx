import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TodoTypes } from "../lib/types";

function providesList<R extends { id: string | number }[], T extends string>(
	resultsWithIds: R | undefined, 
	tagType: T
) {
	return resultsWithIds ? 
		[
			...resultsWithIds.map(({ id }) => ({ type: tagType, id })), 
			{ type: tagType, id: 'LIST' }
		] :
		[{ type: tagType, id: 'LIST' }];
}

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
