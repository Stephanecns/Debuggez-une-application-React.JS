import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

// EventList est un composant React qui liste des événements.
// Il utilise un filtre basé sur le type d'événement et une pagination pour afficher ces événements.

const PER_PAGE = 9;

const EventList = () => {
   // Utilise le hook useData pour obtenir les données des événements et une éventuelle erreur.
  const { data, error } = useData();
    // Gère le type d'événement actuellement sélectionné pour le filtrage. Initialisé à null (pas de filtrage).
  const [type, setType] = useState(null);
  // Gère la page actuelle de la pagination. Initialisé à 1 (première page).
  const [currentPage, setCurrentPage] = useState(1);
  // Filtrer les événements en fonction du type sélectionné et de la page actuelle.
  // Si type est undefined ou null, aucun filtrage n'est appliqué
  const filteredEvents = (
    (!type
      ? data?.events
      : data?.events) || []
  ).filter((event, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      // Ajouter un filtre sur les type d'événement
      return type === undefined || event.type === type || type === null;
    }
    return false;
  });
    // Modifie le type d'événement pour le filtrage et réinitialise la pagination.
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  // Calcule le nombre total de pages en fonction du nombre d'événements filtrés.
  // Utilise Math.floor pour obtenir un nombre entier, et ajoute 1 pour assurer qu'il y a au moins une page.
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
    // Crée un ensemble unique de tous les types d'événements disponibles dans les données.
  // Ceci est utilisé pour alimenter le composant Select pour le filtrage par type.
  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
