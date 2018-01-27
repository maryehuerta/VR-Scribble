import React, { Component } from 'react';
import {SketchField, Tools} from 'react-sketch';

class SketchCanvas extends Component {
	render() {
		 return (
				 <SketchField 
						tool={Tools.Pencil} 
						color='black'
						lineWidth={3}/>
		 )
	}
}

export default SketchCanvas;