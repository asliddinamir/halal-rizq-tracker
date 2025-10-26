import { useState, useEffect } from 'react';
import { Income, ComplianceCategory } from '@/types/income';
import { classifyIncome } from '@/lib/incomeClassifier';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (income: Income) => void;
}

export default function AddIncomeDialog({ open, onOpenChange, onAdd }: Props) {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ComplianceCategory>('doubtful');
  const [reasoning, setReasoning] = useState('');
  const { toast } = useToast();

  // Auto-classify when source or description changes
  useEffect(() => {
    if (source.trim()) {
      const result = classifyIncome(source, description);
      setCategory(result.category);
      setReasoning(result.reasoning);
    }
  }, [source, description]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!source.trim() || !amount) {
      toast({
        title: 'Missing Information',
        description: 'Please provide at least a source name and amount.',
        variant: 'destructive',
      });
      return;
    }

    const income: Income = {
      id: crypto.randomUUID(),
      source: source.trim(),
      amount: parseFloat(amount),
      description: description.trim() || undefined,
      category,
      reasoning,
      createdAt: new Date().toISOString(),
    };

    onAdd(income);
    
    toast({
      title: 'Income Added',
      description: `${source} has been categorized as ${category}.`,
    });

    // Reset form
    setSource('');
    setAmount('');
    setDescription('');
    setCategory('doubtful');
    setReasoning('');
    onOpenChange(false);
  };

  const getCategoryBadge = () => {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Income Source</DialogTitle>
          <DialogDescription>
            Enter your income details. The app will automatically classify it according to Islamic principles.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="source">Income Source *</Label>
            <Input
              id="source"
              placeholder="e.g., Freelance web development, Bank interest, Stock trading"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($) *</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Additional details about this income source..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {source && (
            <div className="space-y-3 p-4 bg-accent/50 rounded-lg border border-border">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Automatic Classification:</span>
                {getCategoryBadge()}
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Islamic Evidence:</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{reasoning}</p>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">Add Income</Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
