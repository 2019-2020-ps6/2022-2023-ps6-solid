import {E2EComponentFixture} from "../../../e2e/e2e-component.fixture";

export class AccueilPFixtureil extends E2EComponentFixture {

  BoutonCreer(){
    return this.page.getByRole(('button'), {name:'Créer un quizz'});
  }

  BoutonGestion(){
    return this.page.getByRole(('button'), {name:'Gestion des patients'});
  }

  BoutonConsulterQuizz(){
    return this.page.getByRole(('button'), {name:'Consulter les quizz'});
  }



}
