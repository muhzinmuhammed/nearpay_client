import { api } from "../api";


const userAuth = api.injectEndpoints({

    endpoints: (builder) => ({
        Register: builder.mutation({
            query: (values) => ({
                url: '/v1/auth/register',
                method: 'POST',
                body: values,
            }),

        }),
        Login: builder.mutation({
            query: (values) => ({
                url: '/v1/auth/login',
                method: 'POST',
                body: values,
            }),

        }),
        UserScore: builder.query({
            query: (id) => ({
                url: `/v1/auth/score/${id}`,
                method: 'GET',
            }),
        }),
        UpdateUserScore: builder.mutation({
            query: ({ id, score }) => ({
                url: `/v1/auth/update_score/${id}`,
                method: 'PUT',
                body: { score },
            }),
        }),

    }),
});

export const { useRegisterMutation, useLoginMutation,useUserScoreQuery,useUpdateUserScoreMutation } = userAuth;