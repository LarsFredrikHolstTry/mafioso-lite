import { AppFooter } from '@/components/app-footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Skeleton } from '@/components/ui/skeleton';
import AppLayout from '@/layouts/app-layout';
import { numberWithSpaces } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import NumberFlow from '@number-flow/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const toastErrorOptions = {
    style: {
        color: 'oklab(0.7 0.18 0.07 / 0.9)',
    },
    position: 'top-center' as const,
    action: {
        label: 'Ok',
        onClick: () => {},
    },
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Bank',
        href: '/bank',
    },
];

export default function Bank() {
    const [amount, setAmount] = useState<number | string>('');
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const {
        data: balanceData,
        refetch: refetchBalance,
        isLoading: isBalanceLoading,
    } = useQuery({
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
            toast('Ugyldig beløp', toastErrorOptions);
            return;
        }

        if (rawAmount > money) {
            toast('Du kan ikke sette inn mer enn du har på hånden', toastErrorOptions);
            return;
        }

        const prevMoney = money;
        const prevBankMoney = bankMoney;
        setMoney(money - rawAmount);
        setBankMoney(bankMoney + rawAmount);

        fetch('/api/user/deposit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token ?? '',
            },
            body: JSON.stringify({ amount: rawAmount }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (!!data.error) {
                    setMoney(prevMoney);
                    setBankMoney(prevBankMoney);
                    toast(data.error, toastErrorOptions);
                    return;
                }
            })
            .catch(() => {
                setMoney(prevMoney);
                setBankMoney(prevBankMoney);
                toast('Noe gikk galt. Prøv igjen.', toastErrorOptions);
            });
    };

    const handleWithdraw = () => {
        const rawAmount =
            typeof amount === 'string' ? parseInt(amount.replace(/\s/g, ''), 10) : amount;

        if (!rawAmount || rawAmount < 1) {
            toast('Ugyldig beløp', toastErrorOptions);
            return;
        }

        if (rawAmount > bankMoney) {
            toast('Du kan ikke ta ut mer enn du har i banken', toastErrorOptions);
            return;
        }

        const prevMoney = money;
        const prevBankMoney = bankMoney;
        setMoney(money + rawAmount);
        setBankMoney(bankMoney - rawAmount);

        fetch('/api/user/withdraw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token ?? '',
            },
            body: JSON.stringify({ amount: rawAmount }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (!!data.error) {
                    setMoney(prevMoney);
                    setBankMoney(prevBankMoney);
                    toast(data.error, toastErrorOptions);
                    return;
                }
            })
            .catch(() => {
                setMoney(prevMoney);
                setBankMoney(prevBankMoney);
                toast('Noe gikk galt. Prøv igjen.', toastErrorOptions);
            });
    };

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value.replace(/\s/g, '');
        if (!/^\d*$/.test(rawValue)) {
            toast('Vennligst oppgi et gyldig tall', toastErrorOptions);
            return;
        }

        setAmount(numberWithSpaces(rawValue));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Bank" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="p-4">
                            <h1 className="text-2xl font-bold">Banken i Medellin</h1>
                            <h2>
                                {isBalanceLoading ? (
                                    <Skeleton className="mt-1 h-[20px] w-[250px] rounded-full" />
                                ) : (
                                    <NumberFlow
                                        prefix={'Penger på hånden: '}
                                        suffix={',-'}
                                        value={money}
                                    />
                                )}
                            </h2>
                            <h2>
                                {isBalanceLoading ? (
                                    <Skeleton className="mt-1 h-[20px] w-[250px] rounded-full" />
                                ) : (
                                    <NumberFlow
                                        prefix={'Penger i banken: '}
                                        suffix={',-'}
                                        value={bankMoney}
                                    />
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
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
                <AppFooter />
            </div>
        </AppLayout>
    );
}
