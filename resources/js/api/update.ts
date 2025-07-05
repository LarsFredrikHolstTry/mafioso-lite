import { useMutation, useQueryClient } from '@tanstack/react-query';

const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

const method = 'POST';
const headers = {
    'Content-Type': 'application/json',
    'X-CSRF-TOKEN': token ?? '',
};

export function useBankMutations() {
    const queryClient = useQueryClient();

    const depositMutation = useMutation({
        mutationFn: async (amount: number) => {
            const res = await fetch('/api/user/deposit', {
                method,
                headers,
                body: JSON.stringify({ amount }),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['balance'] });
        },
    });

    const withdrawMutation = useMutation({
        mutationFn: async (amount: number) => {
            const res = await fetch('/api/user/withdraw', {
                method,
                headers,
                body: JSON.stringify({ amount }),
            });
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['balance'] });
        },
    });

    return { depositMutation, withdrawMutation };
}
