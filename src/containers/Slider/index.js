// Importation des hooks et dépendances nécessaires
import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

// Définition du composant Slider
const Slider = () => {
  const { data } = useData();

   // Récupération des données depuis le contexte global
  const [index, setIndex] = useState(0);

    // Triage des événements par date en ordre décroissant
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

   // Fonction pour avancer au slide suivant ou revenir au premier
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length ? index + 1 : 0),
      5000
    );
  };

  
  // Exécute la fonction nextCard après chaque rendu du composant
  useEffect(() => {
    nextCard();
  });

  // Rendu du slider avec ses slides et la pagination
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${event.id}`}
                  type="radio"
                  name="radio-button"
                  checked={idx === radioIdx}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
