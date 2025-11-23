import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddContent({ materiaId, keyName, addFn }) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newItem) => addFn(newItem),

        onMutate: async (newItem) => {
            const queryKey = ["content", materiaId];

            await queryClient.cancelQueries(queryKey);

            const previousData = queryClient.getQueryData(queryKey);

            queryClient.setQueryData(queryKey, (old) => {
                if (!old) return old;

                return {
                    ...old,
                    [keyName]: {
                        ...old[keyName],
                        data: [
                            ...old[keyName].data,
                            {
                                ...newItem,
                                id: crypto.randomUUID(),
                                _optimistic: true
                            }
                        ]
                    }
                };
            });

            return { previousData };
        },

        onError: (err, _vars, context) => {
            console.error("ADD ERROR:", err);
            queryClient.setQueryData(["content", materiaId], context.previousData);
        },

        onSuccess: (createdItem) => {
            queryClient.setQueryData(["content", materiaId], (old) => {
                return {
                    ...old,
                    [keyName]: {
                        ...old[keyName],
                        data: old[keyName].data.map(item =>
                            item._optimistic
                                ? createdItem
                                : item
                        )
                    }
                };
            });
        },

        onSettled: () => {
            queryClient.invalidateQueries(["content", materiaId]);
        }
    });
}