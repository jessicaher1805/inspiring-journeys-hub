import CategoryCarousel from "./CategoryCarousel";

interface CategorySectionProps {
  id: string;
  title: string;
  categoryId: number;
  description?: string;
}

const CategorySection = ({ id, title, categoryId, description }: CategorySectionProps) => {
  return (
    <section 
      id={id} 
      className="py-20 px-4 md:px-8 bg-gradient-to-br from-background via-muted/30 to-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 cinematic-text">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </div>
        
        <CategoryCarousel categoryId={categoryId} />
      </div>
    </section>
  );
};

export default CategorySection;