import { useParams } from "react-router-dom";
import { mockNews } from "@/data/mockNews";
import { StickyHeader } from "@/components/portal/StickyHeader";
import { Footer } from "@/components/portal/Footer";

const editorialColors: Record<string, string> = {
  noticias: "bg-editorial-noticias",
  nacional: "bg-editorial-nacional",
  esportes: "bg-editorial-esportes",
  negocios: "bg-editorial-negocios",
  inovacao: "bg-editorial-inovacao",
  cultura: "bg-editorial-cultura",
  servicos: "bg-editorial-servicos",
};

export default function ArtigoPage() {
  const { id } = useParams();
  const noticia = mockNews.find((n) => n.id === Number(id));

  if (!noticia) {
    return (
      <div className="min-h-screen bg-background">
        <StickyHeader />
        <div className="p-20 text-center text-2xl font-semibold">
          Notícia não encontrada.
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />

      {/* CONTEÚDO CENTRAL */}
      <main className="max-w-4xl mx-auto px-4 py-10 bg-white mt-4 rounded-xl shadow-sm">

        {/* EDITORIA */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-3 h-3 rounded-sm ${editorialColors[noticia.editoria]}`} />
          <span className="text-primary font-semibold uppercase text-sm">
            {noticia.editoria}
          </span>
        </div>

        {/* TÍTULO */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          {noticia.titulo}
        </h1>

        {/* SUBTÍTULO */}
        {noticia.subtitulo && (
          <p className="text-lg text-muted-foreground mb-6">
            {noticia.subtitulo}
          </p>
        )}

        {/* DATA */}
        <div className="text-sm text-muted-foreground mb-6">
          Publicado em{" "}
          {new Date(noticia.dataPublicacao).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>

        {/* IMAGEM */}
        <div className="rounded-lg overflow-hidden mb-8">
          <img src={noticia.imagem} alt={noticia.titulo} className="w-full" />
        </div>

        {/* TEXTO DO ARTIGO — Fixado por enquanto */}
        <div className="prose prose-lg max-w-none">
          <p>
            Este é um texto de demonstração da matéria. Em breve isso será
            substituído pelo conteúdo real retornado da API com corpo completo
            da notícia.
          </p>
          <p>
            O objetivo agora é testar o layout e o carregamento da página,
            garantindo compatibilidade com o estilo geral do portal.
          </p>
        </div>

        {/* COMENTÁRIOS */}
        {/* <div className="mt-16 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Comentários</h2>
          <p className="text-muted-foreground mb-4">
            Para comentar, faça login na plataforma.
          </p>
          <button className="px-6 py-3 bg-foreground text-background rounded-md font-semibold">
            Entrar
          </button>
        </div> */}
      </main>

      <Footer />
    </div>
  );
}
