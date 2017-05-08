import React, {Component} from 'react';
import MediaImage from './MediaImage';
import config from '../config';
import emitter from '../store';

class ListResults extends Component{


	constructor(props) {
		super(props);

		this.state = {
			q: 'game of thrones',
			order: 'best',
			atBottom: false,
			page: 1,
			isLoading: true,
			noResults: false,
			results: [
				{ display_sizes: [{ uri: ''}] }
			]
		}

		this.handleScroll = this.handleScroll.bind(this);

	}

	componentWillMount() {
		this.fetchData();
	}

	componentDidMount() {
		emitter.addListener('doSearch', (q, order) => {
			this.setState({
				isLoading: true,
				q: q,
				order: order
			}, () => {
				this.fetchData();
			});

		});
	
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUpdate(nextProps, nextState) {
		if(nextState.q != this.state.q || nextState.order != this.state.order){
			// reset page number
			this.setState({ page: 1 });
		}
	}


	handleScroll() {
	    if (this.state.isLoading) return null;

	    const scrolled = window.scrollY;
	    const viewportHeight = window.innerHeight;
	    const fullHeight = document.body.clientHeight;

	    if (!(scrolled + viewportHeight + 555 >= fullHeight)) {
	      return null;
	    }

	    console.log('do search')

	    this.setState({ isLoading: true, page: this.state.page + 1 }, () => {
	    	this.fetchData();
	    });
	}


	fetchData(){
		if(!this.state.q) return false;
		fetch(config.apiEndpoint + '?fields=id,title,thumb,display_set&page=' + this.state.page + 
						      '&sort_order='+ this.state.order +'&phrase=' + this.state.q, {
			headers: {'Api-Key' : config.apiKey}
		})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data)
			if(data.ErrorCode == 'InvalidPage' || data.result_count === 0){
				this.setState({
					isLoading: false,
					noResults: true
				});
				return false;
			}

			var results = (this.state.page == 1) ? data.images : this.state.results.concat(data.images);
			this.setState({ 
				results: results,
				isLoading: false ,
				noResults: false,
				atBottom: false
			});
			
		})

		.catch((error) =>  {
			
	    });	
	}


	render(){
		var loading = '';
		if(this.state.isLoading){
			loading = <p><img src="loading.gif" /></p>;
			if(this.state.page === 1) return loading;
		}

		var noResults = '';
		if(this.state.noResults){
			noResults = <p> No se encontraron resultados...</p>;
		}

		return(
			<div className="row">
				<br />
				<div className="col-md-10">
					{ this.state.results.map((item, key) => 
						<MediaImage key={key} 
								    title={item.title} 
								    displaySrc={item.display_sizes[0].uri}/>
					)}
					{loading} 
					{noResults}
					<br />
				</div>
				
			</div>
		);
	}
}


export default ListResults;