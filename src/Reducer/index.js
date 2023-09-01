const initialState = {
  userAnswers: []
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
    default:
      return state
  }
}
export default Reducer