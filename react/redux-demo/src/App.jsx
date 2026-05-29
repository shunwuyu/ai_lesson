import { connect } from "react-redux"
const App = (props) => {
  const { count, onIncrement } = props
  return (
    <div>
      { count }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    count: state.counter.value
  }
}

const mapActionToProps = (dispatch) => {
  return {
    onIncrement: () => {
      dispatch({ type: "increment" })
    },
  }
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(App)