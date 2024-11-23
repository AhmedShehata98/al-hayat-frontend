const ANSWER_SYMBOL = "|"
const QUESTION_SYMBOL = "~"

export function stringifyCategoryAnswers (answers = []){
  return answers.join(ANSWER_SYMBOL)
}
export function parseCategoryAnswers (answers = ""){
  return answers.split(ANSWER_SYMBOL)
}
export function stringifyCategoryQuestions (answers = []){
  return answers.join(QUESTION_SYMBOL)
}
export function parseCategoryQuestions (answers = ''){
  return answers.split(QUESTION_SYMBOL)
}