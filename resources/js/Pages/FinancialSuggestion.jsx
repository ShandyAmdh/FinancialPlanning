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
    const [familyMembers, setFamilyMembers] = useState(0);
    const [result, setResult] = useState([]);

    // ================================
    // Data mapping dari Excel
    // ================================
    const dataSingle = {
        '<5jt': [
            { label: 'Kebutuhan Pokok', percent: 50 },
            { label: 'Tabungan/Investasi', percent: 10 },
            { label: 'Keinginan', percent: 15 },
            { label: 'Cicilan/Hutang', percent: 15 },
            { label: 'Dana Tak Terduga', percent: 10 },
        ],
        '5-20jt': [
            { label: 'Kebutuhan Pokok', percent: 40 },
            { label: 'Tabungan/Investasi', percent: 15 },
            { label: 'Keinginan', percent: 15 },
            { label: 'Cicilan/Hutang', percent: 15 },
            { label: 'Dana Tak Terduga', percent: 15 },
        ],
        '>20jt': [
            { label: 'Kebutuhan Pokok', percent: 30 },
            { label: 'Tabungan/Investasi', percent: 30 },
            { label: 'Keinginan', percent: 10 },
            { label: 'Cicilan/Hutang', percent: 15 },
            { label: 'Dana Tak Terduga', percent: 15 },
        ],
        '>50jt': [
            { label: 'Kebutuhan Pokok', percent: 10 },
            { label: 'Tabungan/Investasi', percent: 30 },
            { label: 'Keinginan', percent: 15 },
            { label: 'Cicilan/Hutang', percent: 30 },
            { label: 'Dana Tak Terduga', percent: 15 },
        ],
    };

    const dataMarried = {
        '<5jt': [
            { label: 'Kebutuhan Pokok', percent: 50 },
            { label: 'Tabungan/Investasi', percent: 15 },
            { label: 'Keinginan', percent: 10 },
            { label: 'Cicilan/Hutang', percent: 20 },
            { label: 'Dana Tak Terduga', percent: 5 },
        ],
        '5-20jt': [
            { label: 'Kebutuhan Pokok', percent: 40 },
            { label: 'Tabungan/Investasi', percent: 15 },
            { label: 'Keinginan', percent: 15 },
            { label: 'Cicilan/Hutang', percent: 15 },
            { label: 'Dana Tak Terduga', percent: 15 },
        ],
        '>20jt': [
            { label: 'Kebutuhan Pokok', percent: 30 },
            { label: 'Tabungan/Investasi', percent: 30 },
            { label: 'Keinginan', percent: 15 },
            { label: 'Cicilan/Hutang', percent: 15 },
            { label: 'Dana Tak Terduga', percent: 10 },
        ],
        '>50jt': [
            { label: 'Kebutuhan Pokok', percent: 10 },
            { label: 'Tabungan/Investasi', percent: 50 },
            { label: 'Keinginan', percent: 15 },
            { label: 'Cicilan/Hutang', percent: 15 },
            { label: 'Dana Tak Terduga', percent: 10 },
        ],
    };

    // ================================
    // Fungsi hitung rekomendasi
    // ================================
    const handleCalculate = () => {
        if (!salary || salary < 1) return alert('Masukkan gaji yang valid');
        if (familyMembers < 0) return alert('Jumlah anggota keluarga tidak boleh negatif');

        // Tentukan kategori gaji
        let category = '';
        if (salary < 5000000) category = '<5jt';
        else if (salary <= 20000000) category = '5-20jt';
        else if (salary <= 50000000) category = '>20jt';
        else category = '>50jt';

        let suggestion = [];

        // Ambil data sesuai status
        if (status === 'single') {
            suggestion = [...dataSingle[category]];
        } else {
            suggestion = [...dataMarried[category]];

            // Modifikasi jika ada anggota keluarga tambahan
            if (familyMembers === 1) {
                suggestion = suggestion.map((item) => {
                    if (item.label === 'Kebutuhan Pokok') return { ...item, percent: item.percent + 5 };
                    if (item.label === 'Tabungan/Investasi') return { ...item, percent: item.percent - 5 };
                    return item;
                });
            } else if (familyMembers === 2) {
                suggestion = suggestion.map((item) => {
                    if (item.label === 'Kebutuhan Pokok') return { ...item, percent: item.percent + 10 };
                    if (item.label === 'Tabungan/Investasi') return { ...item, percent: item.percent - 7 };
                    if (item.label === 'Keinginan') return { ...item, percent: item.percent - 3 };
                    return item;
                });
            } else if (familyMembers > 2) {
                suggestion = suggestion.map((item) => {
                    if (item.label === 'Kebutuhan Pokok') return { ...item, percent: item.percent + 15 };
                    if (item.label === 'Tabungan/Investasi') return { ...item, percent: item.percent - 10 };
                    if (item.label === 'Keinginan') return { ...item, percent: item.percent - 5 };
                    return item;
                });
            }
        }

        // ================================
        // Normalisasi agar total = 100%
        // ================================
        let totalPercent = suggestion.reduce((sum, item) => sum + item.percent, 0);
        if (totalPercent !== 100) {
            suggestion = suggestion.map((item) => ({
                ...item,
                percent: (item.percent / totalPercent) * 100,
            }));
            let rounded = suggestion.map((item) => Math.round(item.percent));
            let diff = 100 - rounded.reduce((a, b) => a + b, 0);
            if (diff !== 0) {
                rounded[rounded.length - 1] += diff;
            }
            suggestion = suggestion.map((item, idx) => ({
                ...item,
                percent: rounded[idx],
            }));
        }

        // Hitung rupiah
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
                    {/* Pilih status */}
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

                    {/* Input jumlah anggota keluarga */}
                    {status === 'married' && (
                        <div className="grid gap-2">
                            <Label>Jumlah Anggota Keluarga</Label>
                            <Input
                                type="number"
                                min={0}
                                value={familyMembers === 0 ? '' : familyMembers}
                                onChange={(e) => setFamilyMembers(Number(e.target.value))}
                                placeholder="Masukkan jumlah anggota keluarga yang tinggal satu rumah(Sodara, Orang Tua, Atau Anak)"
                            />
                        </div>
                    )}

                    {/* Input gaji */}
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

            {/* Hasil */}
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
