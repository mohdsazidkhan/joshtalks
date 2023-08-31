const initialState = {
  userAnswers: [],
  score: 0,
}
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ANSWER":
    return {
      userAnswers : [
        ...state.userAnswers,
        action.payload
      ]
    }
    case "SET_SCORE":
      return {
        ...state,
        score: action.score
      }
    default:
      return state
  }
}
export default Reducer