import Footer from '../ui/Footer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// const mapStateToProps = ({ app }, props) => {
// 	const { loggedIn } = app
// 	return {
// 		loggedIn
// 	}
// }

// const mapDispatchToProps = dispatch =>
// 	({
// 		logout() {
// 			dispatch(
// 				logout()
// 			)
// 		}
// 	})

export default connect()(Footer);
