import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const resourceApi = createApi({
  reducerPath: 'resourceApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/resources' }),
  tagTypes: ['Resource'],
  endpoints: (builder) => ({
    getAllResources: builder.query({
      query: () => '',
      providesTags: (result) =>
      result
        ? [
            ...result.map(({ id }: { id: number }) => ({ type: 'Resource' as const, id })),
            { type: 'Resource', id: 'LIST' },
          ]
        : [{ type: 'Resource', id: 'LIST' }],
    }),
    createResource: builder.mutation({
      query: (data) => ({
        url: '',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Resource']
    }),
    updateResource: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      /**
       * Give the appearance that the UI has updated
       * even though the request is still in-flight.
       */
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          resourceApi.util.updateQueryData('getAllResources', id, (draft) => {
            Object.assign(draft, patch)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Resource', id }],
    }),
    deleteResource: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Resource', id }],
    })
  }),
})

export const {
  useGetAllResourcesQuery,
  useCreateResourceMutation,
  useUpdateResourceMutation,
  useDeleteResourceMutation
} = resourceApi;
