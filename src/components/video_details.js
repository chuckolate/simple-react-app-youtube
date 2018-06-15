import React from 'react';

const VideoDetail = ({video}) => {
	/* this component does not want to wait for videos to load so this check makes sure if there is no video, it only shows loading. When videos are available, then does the page render what it should look like */
	if(!video) {
		return <div>Loading...</div>
	}

	const videoId = video.id.videoId;
	/* const url = 'https://www.youtube.com/embed/' + videoId; */
	/* with ES6, we can use the backtick to append a variable to the https link */
	const url = `https://www.youtube.com/embed/${videoId}`;

	return (
		<div className="video-detail col-md-8">
			<div className="embed-responsive embed-responsive-16by9">
				<iframe className="embed-responsive-item" src={url}></iframe>
			</div>
			<div className="details">
				<div>
					{video.snippet.title}
				</div>
				<div>
					{video.snippet.description}
				</div>
			</div>
		</div>
	);
};

export default VideoDetail;