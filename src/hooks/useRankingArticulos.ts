import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { BackendMethods } from "../services/BackendClient";
import { errorGenerico } from "../components/toasts/ToastAlerts";
import { useParams } from "react-router-dom";

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

  const backend = new BackendMethods();

  const {idSucursales} = useParams();

  const [data, setData] = useState<RankingArticulo[] | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const { getAccessTokenSilently } = useAuth0();

  const fetchRankingArticulos = async () => {
    setLoading(true);
    setError(null);

    try {
      const res: RankingArticulo[] = await backend.getAll(`${import.meta.env.VITE_LOCAL}pedido/ranking-articulos/${idSucursales}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, getAccessTokenSilently) as RankingArticulo[]
      console.log(res)
      setData(res)
      setLoading(false)
    } catch (error) {
      console.error(error)
      errorGenerico("Ocurrió un error al traer los rankings")
    }
  };

  return { data, loading, error, fetchRankingArticulos };
};

export default useRankingArticulos;
