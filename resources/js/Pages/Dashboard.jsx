import CardStatTwo from '@/Components/CardStatTwo';
import BarChartCustom from '@/Components/Chart/BarChartCustom';
import PieChartCustom from '@/Components/Chart/PieChartCustom';
import EmptyState from '@/Components/EmptyState';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/Components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Progress } from '@/Components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import AppLayout from '@/Layouts/AppLayout';
import { formatToRupiah } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { IconDoorEnter, IconDoorExit, IconMenorah, IconMoneybag } from '@tabler/icons-react';

export default function Dashboard(props) {
    const auth = usePage().props.auth || {};
    const user = auth.user || {};
    const { budgets, chartConfigBudget } = props.budgetChart;

    return (
        <div className="flex w-full flex-col gap-y-4 pb-32">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={route('dashboard')}>Cuan+</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-row items-center justify-between gap-2 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-500 to-yellow-100 p-6 text-white">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-medium leading-relaxed">Hi, {user.name || 'User'}</h2>
                    <p className="text-sm">
                        Selamat datang di <span className="font-bold">CuanPlanner</span> atur keuangan anda dengan baik
                        demi masa depan yang cerah.
                    </p>
                </div>
                <Avatar>
                    <AvatarImage src={user.avatar || ''} />
                    <AvatarFallback>{(user.name && user.name.substring(0, 1)) || '?'}</AvatarFallback>
                </Avatar>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="col-span-full space-y-6 lg:col-span-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="col-span-1">
                            <CardStatTwo
                                data={{
                                    title: 'Pemasukan',
                                    description: 'Total Pemasukan yang diterima pada tahun ini',
                                    icon: IconDoorEnter,
                                    background: 'text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-500',
                                    iconClassName: 'text-white',
                                }}
                            >
                                <div className="ml-12 text-2xl font-bold">{formatToRupiah(props.sum.incomeSum)}</div>
                            </CardStatTwo>
                        </div>

                        <div className="col-span-1">
                            <CardStatTwo
                                data={{
                                    title: 'Pengeluaran',
                                    description: 'Total Pengeluaran pada tahun ini',
                                    icon: IconDoorExit,
                                    background: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-500',
                                    iconClassName: 'text-white',
                                }}
                            >
                                <div className="ml-12 text-2xl font-bold">{formatToRupiah(props.sum.expenseSum)}</div>
                            </CardStatTwo>
                        </div>

                        <div className="col-span-1">
                            <CardStatTwo
                                data={{
                                    title: 'Tabungan',
                                    description: 'Total tabungan pada tahun ini',
                                    icon: IconMoneybag,
                                    background:
                                        'text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-500',
                                    iconClassName: 'text-white',
                                }}
                            >
                                <div className="ml-12 text-2xl font-bold">{formatToRupiah(props.sum.balanceSum)}</div>
                            </CardStatTwo>
                        </div>

                        <div className="col-span-1">
                            <CardStatTwo
                                data={{
                                    title: 'Kekayaan Bersih',
                                    description: 'Total kekayaan bersih pada tahun ini',
                                    icon: IconMenorah,
                                    background: 'text-white bg-gradient-to-r from-sky-400 via-sky-500 to-sky-500',
                                    iconClassName: 'text-white',
                                }}
                            >
                                <div className="ml-12 text-2xl font-bold">
                                    {formatToRupiah(props.sum.netWorthSum)}
                                    <span className="text-xs"> (aset - kewajiban)</span>
                                </div>
                            </CardStatTwo>
                        </div>
                    </div>
                    <BarChartCustom
                        title="Pemasukan vs Pengeluaran"
                        year={props.year}
                        chartData={props.incomeExpenseChart}
                    />
                </div>
                {/* TABS DAN PIECHART */}
                <div className="col-span-full space-y-6 lg:col-span-4">
                    {/* Tabs */}
                    <Tabs defaultValue="goal">
                        <TabsList>
                            <TabsTrigger value="goal">Tujuan</TabsTrigger>
                            <TabsTrigger value="income">Pemasukan</TabsTrigger>
                            <TabsTrigger value="expense">Pengeluaran</TabsTrigger>
                        </TabsList>
                        <TabsContent value="goal">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Tujuan</CardTitle>
                                    <CardDescription>
                                        Wujudkan impian dengan menabung, Langkah kecil menuju cita-cita besar
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {props.goals.length == 0 ? (
                                        <EmptyState
                                            icon={IconMoneybag}
                                            title="Tidak ada tujuan"
                                            subtitle="Mulailah dengan membuat tujuan baru"
                                        />
                                    ) : (
                                        <div>
                                            {props.goals.map((goal, index) => (
                                                <div
                                                    key={index}
                                                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                                >
                                                    <span className="flex h-2 w-2 translate-y-2 rounded-full bg-emerald-500" />
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium leading-none">{goal.name}</p>
                                                        <p className="text-sm font-medium text-emerald-400">
                                                            {formatToRupiah(
                                                                Number(goal.balances_sum_amount) +
                                                                    Number(goal.beginning_balance),
                                                            )}

                                                            <span className="text-muted-foreground">
                                                                / {formatToRupiah(goal.nominal)}
                                                            </span>
                                                        </p>

                                                        <Progress value={goal.percentage}></Progress>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="income">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pemasukan</CardTitle>
                                    <CardDescription>Pemasukan Terakhir Kamu</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {props.incomes.length == 0 ? (
                                        <EmptyState
                                            icon={IconDoorEnter}
                                            title="Tidak ada pemasukan"
                                            subtitle="Mulailah dengan membuat pemasukan baru"
                                        />
                                    ) : (
                                        <div>
                                            {props.incomes.map((income, index) => (
                                                <div
                                                    key={index}
                                                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                                >
                                                    <span className="flex h-2 w-2 translate-y-2 rounded-full bg-emerald-500" />
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium leading-none">
                                                            {income.source.detail} - {income.source.type}
                                                        </p>
                                                        <p className="text-sm font-medium text-emerald-400">
                                                            {formatToRupiah(income.nominal)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="expense">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pengeluaran</CardTitle>
                                    <CardDescription>Pengeluaran Terakhir Kamu</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {props.expenses.length == 0 ? (
                                        <EmptyState
                                            icon={IconDoorExit}
                                            title="Tidak ada pengeluaran"
                                            subtitle="Mulailah dengan membuat pengeluaran baru"
                                        />
                                    ) : (
                                        <div>
                                            {props.expenses.map((expense, index) => (
                                                <div
                                                    key={index}
                                                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                                >
                                                    <span className="flex h-2 w-2 translate-y-2 rounded-full bg-emerald-500" />
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium leading-none">
                                                            {expense.description} - {expense.type}
                                                        </p>
                                                        <p className="text-sm font-medium text-emerald-400">
                                                            {formatToRupiah(expense.nominal)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                    {/* PIE CHART */}
                    <PieChartCustom
                        title="Anggaran"
                        year={props.year}
                        budgets={budgets}
                        chartConfig={chartConfigBudget}
                    />
                </div>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <AppLayout title="Dashboard" children={page} />;
