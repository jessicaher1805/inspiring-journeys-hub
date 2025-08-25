import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import WomanCard from "./WomanCard";

interface Woman {
  id: number;
  imagen_url: string;
  nombre_conocido: string;
  categoria_id: number;
}

interface Quote {
  texto: string;
  mujer_id: number;
}

interface CategoryCarouselProps {
  categoryId: number;
}

const CategoryCarousel = ({ categoryId }: CategoryCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [women, setWomen] = useState<Woman[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual Supabase calls
  useEffect(() => {
    const loadData = async () => {
      try {
        // TODO: Replace with actual Supabase queries
        // const { data: womenData } = await supabase
        //   .from('mujeres')
        //   .select('id, imagen_url, nombre_conocido, categoria_id')
        //   .eq('categoria_id', categoryId)
        //   .limit(4);
        
        // const womenIds = womenData?.map(w => w.id) || [];
        // const { data: quotesData } = await supabase
        //   .from('citas')
        //   .select('texto, mujer_id')
        //   .in('mujer_id', womenIds);

        // Mock data for development
        const mockWomen: Woman[] = Array.from({ length: 4 }, (_, i) => ({
          id: i + 1 + (categoryId * 10),
          imagen_url: `https://images.unsplash.com/photo-${1500000000 + i + categoryId}?w=400&h=600&fit=crop&auto=format`,
          nombre_conocido: `Mujer Inspiradora ${i + 1}`,
          categoria_id: categoryId,
        }));

        const mockQuotes: Quote[] = mockWomen.map(w => ({
          texto: `Esta es una cita inspiradora que cambió el mundo y sigue siendo relevante hoy en día para las nuevas generaciones.`,
          mujer_id: w.id,
        }));

        setWomen(mockWomen);
        setQuotes(mockQuotes);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [categoryId]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === women.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? women.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 25}%)` }}
        >
          {women.map((woman) => {
            const quote = quotes.find(q => q.mujer_id === woman.id);
            return (
              <div key={woman.id} className="w-1/4 flex-shrink-0 px-2">
                <WomanCard
                  id={woman.id}
                  imageUrl={woman.imagen_url}
                  nombreConocido={woman.nombre_conocido}
                  cita={quote?.texto || "Sin cita disponible"}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-primary/30 hover:border-primary hover:bg-primary/10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-primary/30 hover:border-primary hover:bg-primary/10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(women.length / 4) }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              Math.floor(currentIndex / 4) === index 
                ? 'bg-primary shadow-[var(--shadow-glow)]' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            onClick={() => setCurrentIndex(index * 4)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;