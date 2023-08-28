// Importation des hooks et dépendances nécessaires
import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

// Définition du composant Slider
const Slider = () => {
  // Récupération des données du contexte
  const { data } = useData();

  // État pour suivre l'index du slide actuellement affiché
  const [index, setIndex] = useState(0);

  // Crée une copie du tableau 'data.focus' pour éviter de modifier le tableau original
  const byDateDesc = [...(data?.focus || [])].sort(
    (evtA, evtB) => new Date(evtA.date) < new Date(evtB.date)
  );

  // Fonction pour avancer au slide suivant ou revenir au premier
  // Ajuste la condition pour éviter un dépassement d'index.
  // Les indices commencent à 0, donc nous comparons à 'byDateDesc.length - 1' au lieu de 'byDateDesc.length'.

  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  };

  // Cycle automatiquement à travers les slides
  useEffect(() => {
    nextCard();
  }, [index]);

  // Rendu du slider avec ses slides et la pagination
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.id}>
          <div
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
              {byDateDesc.map((_, radioIdx) => {
                // Création d'une clé unique pour chaque input de type radio
                // Cette clé combine l'ID de l'événement et l'index du radio
                // L'utilisation de l'underscore `_` indique que nous n'utilisons pas activement
                // l'élément actuel du tableau dans le corps de cette fonction.
                // En revanche, nous sommes intéressés par le second argument, `radioIdx`,
                // qui nous donne l'index actuel de l'élément dans le tableau.
                const uniqueKey = `${event.id}-radio-${radioIdx}`;

                // Rendu de l'input radio pour la pagination
                // La radio est cochée si son index correspond à l'index du slide actuellement affiché
                return (
                  <input
                    key={uniqueKey}
                    type="radio"
                    name="radio-button"
                    // Remplacement de idx par index 
                    // Ajustement du bouton radio 'checked'. Utilisez 'index' pour refléter le slide actuellement visible.
                    // contrairement à idx, index permet d'avoir un état constant qui s'adapte au changement d'état 
                    checked={index === radioIdx}
                    readOnly
                  />
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
