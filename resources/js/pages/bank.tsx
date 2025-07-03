import { AppFooter } from '@/components/app-footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Skeleton } from '@/components/ui/skeleton';
import AppLayout from '@/layouts/app-layout';
import { numberWithSpaces } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

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

    const money = balanceData?.money ?? 0;
    const bankMoney = balanceData?.bankmoney ?? 0;

    const handleDeposit = () => {
        fetch('/api/user/deposit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token ?? '',
            },
            body: JSON.stringify({ amount }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (!!data.error) {
                    toast(data.error, {});
                    return;
                }
                refetchBalance();
            });
    };

    const handleWithdraw = () => {
        fetch('/api/user/withdraw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token ?? '',
            },
            body: JSON.stringify({ amount }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (!!data.error) {
                    toast(data.error, {});
                    return;
                }
                refetchBalance();
            });
    };

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value.replace(/\s/g, '');
        if (!/^\d*$/.test(rawValue)) {
            toast('Vennligst oppgi et gyldig tall', {
                description: 'Kun sifre er tillatt',
                style: {
                    color: 'oklab(0.7 0.18 0.07 / 0.9)',
                },
                position: 'top-center',
                action: {
                    label: 'Ok',
                    onClick: () => {},
                },
            });
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
                                    <span>Penger på hånden: {money},-</span>
                                )}
                            </h2>
                            <h2>
                                {isBalanceLoading ? (
                                    <Skeleton className="mt-1 h-[20px] w-[250px] rounded-full" />
                                ) : (
                                    <span>Penger i banken: {bankMoney},-</span>
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
