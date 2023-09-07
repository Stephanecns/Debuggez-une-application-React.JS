import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo  // Importez useMemo
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  //  Initialise last avec null
  const [last, setLast] = useState(null);
  
  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
  }, []);
  
  useEffect(() => {
    if (data && data.events) { // Vérifie que data et data.events existent
      setLast(data.events.sort((evtA, evtB) =>
          new Date(evtA.date) < new Date(evtB.date) ? -1 : 1)[0]
      );
      return;
    }
    getData();
  }, [data]);
  

  const value = useMemo(() => ({
    data,
    error,
    last,
  }), [data, error, last]);  // Utilisez useMemo pour mémoriser l'objet
  
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
