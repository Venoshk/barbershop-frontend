export interface Cut {
  id: number;
  preco: number | bigint;
  desc: string;
  categoria: string;
  ativo: boolean;
  dataCriacao: string; // ou o nome do campo que vier da API
  dataAtualizacao: string;
  imagem: string; // ou o nome do campo que vier da API
}