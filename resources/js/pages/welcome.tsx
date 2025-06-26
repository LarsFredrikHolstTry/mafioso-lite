import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import * as motion from 'motion/react-client';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Hjem">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('crime')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Hjem
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Logg inn
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Registrer
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <div className="flex w-full flex-col items-center justify-center gap-2 lg:max-w-4xl">
                        <motion.img
                            initial={{ filter: 'blur(10px)', scale: 0.8 }}
                            animate={{ filter: 'blur(0)', scale: 1, transition: { duration: 0.5 } }}
                            src="/images/logo.png"
                            alt="Mafioso Logo"
                            className="mb-4"
                            style={{ width: '54px', height: '54px', objectFit: 'cover' }}
                        />
                        <motion.h1
                            initial={{ filter: 'blur(10px)' }}
                            animate={{ filter: 'blur(0)', scale: 1, transition: { duration: 0.8 } }}
                            className="text-3xl leading-tight font-semibold tracking-tight text-[#2cb7c8] lg:text-6xl dark:text-[#EDEDEC]"
                        >
                            <span className="amoria-font text-[#2cb7c8]">MAFIOSO</span>
                        </motion.h1>
                        <motion.p
                            initial={{ filter: 'blur(10px)' }}
                            animate={{ filter: 'blur(0)', scale: 1, transition: { duration: 1 } }}
                            className="mb-5 text-sm text-[#1b1b18] lg:text-base dark:text-[#EDEDEC]"
                        >
                            Ditt mafiaspill på nett
                        </motion.p>
                    </div>
                </div>
            </div>
        </>
    );
}
