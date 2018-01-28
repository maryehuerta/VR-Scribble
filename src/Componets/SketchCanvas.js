import React, { Component, button } from 'react';
import {SketchField, Tools} from 'react-sketch';

class SketchCanvas extends Component {
	_undo = () => {
    this._sketch.undo();  
	};
	_download = () => {
		const DataURL = this._sketch.toDataURL();
		console.log(DataURL);
	};
	render() {
		 return (

			<div>
				<button
					onClick={this._undo}
					className="button">
					Undo
				</button>
				<button 
					onClick={this._download}
					className="button">
					Done!
				</button>
				<SketchField
				id=""
				height= "100px"
				ref={(c) => this._sketch = c} 
				tool={Tools.Pencil} 
				color='black'
				lineWidth={3}/>
			</div>
			
		 )
	}
}

export default SketchCanvas;