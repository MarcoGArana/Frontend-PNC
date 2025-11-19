import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteContent({ materiaId, keyName, deleteFn }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteFn(id),

        onMutate: async ({ id }) => {
            const queryKey = ["content", materiaId];

            await queryClient.cancelQueries(queryKey);

            const previousData = queryClient.getQueryData(queryKey);

            queryClient.setQueryData(queryKey, (old) => {
                return {
                    ...old,
                    [keyName]: {
                        ...old[keyName],
                        data: old[keyName].data.filter(item => item.id !== id),
                    },
                };
            });

            return { previousData };
        },

        onError: (err, _vars, context) => {
            console.error("Delete error:", err);
            queryClient.setQueryData(["content", materiaId], context.previousData);
        },

        onSettled: () => {
            queryClient.invalidateQueries(["content", materiaId]);
        }
    });
}
