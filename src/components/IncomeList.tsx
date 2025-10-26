import { Income } from '@/types/income';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface Props {
  incomes: Income[];
  onDelete: (id: string) => void;
}

export default function IncomeList({ incomes, onDelete }: Props) {
  if (incomes.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">
            No income sources added yet. Click "Add Income Source" to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getCategoryBadge = (category: Income['category']) => {
    switch (category) {
      case 'halal':
        return <Badge className="bg-halal text-halal-foreground">🟩 Halal</Badge>;
      case 'doubtful':
        return <Badge className="bg-doubtful text-doubtful-foreground">🟨 Doubtful</Badge>;
      case 'haram':
        return <Badge className="bg-haram text-haram-foreground">🟥 Haram</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-foreground">Income Sources</h2>
      {incomes.map((income) => (
        <Card key={income.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-xl">{income.source}</CardTitle>
                  {getCategoryBadge(income.category)}
                </div>
                <CardDescription>
                  ${income.amount.toFixed(2)} • Added {format(new Date(income.createdAt), 'MMM d, yyyy')}
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(income.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {income.description && (
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Description:</p>
                <p className="text-sm text-muted-foreground">{income.description}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Islamic Evidence:</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{income.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
