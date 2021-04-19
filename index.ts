enum Proficiency {
  Junior = 'junior',
  Regular = 'regular',
  Expert = 'expert'
}

interface Candidate {
  firstName: string,
  lastName: string,
  age: number,
  email: string,
  mainLanguage: string,
  proficiency: Proficiency,
  hobbies: string[]
}

const candidate: Candidate = {
  firstName: 'John',
  lastName: 'Doe',
  age: 29,
  email: 'john.doe@com',
  mainLanguage: 'C#',
  proficiency: Proficiency.Expert,
  hobbies: ['sport','netflix','books']
}

interface Validator {
  isValid(candidate: Candidate): boolean;
}

class emailValidator implements Validator {
  constructor(protected readonly minlength: number){
  }

  isValid({email}: Candidate): boolean {
    return email != null && email.length > this.minlength;
  }
}

class ProficiencyValidator implements Validator {
  constructor(protected readonly candidate: Partial<Candidate>) {}
  isValid({proficiency}: Candidate): boolean{
    if (this.candidate.age < 25) return true;
    return proficiency !== Proficiency.Junior && proficiency !== Proficiency.Regular;
  }
}

function getName({firstName, lastName}: Candidate): string{
  return `${firstName}${lastName}`
}

function processCandidate(candidate: Candidate){
  const fullName = getName(candidate);
  console.log(`Hello${fullName}!`);

  const validators = [new emailValidator(5), new ProficiencyValidator(candidate)];
  const isValid = validators.every(validator => validator.isValid(candidate));

  if (!isValid) return;

  if (candidate.age < 2){
    console.log(`You are too young!`);
    return;
  }

  console.log(`Your resume is being processed!`);
}

processCandidate(candidate);
