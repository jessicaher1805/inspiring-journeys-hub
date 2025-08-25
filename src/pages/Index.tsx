import HeroBanner from "@/components/HeroBanner";
import CategorySection from "@/components/CategorySection";

const Index = () => {
  const categories = [
    {
      id: "voces-creadoras",
      title: "Voces Creadoras",
      categoryId: 1,
      description: "Escritoras, poetas, artistas y creadoras que han dado voz a los sentimientos y experiencias humanas más profundas."
    },
    {
      id: "pensamiento-critico",
      title: "Pensamiento Crítico y Sabiduría",
      categoryId: 2,
      description: "Filósofas, pensadoras y académicas que han desafiado las convenciones y ampliado los límites del conocimiento humano."
    },
    {
      id: "guardianas-dignidad",
      title: "Guardianas de la Dignidad",
      categoryId: 3,
      description: "Defensoras de los derechos humanos, activistas y líderes que han luchado por la justicia y la igualdad."
    },
    {
      id: "liderazgo-transformacion",
      title: "Liderazgo y Transformación",
      categoryId: 4,
      description: "Líderes políticas, empresarias y agentes de cambio que han transformado sociedades y organizaciones."
    },
    {
      id: "ciencia-salud",
      title: "Ciencia, Salud y Tecnología",
      categoryId: 5,
      description: "Científicas, médicas e innovadoras que han revolucionado el mundo a través de sus descubrimientos y avances tecnológicos."
    },
    {
      id: "deporte",
      title: "Deporte",
      categoryId: 6,
      description: "Atletas excepcionales que han roto barreras, establecido récords y inspirado a generaciones a través del deporte."
    },
    {
      id: "naturaleza-planeta",
      title: "Naturaleza y Defensa del Planeta",
      categoryId: 7,
      description: "Ambientalistas, conservacionistas y defensoras de la naturaleza que luchan por proteger nuestro planeta."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Category Sections */}
      {categories.map((category) => (
        <CategorySection
          key={category.id}
          id={category.id}
          title={category.title}
          categoryId={category.categoryId}
          description={category.description}
        />
      ))}
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Mujeres que Transforman el Mundo
          </h3>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Cada historia importa. Cada vida inspira. Cada mujer tiene el poder de cambiar el mundo.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;