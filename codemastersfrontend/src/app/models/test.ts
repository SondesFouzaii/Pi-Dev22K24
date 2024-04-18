export class Test {
    id!: number;
    title!:string;
    description!:string;
    image!:string;
    active!:boolean;
    //userTests!:UserTest[];
    questions!:Question[];

  }

  export class Question {
    id!: number;
    question!:string;
    image!:string;
    questionOptions!:QuestionOption[];
    anecdote!:string;
    wikipedia!:string;


  }
  export class QuestionOption {
    id!: number;
    answer!:string;
    iscorrect!:boolean;
    isSelected: boolean = false;
  }