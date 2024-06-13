import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

interface RankingArticulo {
  [key: string]: any;
}

interface UseRankingArticulosProps {
  fechaInicio: string; // formato "yyyy-MM-dd"
  fechaFin: string; // formato "yyyy-MM-dd"
}

const useRankingArticulos = ({
  fechaInicio,
  fechaFin,
}: UseRankingArticulosProps) => {
  const [data, setData] = useState<RankingArticulo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { getAccessTokenSilently } = useAuth0();

  const fetchRankingArticulos = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });
      const response = await fetch(`${import.meta.env.VITE_LOCAL}pedido/ranking-articulos?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result: RankingArticulo[] = await response.json();
      setData(result);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchRankingArticulos };
};

export default useRankingArticulos;
