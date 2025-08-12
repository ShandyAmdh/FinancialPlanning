import ChartFS from '@/Components/Chart/ChartFS';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/Layouts/AppLayout';
import { useState } from 'react';

export default function FinancialSuggestion() {
    const [status, setStatus] = useState('single');
    const [salary, setSalary] = useState('');
    const [children, setChildren] = useState(0);
    const [result, setResult] = useState([]);

    const handleCalculate = () => {
        if (!salary || salary < 1) return alert('Masukkan gaji yang valid');

        let suggestion = [];

        if (status === 'single') {
            suggestion = [
                { label: 'Kebutuhan Pokok', percent: 50 },
                { label: 'Keinginan', percent: 20 },
                { label: 'Tabungan Darurat', percent: 15 },
                { label: 'Investasi', percent: 15 },
            ];
        } else {
            if (children === 0) {
                suggestion = [
                    { label: 'Kebutuhan Pokok', percent: 55 },
                    { label: 'Keinginan', percent: 15 },
                    { label: 'Tabungan Darurat', percent: 15 },
                    { label: 'Investasi', percent: 15 },
                ];
            } else if (children === 1) {
                suggestion = [
                    { label: 'Kebutuhan Pokok', percent: 65 },
                    { label: 'Keinginan', percent: 7 },
                    { label: 'Tabungan Darurat', percent: 15 },
                    { label: 'Investasi', percent: 8 },
                ];
            } else if (children === 2) {
                suggestion = [
                    { label: 'Kebutuhan Pokok', percent: 70 },
                    { label: 'Keinginan', percent: 5 },
                    { label: 'Tabungan Darurat', percent: 15 },
                    { label: 'Investasi', percent: 5 },
                ];
            } else {
                suggestion = [
                    { label: 'Kebutuhan Pokok', percent: 75 },
                    { label: 'Keinginan', percent: 5 },
                    { label: 'Tabungan Darurat', percent: 17 },
                    { label: 'Investasi', percent: 3 },
                ];
            }
        }

        const resultData = suggestion.map((item) => ({
            label: item.label,
            percent: item.percent,
            amount: Math.round((item.percent / 100) * salary),
        }));

        setResult(resultData);
    };

    return (
        <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Saran Keuangan</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label>Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="single">Single</SelectItem>
                                <SelectItem value="married">Menikah</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {status === 'married' && (
                        <div className="grid gap-2">
                            <Label>Jumlah Anak</Label>
                            <Input
                                type="number"
                                min={0}
                                value={children}
                                onChange={(e) => setChildren(Number(e.target.value))}
                            />
                        </div>
                    )}

                    <div className="grid gap-2">
                        <Label>Gaji (Rp)</Label>
                        <Input
                            type="number"
                            value={salary}
                            onChange={(e) => {
                                const val = e.target.value;
                                setSalary(val === '' ? '' : parseInt(val));
                            }}
                        />
                    </div>

                    <Button onClick={handleCalculate} className="bg-emerald-500 font-bold">
                        Tampilkan Saran
                    </Button>
                </CardContent>
            </Card>

            {result.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Hasil Saran</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="w-full overflow-hidden">
                            <ChartFS data={result} />
                        </div>

                        <ul className="space-y-2">
                            {result.map((item, index) => (
                                <li key={index} className="border-b pb-1 text-sm sm:text-base">
                                    <strong>{item.label}</strong>: {item.percent}% → Rp{' '}
                                    {item.amount.toLocaleString('id-ID')}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

FinancialSuggestion.layout = (page) => <AppLayout title="Saran Keuangan" children={page} />;
