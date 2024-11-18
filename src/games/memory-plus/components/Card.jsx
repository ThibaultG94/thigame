import { Card, CardContent } from "../../../components/ui/card";

export function MemoryCard({ symbol, isFlipped, isMatched, onClick }) {
    return (
        <Card
        className={`h-24 cursor-pointer transition-all transform hover:scale-105
            ${isFlipped || isMatched ? 'bg-primary' : 'bg-secondary'}`}
          onClick={onClick}>
            <CardContent className="flex items-center justify-center h-full text-3xl">
                {(isFlipped || isMatched) && symbol}
            </CardContent>
          </Card>
    )
}