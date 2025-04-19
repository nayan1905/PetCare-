export interface Pet {
    id?: string;
    name: string;
    species: string;
    age: number;
    vaccinationDate: string;
    commonMedicalProblems?: string;
    careInstructions?: string;
    nextVetVisitDate: string;
  }
  