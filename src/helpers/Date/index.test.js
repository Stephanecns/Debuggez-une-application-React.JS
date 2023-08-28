// Importation de notre fonction "getMonth" pour tester.
import { getMonth } from "../../helpers/Date";

describe("Date helper", () => {
      // Ce groupe de tests est spécifique à la fonction "getMonth".
    describe("When getMonth is called", () => {
        it("the function return janvier for 2022-01-01 as date", () => {

            // On convertit la chaîne de caractères en un objet Date.
            const dateObj = new Date("2022-01-01");
            // On appelle notre fonction avec cet objet
            const result = getMonth(dateObj);
             // On vérifie que le résultat est bien "janvier".
            expect(result).toEqual("janvier");
        });
        it("the function return juillet for 2022-07-08 as date", () => {
            const dateObj = new Date("2022-07-08");
            const result = getMonth(dateObj);
            expect(result).toEqual("juillet");
        });
    });
})
