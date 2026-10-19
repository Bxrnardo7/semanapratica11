// Base de dados dos produtos usada tanto na home-page quanto na página de detalhes.
const produtos = [
  {
    id: 1, nome: "Samsung Galaxy A55 5G", categoria: "Celulares", preco: 2199.90, estoque: 14, icone: "📱", cor: "lavender",
    descricao: "Um celular versátil para acompanhar sua rotina. O Galaxy A55 combina tela ampla, conexão 5G e câmeras para registrar seus melhores momentos.",
    especificacoes: ["Tela Super AMOLED de 6,6 polegadas", "Armazenamento de 128 GB", "Conexão 5G", "Câmera principal de 50 MP"]
  },
  {
    id: 2, nome: "iPhone 15", categoria: "Celulares", preco: 4599.00, estoque: 8, icone: "📱", cor: "rose",
    descricao: "Desempenho rápido, câmera avançada e acabamento elegante em um smartphone pensado para fotos, vídeos e tarefas do dia a dia.",
    especificacoes: ["Tela Super Retina XDR de 6,1 polegadas", "Armazenamento de 128 GB", "Câmera principal de 48 MP", "Conector USB-C"]
  },
  {
    id: 3, nome: "Xiaomi Redmi Note 13", categoria: "Celulares", preco: 1499.90, estoque: 21, icone: "📱", cor: "mint",
    descricao: "Uma opção equilibrada para quem procura tela fluida, boa autonomia e bastante espaço para aplicativos, fotos e arquivos.",
    especificacoes: ["Tela AMOLED de 6,67 polegadas", "Armazenamento de 256 GB", "Bateria de 5.000 mAh", "Câmera principal de 108 MP"]
  },
  {
    id: 4, nome: "Lenovo IdeaPad 3", categoria: "Notebooks", preco: 2899.00, estoque: 6, icone: "💻", cor: "blue",
    descricao: "Notebook para estudos, trabalho e navegação. Seu formato leve facilita levar o computador para a faculdade ou para o escritório.",
    especificacoes: ["Tela Full HD de 15,6 polegadas", "Processador AMD Ryzen 5", "Memória RAM de 8 GB", "SSD de 256 GB"]
  },
  {
    id: 5, nome: "Acer Aspire 5", categoria: "Notebooks", preco: 3499.00, estoque: 5, icone: "💻", cor: "blue",
    descricao: "Um notebook com bom espaço de armazenamento e desempenho para atividades acadêmicas, produtividade e entretenimento.",
    especificacoes: ["Tela Full HD de 15,6 polegadas", "Processador Intel Core i5", "Memória RAM de 8 GB", "SSD de 512 GB"]
  },
  {
    id: 6, nome: "Headset HyperX Cloud Stinger 2", categoria: "Acessórios", preco: 299.90, estoque: 18, icone: "🎧", cor: "peach",
    descricao: "Headset confortável para longas sessões de jogo e chamadas. Conta com microfone integrado e controles acessíveis no próprio fone.",
    especificacoes: ["Áudio com conexão P2", "Microfone com cancelamento de ruído", "Controles no próprio headset", "Estrutura leve e confortável"]
  },
  {
    id: 7, nome: "Mouse Logitech G203", categoria: "Acessórios", preco: 169.90, estoque: 32, icone: "🖱️", cor: "peach",
    descricao: "Mouse gamer com formato confortável, iluminação personalizável e sensibilidade ajustável para diferentes estilos de jogo.",
    especificacoes: ["Sensor ajustável até 8.000 DPI", "6 botões programáveis", "Iluminação RGB", "Conexão USB com fio"]
  },
  {
    id: 8, nome: "PlayStation 5 Slim", categoria: "Games", preco: 3699.00, estoque: 4, icone: "🎮", cor: "lilac",
    descricao: "Console para aproveitar jogos atuais com carregamentos rápidos, gráficos detalhados e uma grande variedade de experiências.",
    especificacoes: ["Armazenamento SSD de 1 TB", "Inclui controle sem fio", "Compatível com jogos de PS5", "Conexão HDMI e Wi-Fi"]
  }
];

const formatarPreco = (valor) => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const iconeCategoria = (categoria) => ({ Celulares: "▣", Notebooks: "▰", Acessórios: "✳", Games: "◈" }[categoria] || "✦");

