import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

const quotes = [
  {
    text: "Indeed, Allah is Pure and only accepts what is pure.",
    source: "Sahih Muslim"
  },
  {
    text: "The best of what a man eats is that which he earns with his own hands.",
    source: "Sahih Bukhari"
  },
  {
    text: "Whoever seeks the lawful will have his provision guaranteed by Allah.",
    source: "Sunan Ibn Majah"
  },
  {
    text: "Allah has permitted trade and forbidden riba (interest).",
    source: "Qur'an 2:275"
  },
  {
    text: "And when the prayer has been concluded, disperse within the land and seek from the bounty of Allah.",
    source: "Qur'an 62:10"
  },
  {
    text: "O you who believe, eat from the good things which We have provided for you.",
    source: "Qur'an 2:172"
  }
];

export default function IslamicQuote() {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <Card className="mb-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
      <CardContent className="py-6">
        <p className="text-base md:text-lg text-foreground italic text-center mb-2">
          "{quote.text}"
        </p>
        <p className="text-center text-sm text-muted-foreground">
          — {quote.source}
        </p>
      </CardContent>
    </Card>
  );
}
