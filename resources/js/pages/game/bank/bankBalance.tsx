import { useBankMutations } from '@/api/update';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { numberWithSpaces } from '@/lib/utils';
import NumberFlow from '@number-flow/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const toastErrorOptions = (withAction?: boolean, position?: 'top-center' | 'bottom-center') => {
    const showAction = withAction === undefined ? true : withAction;
    return {
        style: {
            borderColor: 'oklab(0.7 0.18 0.07 / 0.9)',
        },
        position: position || ('top-center' as const),
        ...(showAction && {
            action: {
                label: 'X',
                onClick: () => {},
            },
        }),
    };
};

export const BankBalance = () => {
    const [amount, setAmount] = useState<number | string>('');
    const { depositMutation, withdrawMutation } = useBankMutations();

    const { data: balanceData, isLoading: isBalanceLoading } = useQuery({
        queryKey: ['balance'],
        queryFn: async () => {
            const res = await fetch('/api/user/balance');
            return res.json();
        },
    });

    const [money, setMoney] = useState<number>(balanceData?.money ?? 0);
    const [bankMoney, setBankMoney] = useState<number>(balanceData?.bankmoney ?? 0);

    useEffect(() => {
        if (balanceData) {
            setMoney(balanceData.money);
            setBankMoney(balanceData.bankmoney);
        }
    }, [balanceData]);

    const handleDeposit = () => {
        const rawAmount =
            typeof amount === 'string' ? parseInt(amount.replace(/\s/g, ''), 10) : amount;

        if (!rawAmount || rawAmount < 1) {
            toast('Ugyldig beløp', toastErrorOptions());
            return;
        }

        if (rawAmount > money) {
            toast('Du kan ikke sette inn mer enn du har på hånden', toastErrorOptions());
            return;
        }

        depositMutation.mutate(rawAmount, {
            onError: (error) => {
                toast(error?.message || 'Noe gikk galt. Prøv igjen.', toastErrorOptions());
            },
            onSuccess: (data) => {
                if (data.error) {
                    toast(data.error, toastErrorOptions());
                }
            },
        });
    };

    const handleWithdraw = () => {
        const rawAmount =
            typeof amount === 'string' ? parseInt(amount.replace(/\s/g, ''), 10) : amount;

        if (!rawAmount || rawAmount < 1) {
            toast('Ugyldig beløp', toastErrorOptions());
            return;
        }

        if (rawAmount > bankMoney) {
            toast('Du kan ikke ta ut mer enn du har i banken', toastErrorOptions());
            return;
        }

        withdrawMutation.mutate(rawAmount, {
            onError: (error) => {
                toast(error?.message || 'Noe gikk galt. Prøv igjen.', toastErrorOptions());
            },
            onSuccess: (data) => {
                if (data.error) {
                    toast(data.error, toastErrorOptions());
                }
            },
        });
    };

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value.replace(/\s/g, '');
        if (!/^\d*$/.test(rawValue)) {
            toast('Vennligst oppgi et gyldig tall', toastErrorOptions());
            return;
        }

        setAmount(numberWithSpaces(rawValue));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Banken i Medellin</h1>
            <h2>
                {isBalanceLoading ? (
                    <Skeleton className="mt-1 h-[20px] w-[250px] rounded-full" />
                ) : (
                    <NumberFlow prefix={'Penger på hånden: '} suffix={',-'} value={money} />
                )}
            </h2>
            <h2>
                {isBalanceLoading ? (
                    <Skeleton className="mt-1 h-[20px] w-[250px] rounded-full" />
                ) : (
                    <NumberFlow prefix={'Penger i banken: '} suffix={',-'} value={bankMoney} />
                )}
            </h2>
            <div className="flex flex-row items-center gap-2">
                <Input
                    className="my-4"
                    type="text"
                    value={amount}
                    onChange={(event) => handleInput(event)}
                    placeholder="Skriv inn beløp"
                />
                <Button onClick={handleDeposit}>Sett inn</Button>
                <Button onClick={handleWithdraw}>Ta ut</Button>
            </div>
        </div>
    );
};
