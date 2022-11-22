import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const resourceApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api/resources' }),
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => '',
    }),
    // createOne:
    // updateOne:
    // deleteOne:
  }),
})

// Export hooks for usage in functional components
export const { useGetAllQuery } = resourceApi;
