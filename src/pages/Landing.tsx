import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, TrendingUp } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      {/* Islamic geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5 bg-repeat" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30 30 0zm0 10L10 30l20 20 20-20-20-20z' fill='%23000000' fill-opacity='1'/%3E%3C/svg%3E")`,
      }} />
      
      <div className="relative container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block p-3 bg-primary/10 rounded-2xl mb-4">
            <Shield className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Halal Income Tracker
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground font-light italic">
            Purify your rizq. Track your income with intention.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-halal/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-halal" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">Intelligent Classification</h3>
            <p className="text-muted-foreground">
              Automatically analyzes your income sources and provides Islamic rulings with evidence from Qur'an and Hadith.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">Islamic Guidance</h3>
            <p className="text-muted-foreground">
              Every categorization includes detailed reasoning with references to help you understand the ruling.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-doubtful/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-doubtful" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">Clear Insights</h3>
            <p className="text-muted-foreground">
              Visual dashboard shows your income breakdown with color-coded categories for easy understanding.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/dashboard">
            <Button size="lg" className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
              Start Tracking Your Rizq
            </Button>
          </Link>
        </div>

        {/* Hadith Quote */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
            <p className="text-lg text-center text-card-foreground italic mb-4">
              "Indeed, Allah is Pure and only accepts what is pure."
            </p>
            <p className="text-center text-muted-foreground">
              — Sahih Muslim
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
