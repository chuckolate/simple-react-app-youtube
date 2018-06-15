/* library for searching every half second */
import _ from 'lodash';

/* We need React inside this file due to the concept of Javascript module, each file is separated from one another, unless we specifically say so. the import line finds the library called 'react', which is installed in the node_module folder, and assign it into our variable 'React', this way, we tell the transpiler that this file needs React */
import React, { Component } from 'react';

/* we need ReactDOM instead because we are trying to render something into the DOM, not React */
import ReactDOM from 'react-dom';

/* we need the search package that we downloaded for youtube. since this is not our own component, we do not need the absolute file path */
import YTSearch from 'youtube-api-search';

/* we need to provide a path reference since it is a self created file */
import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_details'

const API_KEY = 'AIzaSyDgPMPsOh5B9hNX_KRZZPGdcNuQCAaqlLI';

/* create a new component. this component should produce some HTML */
/*
	- Code looks like Javascript and HTML
	- const is a ES6 syntax, final value of variable, not gonna change
	- inside the function, there is some HTML looking code, this is called JSX. JSX looks like HTML but really, it is just Javascript
*/
class App extends Component { /* refactored from functional component to have data persistance */
	constructor(props) {
		super(props);

		/* set default state of this component */
		this.state = {
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('surfboards');
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			/* when key and value is same, instead of this 'this.setState({ videos: videos })', we can just do this */
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

		return (
			<div>
				<SearchBar 
					onSearchTermChange={videoSearch} />
				<VideoDetail
					video={this.state.selectedVideo} />
				<VideoList
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos} />
			</div>
		);
	}
	/*
		- we use JSX because it produces the actual HTML that gets inserted inside the DOM when we render it. JSX gets transpiled to vanilla javascript with transpiling
		- JSX allows us to write cleaner, concise code. In ES5, it is more tedius. With more complex components with JSX that produces more HTML, the Javascript gets more complicated and illegible.
	*/
}

/* take this component's generated HTML and put it on the page (in the DOM) */
/* Make sure to initalize an instance of the component class by passing in '<App />' and NOT just 'App' This is also a feature of JSX, to make an instance of a component, just wrap it in JSX tags */
ReactDOM.render(<App />, document.querySelector('.container'));