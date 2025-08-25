import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Calendar, MapPin, Award, Book } from "lucide-react";

interface WomanData {
  id: number;
  imagen_url: string;
  nombre_completo: string;
  siglo: string;
  año_nacimiento: number;
  año_fallecimiento?: number;
  ocupacion: string;
  logros: string;
  biografia: string;
  origen_id: number;
}

interface Origin {
  id: number;
  nombre: string;
}

interface Link {
  id: number;
  url: string;
  descripcion: string;
  mujer_id: number;
}

const WomanDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [woman, setWoman] = useState<WomanData | null>(null);
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWomanData = async () => {
      if (!id) return;

      try {
        // TODO: Replace with actual Supabase queries
        // const { data: womanData } = await supabase
        //   .from('mujeres')
        //   .select('*')
        //   .eq('id', id)
        //   .single();

        // const { data: originData } = await supabase
        //   .from('origen')
        //   .select('nombre')
        //   .eq('id', womanData.origen_id)
        //   .single();

        // const { data: linksData } = await supabase
        //   .from('links')
        //   .select('*')
        //   .eq('mujer_id', id);

        // Mock data for development
        const mockWoman: WomanData = {
          id: parseInt(id),
          imagen_url: `https://images.unsplash.com/photo-1500000000${id}?w=600&h=800&fit=crop&auto=format`,
          nombre_completo: "Nombre Completo de la Mujer Inspiradora",
          siglo: "XX",
          año_nacimiento: 1920,
          año_fallecimiento: 2000,
          ocupacion: "Científica, Escritora, Activista",
          logros: "Pionera en su campo, ganadora de múltiples premios internacionales, defensora de los derechos humanos",
          biografia: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          origen_id: 1
        };

        const mockOrigin: Origin = {
          id: 1,
          nombre: "País de Origen"
        };

        const mockLinks: Link[] = [
          { id: 1, url: "https://youtube.com/watch?v=example1", descripcion: "Documental biográfico", mujer_id: parseInt(id) },
          { id: 2, url: "https://example.com/biography.pdf", descripcion: "Biografía completa (PDF)", mujer_id: parseInt(id) },
          { id: 3, url: "https://example.com/timeline", descripcion: "Línea de tiempo interactiva", mujer_id: parseInt(id) },
          { id: 4, url: "https://spotify.com/playlist/example", descripcion: "Playlist musical inspiracional", mujer_id: parseInt(id) },
        ];

        setWoman(mockWoman);
        setOrigin(mockOrigin);
        setLinks(mockLinks);
      } catch (error) {
        console.error('Error loading woman data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWomanData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!woman) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Mujer no encontrada</h1>
          <Button onClick={() => navigate('/')}>Volver al inicio</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-primary-foreground hover:bg-white/20 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero section */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative">
                <img
                  src={woman.imagen_url}
                  alt={woman.nombre_completo}
                  className="w-full aspect-[3/4] object-cover rounded-2xl shadow-[var(--shadow-elegant)]"
                />
              </div>
              
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 cinematic-text">
                    {woman.nombre_completo}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      Siglo {woman.siglo}
                    </span>
                    <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">
                      {origin?.nombre}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span className="text-sm">
                      {woman.año_nacimiento}
                      {woman.año_fallecimiento && ` - ${woman.año_fallecimiento}`}
                    </span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span className="text-sm">{origin?.nombre}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Book className="mr-3 h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Ocupación</h3>
                      <p className="text-muted-foreground">{woman.ocupacion}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Award className="mr-3 h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-2">Logros Destacados</h3>
                      <p className="text-muted-foreground">{woman.logros}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 cinematic-text">Biografía</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                  <p>{woman.biografia}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Educational resources */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 cinematic-text">
                  Recursos Educativos
                </h3>
                
                <div className="space-y-4">
                  {links.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200">
                        <div className="flex-1">
                          <p className="font-medium group-hover:text-primary transition-colors">
                            {link.descripcion}
                          </p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <Button 
                    onClick={() => navigate('/')}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                  >
                    Explorar más mujeres
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WomanDetail;