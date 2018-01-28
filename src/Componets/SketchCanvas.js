import React, { Component, button } from 'react';
import {SketchField, Tools} from 'react-sketch';

class SketchCanvas extends Component {
	
	_undo = () => {
    this._sketch.undo();  
	};

	_download = () => {
		const url = this._sketch.toDataURL();
		this.props._sendImageData(url);
		this._clear();
	};

	_clear = () => {
		this._sketch.clear();
		this._sketch.setBackgroundFromDataUrl('');
	}


	render() {
		 return (

			<div style={{ flex: 1 }}>
				<div className="Drawing-Buttons">
					<button style={{backgroundColor: "#BA68C8" }} onClick={this._undo}>
						Undo
					</button>
					<button style={{backgroundColor: "#BA68C8" }} onClick={this._clear}>
						Clear
					</button>
				</div>
				<div className="Done-Buttons">
					<button onClick={this._download}>
						Send Drawing
					</button>
				</div>
				<SketchField
				id=""
				backgroundColor="#ffffff"
				height="265px"
				ref={(c) => this._sketch = c} 
				tool={Tools.Pencil} 
				color='black'
				lineWidth={3}/>
				
			</div>
			
		 )
	}
}

export default SketchCanvas;