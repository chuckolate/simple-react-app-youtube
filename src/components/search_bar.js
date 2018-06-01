import React, { Component } from 'react';

/* functional component, because it is one function that we call that would return some plain JSX:
	const SearchBar = () => {
		return <input />
	};
*/

/* class component, when you want a component to have an internal record keeping. Allows this component to communicate with other components. Extending it gives SearchBar a bunch of functionalities from the React Component class */
class SearchBar extends Component { 
	constructor(props) {
		super(props);

		this.state = { term: '' }; /* everytime user types in the input, this.state.term becomes the value of the input */
	}

	/* by default, each class should have a render method */
	render() {
		/* never do 'this.state.term = event.target.value' ALWAYS USE 'set.State()' */
		return (
			<div className="search-bar">
				<input
					value={this.state.term} /* controlled form component, value only changes when state changes */
					onChange={event => this.onInputChange(event.target.value)} />
			</div>
		);

		/* we want to add an event listener to see when the text in the input changes. onChange is a special react defined property, there are different properties properties based on the event. Pass in the function that you want to occur when the input chages */
	}

	/* we want to handle changes to the input when user types something in  */
	// onInputChange(event) {
	// 	console.log(event.target.value);
	// }

	onInputChange(term) {
		this.setState({term});
		this.props.onSearchTermChange(term); /* call back function */
	}
}

/* export allows this component to be used all around the project */
export default SearchBar;