function criarCard(produto) {
  return `
    <article class="product-card">
      <a class="product-link" href="detalhes.html?id=${encodeURIComponent(produto.id)}" aria-label="Ver detalhes de ${produto.nome}">
        <div class="product-art ${produto.cor}"><span class="category-chip">${iconeCategoria(produto.categoria)} ${produto.categoria}</span><span class="product-emoji" aria-hidden="true">${produto.icone}</span></div>
        <div class="product-info">
          <p class="product-category">${produto.categoria}</p>
          <h3>${produto.nome}</h3>
          <div class="card-bottom"><span class="price">${formatarPreco(produto.preco)}</span><span class="card-arrow" aria-hidden="true">↗</span></div>
        </div>
      </a>
      <button class="favorite-button" type="button" data-favorite="${produto.id}" aria-label="Destacar ${produto.nome}" aria-pressed="false">☆</button>
    </article>`;
}

function iniciarHome() {
  const grid = document.querySelector("#product-grid");
  if (!grid) return;
  const busca = document.querySelector("#search-input");
  const categoria = document.querySelector("#category-filter");
  const contador = document.querySelector("#product-count");
  const vazio = document.querySelector("#empty-message");

  function renderizar() {
    const termo = busca.value.trim().toLocaleLowerCase("pt-BR");
    const categoriaSelecionada = categoria.value;
    const encontrados = produtos.filter((produto) => {
      const correspondeTexto = `${produto.nome} ${produto.categoria} ${produto.descricao}`.toLocaleLowerCase("pt-BR").includes(termo);
      const correspondeCategoria = categoriaSelecionada === "Todas" || produto.categoria === categoriaSelecionada;
      return correspondeTexto && correspondeCategoria;
    });
    grid.innerHTML = encontrados.map(criarCard).join("");
    contador.textContent = `${encontrados.length} ${encontrados.length === 1 ? "produto" : "produtos"}`;
    vazio.hidden = encontrados.length > 0;
  }

  busca.addEventListener("input", renderizar);
  categoria.addEventListener("change", renderizar);
  grid.addEventListener("click", (evento) => {
    const botao = evento.target.closest("[data-favorite]");
    if (!botao) return;
    const ativo = botao.getAttribute("aria-pressed") === "true";
    botao.setAttribute("aria-pressed", String(!ativo));
    botao.textContent = ativo ? "☆" : "★";
    botao.classList.toggle("is-favorite", !ativo);
  });
  renderizar();
}

function iniciarDetalhes() {
  const container = document.querySelector("#detail-content");
  if (!container) return;
  const parametros = new URLSearchParams(window.location.search);
  const id = Number(parametros.get("id"));
  const produto = produtos.find((item) => item.id === id);

  if (!produto) {
    container.innerHTML = `<div class="not-found"><span class="not-found-icon">?</span><p class="eyebrow">PRODUTO NÃO ENCONTRADO</p><h1>Não encontramos esse item.</h1><p>Volte ao catálogo e escolha um dos produtos disponíveis.</p><a class="primary-button" href="index.html">Voltar para a loja</a></div>`;
    return;
  }

  document.title = `${produto.nome} | Vitrine`;
  container.innerHTML = `
    <div class="detail-art ${produto.cor}"><span class="detail-category">${iconeCategoria(produto.categoria)} ${produto.categoria}</span><span class="detail-emoji" aria-hidden="true">${produto.icone}</span><span class="detail-art-caption">VITRINE SELECTION</span></div>
    <div class="detail-info">
      <p class="eyebrow">DETALHES DO PRODUTO</p>
      <h1>${produto.nome}</h1>
      <p class="detail-description">${produto.descricao}</p>
      <p class="detail-price">${formatarPreco(produto.preco)}</p>
      <p class="stock-status ${produto.estoque > 0 ? "in-stock" : "out-stock"}"><span></span>${produto.estoque > 0 ? `Em estoque: ${produto.estoque} unidades` : "Produto indisponível"}</p>
      <div class="specifications"><h2>Informações do produto</h2><ul>${produto.especificacoes.map((item) => `<li>${item}</li>`).join("")}</ul><p class="detail-meta"><span>Categoria</span><strong>${produto.categoria}</strong></p><p class="detail-meta"><span>Código do produto</span><strong>#${String(produto.id).padStart(4, "0")}</strong></p></div>
      <a class="primary-button" href="index.html">← Continuar explorando</a>
    </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  iniciarHome();
  iniciarDetalhes();
});
