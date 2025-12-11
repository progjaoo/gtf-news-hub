import { Header } from '@/components/portal/Header';
import { EditorialProvider, useEditorial } from '@/contexts/EditorialContext';

function PortalContent() {
  const { getEditorialLabel } = useEditorial();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Spacer for fixed header */}
      <div className="h-[7.5rem] lg:h-[8.5rem]" />

      {/* Demo Content */}
      <main className="container py-8">
        <div className="text-center py-20">
          <span className="badge-editorial mb-4">
            {getEditorialLabel()}
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-foreground mb-4">
            GTF<span className="text-primary">News</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Portal de notícias moderno e editorial. Clique nas editorias no menu para ver a mudança dinâmica de cores.
          </p>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {['news', 'sports', 'business', 'entertainment', 'tech', 'politics'].map((editorial) => (
              <div
                key={editorial}
                className={`editorial-${editorial} p-4 rounded-lg`}
              >
                <div className="h-20 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs uppercase">
                    {editorial}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-12 text-sm text-muted-foreground">
            Aguardando próximos componentes: Hero, Cards de Notícias, Grid Editorial, Footer...
          </p>
        </div>
      </main>
    </div>
  );
}

const Index = () => {
  return (
    <EditorialProvider>
      <PortalContent />
    </EditorialProvider>
  );
};

export default Index;
