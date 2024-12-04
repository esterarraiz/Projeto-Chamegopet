export interface Pet {
    id: number; 
    usuario: number; 
    titulo: string; 
    especie: 'cachorro' | 'gato' | 'outro'; 
    raca?: string; 
    idade?: number; 
    sexo: 'macho' | 'femea' | 'nao_informado'; 
    descricao: string; 
    cep: string; 
    cidade?: string; 
    estado?: string; 
    whatsapp?: string; 
    date_posted: string; 
    imagem?: string; 
  }
  