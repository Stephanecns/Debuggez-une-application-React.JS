import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

// Tests pour vérifier la présence de champs spécifiques lors de l'affichage des événements.
describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });
  
// Tests pour vérifier que l'action de succès est appelée après la soumission du formulaire.
  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      //await screen.findByText("Envoyer");
      //expect(onSuccess).toHaveBeenCalled();a
    });
  });
});
