import { Income } from '@/types/income';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { DollarSign, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface Props {
  incomes: Income[];
}

export default function IncomeSummary({ incomes }: Props) {
  const total = incomes.reduce((sum, i) => sum + i.amount, 0);
  const halalTotal = incomes.filter(i => i.category === 'halal').reduce((sum, i) => sum + i.amount, 0);
  const doubtfulTotal = incomes.filter(i => i.category === 'doubtful').reduce((sum, i) => sum + i.amount, 0);
  const haramTotal = incomes.filter(i => i.category === 'haram').reduce((sum, i) => sum + i.amount, 0);

  const halalPercent = total > 0 ? (halalTotal / total * 100).toFixed(1) : '0';
  const doubtfulPercent = total > 0 ? (doubtfulTotal / total * 100).toFixed(1) : '0';
  const haramPercent = total > 0 ? (haramTotal / total * 100).toFixed(1) : '0';

  const chartData = [
    { name: 'Halal', value: halalTotal, color: 'hsl(var(--halal))' },
    { name: 'Doubtful', value: doubtfulTotal, color: 'hsl(var(--doubtful))' },
    { name: 'Haram', value: haramTotal, color: 'hsl(var(--haram))' },
  ].filter(d => d.value > 0);

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {/* Summary Stats */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${total.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {incomes.length} {incomes.length === 1 ? 'source' : 'sources'}
            </p>
          </CardContent>
        </Card>

        <Card className="border-halal/20 bg-halal/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Halal Income</CardTitle>
            <CheckCircle className="h-4 w-4 text-halal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-halal">${halalTotal.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">{halalPercent}% of total</p>
          </CardContent>
        </Card>

        <Card className="border-doubtful/20 bg-doubtful/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doubtful Income</CardTitle>
            <AlertTriangle className="h-4 w-4 text-doubtful" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-doubtful">${doubtfulTotal.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">{doubtfulPercent}% of total</p>
          </CardContent>
        </Card>

        <Card className="border-haram/20 bg-haram/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Haram Income</CardTitle>
            <XCircle className="h-4 w-4 text-haram" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-haram">${haramTotal.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">{haramPercent}% of total</p>
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Income Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              No income data yet. Add your first income source to see the chart.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
