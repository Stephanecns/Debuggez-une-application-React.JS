export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};
// +1 sert à ajuster l'index du mois de à 1-12 pour correspondre aux clés de l'objet MONTHS.
export const getMonth = (date) => MONTHS[date.getMonth() + 1];
