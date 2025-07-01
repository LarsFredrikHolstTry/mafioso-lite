import { AppFooter } from '@/components/app-footer';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Bank',
        href: '/bank',
    },
];

export default function Bank() {
    const [money, setMoney] = useState(0);
    const [bankMoney, setBankMoney] = useState(0);
    const [amount, setAmount] = useState(0);

    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    useEffect(() => {
        fetch('/api/user/balance')
            .then((response) => response.json())
            .then((data) => {
                setMoney(data.money);
                setBankMoney(data.bankmoney);
            });
    }, []);

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
                setMoney(data.money);
                setBankMoney(data.bankmoney);
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
                setMoney(data.money);
                setBankMoney(data.bankmoney);
            });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Bank" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="p-4">
                        <h2>Current Money: ${money}</h2>
                        <h2>Bank Money: ${bankMoney}</h2>
                        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Enter amount" />
                        <button onClick={handleDeposit}>Deposit</button>
                        <button onClick={handleWithdraw}>Withdraw</button>
                    </div>
                </div>
                <AppFooter />
            </div>
        </AppLayout>
    );
}
