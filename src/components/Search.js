import React, {Component} from 'react';
import emitter from '../store';

class Search extends Component{
	constructor(props) {
		super(props);
		this.state = {
			q: '',
			querySelected: '',
			order: 'best'
		}

		this.handleSearch = this.handleSearch.bind(this);
		this.handleEnterKey = this.handleEnterKey.bind(this);
		this.doSearch = this.doSearch.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
	}

	handleSearch(e){
		this.setState({
			q: e.target.value
		});
		
	}

	handleEnterKey(e){
		if(e.key === 'Enter'){
			this.doSearch(e);
		}
	}

	handleSelectChange(e){
		this.setState({
			order: e.target.value
		}, () => {
			console.log(this.state)
			emitter.emit('doSearch', this.state.q, this.state.order);
		});
	}

	doSearch(){
		if(!this.state.q) return false;
		emitter.emit('doSearch', this.state.q, this.state.order);
	}


	render(){
		return(
			<div className="row">
		        <h1>Buscar en gettyimages api</h1>
		        <div className="col-md-10">
		        	<label>Ordernar por</label>
		        	<select className="form-control"
		        			value={this.state.best}
		        			onChange={this.handleSelectChange}>
					  <option value="best">Mejor</option>
					  <option value="most_popular">Mas popular</option>
					  <option value="newest" >Nuevo</option>
					</select>

					<br />

		            <input type="text" 
		            	   className="form-control" id="" placeholder="Ingresa tag" 
		            	   onChange={this.handleSearch}
		            	   onKeyPress={this.handleEnterKey}
		            	   value={this.state.q}
		            	   />

		            <div className="pull-right"
		            	 style={{marginTop: '10px'}}>
		              <button type="submit" className="btn btn-primary" onClick={this.doSearch}>Buscar</button>
		            </div>
		        </div>
		    </div>
		);
	}
}


export default Search;