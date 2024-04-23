import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { IItem } from '../types/Table/TableItem';

const useFilteredData = (data: IItem[]) => {

  const [filteredData, setFilteredData] = useState<IItem[]>([]);

  const selector = useSelector((state: RootState) => state.search.search);

  useEffect(() => {
    if (data && data.length > 0 && selector) {
      const filtered = data.filter(item => item.nombre.toLowerCase().includes(selector.toLowerCase()));
      setFilteredData(filtered);

    }
  }, [data, selector]);

  return filteredData;
};

export default useFilteredData;
