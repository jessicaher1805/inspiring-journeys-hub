import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const categories = [
  { id: "voces-creadoras", label: "Voces Creadoras", categoryId: 1 },
  { id: "pensamiento-critico", label: "Pensamiento Crítico y Sabiduría", categoryId: 2 },
  { id: "guardianas-dignidad", label: "Guardianas de la Dignidad", categoryId: 3 },
  { id: "liderazgo-transformacion", label: "Liderazgo y Transformación", categoryId: 4 },
  { id: "ciencia-salud", label: "Ciencia, Salud y Tecnología", categoryId: 5 },
  { id: "deporte", label: "Deporte", categoryId: 6 },
  { id: "naturaleza-planeta", label: "Naturaleza y Defensa del Planeta", categoryId: 7 },
];

const HeroBanner = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with cinematic gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f3a] via-[#2d1b69] to-[#8b5cf6] opacity-95" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-orange-500 text-white font-semibold rounded-full text-sm uppercase tracking-wide">
              Mujeres que Transforman
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              El poder del
              <span className="block bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                mundo se decide
              </span>
              <span className="block text-white">aquí</span>
            </h1>
            
            <p className="text-xl text-purple-100 leading-relaxed max-w-3xl mx-auto">
              Descubre las historias de mujeres extraordinarias que han cambiado el curso de la historia 
              y siguen inspirando a las nuevas generaciones.
            </p>
          </div>

          {/* Interactive image with category overlays */}
          <div className="relative max-w-6xl mx-auto">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroBanner}
                alt="Mujeres Inspiradoras"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Category overlays positioned on the image */}
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-2 p-6">
                {categories.map((category, index) => (
                  <button
                    key={category.id}
                    onClick={() => scrollToSection(category.id)}
                    className={`
                      group relative overflow-hidden rounded-lg bg-black/30 backdrop-blur-sm border border-white/20 
                      hover:bg-black/50 hover:border-white/40 transition-all duration-300 
                      flex items-center justify-center text-center p-4
                      ${index === 6 ? 'col-span-4 row-span-1' : 'col-span-2 row-span-1'}
                    `}
                  >
                    <div className="relative z-10">
                      <h3 className="text-white font-semibold text-sm md:text-base lg:text-lg">
                        {category.label}
                      </h3>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;