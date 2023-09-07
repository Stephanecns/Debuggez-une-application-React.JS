import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Home from "./index";

// Tests pour vérifier la présence de champs spécifiques lors de l'affichage du formulaire.
describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  // Tests pour vérifier le comportement après la soumission du formulaire.
  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      // j'ai utilisé la méthode waitFor pour attendre que le texte "Message envoyé !" apparaisse dans le document.
      await waitFor(() => {
        expect(screen.getByText("Message envoyé !")).toBeInTheDocument();
      });
    });
  });
});

describe("When a page is created", () => {
  // Avant chaque test, on rend le composant Home pour s'assurer qu'il est chargé et prêt à être testé
  beforeEach(() => {
    render(<Home />);
  });
  it("a list of events is displayed", () => {
    // On s'attend à ce que le texte "Nos réalisations" apparaisse exactement deux fois sur la page
    expect(screen.getAllByText("Nos réalisations")).toHaveLength(2);
  });
  it("a list a people is displayed", () => {
    // On s'attend à ce que le texte d'introduction de la section "Notre équipe" soit présent sur la page
    expect(
      screen.getByText(
        "Une équipe d’experts dédiés à l’ogranisation de vos événements"
      )
    ).toBeInTheDocument();
  });
  it("a footer is displayed", () => {
    // On s'attend à ce que le texte "Contactez-nous" soit présent dans le footer
    expect(screen.getByText("Contactez-nous")).toBeInTheDocument();
  });
  it("an event card, with the last event, is displayed", () => {
    // On s'attend à ce que le titre de la section affichant le dernier événement soit présent sur la page
    expect(screen.getByText("Notre derniére prestation")).toBeInTheDocument();
  });
});
