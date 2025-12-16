## Checklist de Implementação

##### Prioridade ALTA (Fazer Primeiro)

 Alterar post.conteudo para LONGTEXT
 Adicionar campo post.status
 Adicionar campo post.slug
 Criar tabela tag e post_tag
 Criar tabela post_imagem
 Adicionar campos de auditoria no usuario
 Adicionar campos no editorial

#### Prioridade MÉDIA

- Criar tabela post_historico
- Criar tabela comentario
- Criar tabela notificacao
- Atualizar emissora com redes sociais
- Criar tabela banner

#### Prioridade BAIXA (Futuro)

- Criar tabela post_visualizacao
- Criar tabela configuracao
- Sistema de SEO avançado
- Analytics completo

-- ========================================
-- SCRIPT COMPLETO DE ATUALIZAÇÃO
-- ========================================

-- 1. AJUSTAR POST
ALTER TABLE post
  MODIFY COLUMN conteudo LONGTEXT,
  ADD COLUMN slug VARCHAR(255) UNIQUE AFTER subtitulo,
  ADD COLUMN status ENUM('rascunho','revisao','aprovado','publicado','arquivado') 
    DEFAULT 'rascunho' AFTER imagem,
  ADD COLUMN destaque BOOLEAN DEFAULT FALSE,
  ADD COLUMN visualizacoes INT DEFAULT 0,
  ADD COLUMN publicado_em DATETIME,
  ADD COLUMN autor VARCHAR(255),
  ADD COLUMN meta_description VARCHAR(300),
  ADD COLUMN meta_keywords VARCHAR(500),
  ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- 2. CRIAR TAGS
CREATE TABLE tag (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE post_tag (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  tag_id INT NOT NULL,
  FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tag(id) ON DELETE CASCADE,
  UNIQUE KEY uk_post_tag (post_id, tag_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. GALERIA DE IMAGENS
CREATE TABLE post_imagem (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  url VARCHAR(500) NOT NULL,
  legenda VARCHAR(255),
  ordem INT DEFAULT 0,
  tipo ENUM('destaque', 'galeria', 'conteudo') DEFAULT 'galeria',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
  INDEX idx_post_ordem (post_id, ordem)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. HISTÓRICO
CREATE TABLE post_historico (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  usuario_id INT NOT NULL,
  acao ENUM('criacao','edicao','aprovacao','publicacao','rejeicao') NOT NULL,
  status_anterior VARCHAR(50),
  status_novo VARCHAR(50),
  observacao TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  INDEX idx_post_data (post_id, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. COMENTÁRIOS
CREATE TABLE comentario (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  usuario_id INT,
  nome VARCHAR(100),
  email VARCHAR(150),
  conteudo TEXT NOT NULL,
  status ENUM('pendente', 'aprovado', 'rejeitado') DEFAULT 'pendente',
  parent_id INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  approved_at DATETIME,
  FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE SET NULL,
  FOREIGN KEY (parent_id) REFERENCES comentario(id) ON DELETE CASCADE,
  INDEX idx_post_status (post_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. NOTIFICAÇÕES
CREATE TABLE notificacao (
  id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  post_id INT,
  mensagem TEXT,
  lida BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
  INDEX idx_usuario_lida (usuario_id, lida)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. BANNERS
CREATE TABLE banner (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(255),
  imagem VARCHAR(500),
  link VARCHAR(500),
  posicao ENUM('topo', 'lateral', 'rodape', 'meio'),
  emissora_id INT,
  ativo BOOLEAN DEFAULT TRUE,
  data_inicio DATE,
  data_fim DATE,
  ordem INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (emissora_id) REFERENCES emissora(id),
  INDEX idx_emissora_ativo (emissora_id, ativo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. ANALYTICS
CREATE TABLE post_visualizacao (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  ip_address VARCHAR(45),
  user_agent VARCHAR(500),
  data_visualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES post(id) ON DELETE CASCADE,
  INDEX idx_post_data (post_id, data_visualizacao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. CONFIGURAÇÕES
CREATE TABLE configuracao (
  id INT PRIMARY KEY AUTO_INCREMENT,
  chave VARCHAR(100) UNIQUE NOT NULL,
  valor TEXT,
  tipo ENUM('texto', 'numero', 'boolean', 'json') DEFAULT 'texto',
  emissora_id INT,
  descricao VARCHAR(255),
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (emissora_id) REFERENCES emissora(id),
  INDEX idx_chave_emissora (chave, emissora_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. ATUALIZAR USUARIO
ALTER TABLE usuario
  ADD COLUMN nome_completo VARCHAR(255) AFTER username,
  ADD COLUMN email VARCHAR(255) UNIQUE AFTER senha,
  ADD COLUMN avatar VARCHAR(500),
  ADD COLUMN telefone VARCHAR(20),
  ADD COLUMN status ENUM('ativo', 'inativo', 'suspenso') DEFAULT 'ativo',
  ADD COLUMN ultimo_login DATETIME,
  ADD COLUMN token_recuperacao VARCHAR(255),
  ADD COLUMN token_expiracao DATETIME,
  ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- 11. ATUALIZAR EDITORIAL
ALTER TABLE editorial
  ADD COLUMN nome VARCHAR(100) NOT NULL AFTER id,
  ADD COLUMN slug VARCHAR(100) UNIQUE AFTER nome,
  ADD COLUMN descricao TEXT,
  ADD COLUMN cor_primaria VARCHAR(7),
  ADD COLUMN ativo BOOLEAN DEFAULT TRUE,
  ADD COLUMN ordem INT DEFAULT 0;

-- 12. ATUALIZAR EMISSORA
ALTER TABLE emissora
  ADD COLUMN slug VARCHAR(100) UNIQUE AFTER nomesocial,
  ADD COLUMN telefone VARCHAR(20),
  ADD COLUMN email VARCHAR(255),
  ADD COLUMN whatsapp VARCHAR(20),
  ADD COLUMN facebook VARCHAR(255),
  ADD COLUMN instagram VARCHAR(255),
  ADD COLUMN twitter VARCHAR(255),
  ADD COLUMN youtube VARCHAR(255),
  ADD COLUMN ativo BOOLEAN DEFAULT TRUE,
  ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP;