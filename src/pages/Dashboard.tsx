import { useState, useEffect } from 'react';
import { Income } from '@/types/income';
import { loadIncomes, saveIncomes } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { Plus, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import IncomeSummary from '@/components/IncomeSummary';
import IncomeList from '@/components/IncomeList';
import AddIncomeDialog from '@/components/AddIncomeDialog';
import IslamicQuote from '@/components/IslamicQuote';

export default function Dashboard() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    setIncomes(loadIncomes());
  }, []);

  const handleAddIncome = (income: Income) => {
    const updated = [...incomes, income];
    setIncomes(updated);
    saveIncomes(updated);
  };

  const handleDeleteIncome = (id: string) => {
    const updated = incomes.filter(i => i.id !== id);
    setIncomes(updated);
    saveIncomes(updated);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Your Rizq Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track and purify your income sources
            </p>
          </div>
          <Link to="/">
            <Button variant="outline" size="icon">
              <Home className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Islamic Quote */}
        <IslamicQuote />

        {/* Summary Cards */}
        <IncomeSummary incomes={incomes} />

        {/* Add Income Button */}
        <div className="mb-6">
          <Button onClick={() => setIsAddDialogOpen(true)} size="lg" className="w-full md:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Income Source
          </Button>
        </div>

        {/* Income List */}
        <IncomeList incomes={incomes} onDelete={handleDeleteIncome} />

        {/* Add Income Dialog */}
        <AddIncomeDialog 
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAdd={handleAddIncome}
        />
      </div>
    </div>
  );
}
