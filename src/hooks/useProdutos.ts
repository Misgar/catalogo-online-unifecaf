import { useCallback, useMemo, useRef, useState } from 'react';
import api from '../services/api';
import { Produto } from '../types/produto';

const cacheMemoria: Record<string, Produto[]> = {};

export default function useProdutos(categorias: string[], chaveCache: string) {
  const [itens, setItens] = useState<Produto[]>(cacheMemoria[chaveCache] ?? []);
  const [carregando, setCarregando] = useState(false);
  const cancelado = useRef(false);

  const atualizar = useCallback(async (forcar?: boolean) => {
    if (!forcar && cacheMemoria[chaveCache]?.length) {
      setItens(cacheMemoria[chaveCache]);
      return;
    }
    setCarregando(true);
    try {
      const reqs = await Promise.all(
        categorias.map((c) => api.get(`/products/category/${c}`))
      );
      const combinados = reqs.flatMap(r => r.data.products as Produto[]);
      cacheMemoria[chaveCache] = combinados;
      if (!cancelado.current) setItens(combinados);
    } finally {
      if (!cancelado.current) setCarregando(false);
    }
  }, [categorias, chaveCache]);

  const limparCache = useCallback(() => {
    cacheMemoria[chaveCache] = [];
    setItens([]);
  }, [chaveCache]);

  return useMemo(() => ({
    itens, carregando, atualizar, limparCache
  }), [itens, carregando, atualizar, limparCache]);
}
