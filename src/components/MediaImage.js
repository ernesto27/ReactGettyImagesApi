import React, {Component} from 'react';

class MediaImage extends Component{


	render(){
		return(
			<div className="thumbnail"> 
				<img alt="100%x200" 
					 className="img-responsive"  
					 src={this.props.displaySrc} 
					 data-holder-rendered="true" 
					 
					 /> 
				<div className="caption"> 
					<h3>{this.props.title}</h3> 
					<p></p> 
					<p>
						<a href={this.props.displaySrc} target="_blank" className="btn btn-primary" role="button">Abrir</a> 
						<a href="#" className="btn btn-default" role="button">Button</a>
					</p> 
				</div> 
			</div>
		);
	}
}


export default MediaImage;