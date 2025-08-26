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
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {women.map((woman) => {
            const quote = quotes.find(q => q.mujer_id === woman.id);
            return (
              <div key={woman.id} className="w-full flex-shrink-0">
                {/* Banner-style card */}
                <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r from-primary/20 to-secondary/20">
                  <img
                    src={woman.imagen_url}
                    alt={woman.nombre_conocido}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 flex items-center justify-start p-8 md:p-12">
                    <div className="max-w-2xl space-y-4">
                      <h3 className="text-3xl md:text-5xl font-bold text-white">
                        {woman.nombre_conocido}
                      </h3>
                      <p className="text-lg md:text-xl text-white/90 italic leading-relaxed">
                        "{quote?.texto || "Sin cita disponible"}"
                      </p>
                      <Button 
                        onClick={() => window.location.href = `/mujer/${woman.id}`}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 text-lg"
                      >
                        Conocer más
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation buttons */}
      {women.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 border-white/30 text-white hover:bg-black/70 w-12 h-12"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 border-white/30 text-white hover:bg-black/70 w-12 h-12"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Dots indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {women.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? 'bg-primary shadow-[var(--shadow-glow)]' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;