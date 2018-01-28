import React, { Component, button } from 'react';
import {SketchField, Tools} from 'react-sketch';

function trim(c) {
  var ctx = c.getContext('2d'),
    copy = document.createElement('canvas').getContext('2d'),
    pixels = ctx.getImageData(0, 0, c.width, c.height),
    l = pixels.data.length,
    i,
    bound = {
      top: null,
      left: null,
      right: null,
      bottom: null
    },
    x, y;

  for (i = 0; i < l; i += 4) {
    if (pixels.data[i+3] !== 0) {
      x = (i / 4) % c.width;
      y = ~~((i / 4) / c.width);
  
      if (bound.top === null) {
        bound.top = y;
      }
      
      if (bound.left === null) {
        bound.left = x; 
      } else if (x < bound.left) {
        bound.left = x;
      }
      
      if (bound.right === null) {
        bound.right = x; 
      } else if (bound.right < x) {
        bound.right = x;
      }
      
      if (bound.bottom === null) {
        bound.bottom = y;
      } else if (bound.bottom < y) {
        bound.bottom = y;
      }
    }
  }
    
  var trimHeight = bound.bottom - bound.top,
      trimWidth = bound.right - bound.left,
      trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);
  
  copy.canvas.width = trimWidth;
	copy.canvas.height = trimHeight;
  copy.putImageData(trimmed, 0, 0);
  
  // open new window with trimmed image:
  return copy.canvas;
}

function saveAs(uri, filename) {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);
    
    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

class SketchCanvas extends Component {
	
	_undo = () => {
    this._sketch.undo();  
	};

	_download = () => {
		const url = trim(this._sketch._canvas).toDataURL();
		this.props._sendImageData(url);
		this._clear();
	};

	_clear = () => {
		this._sketch.clear();
		this._sketch.setBackgroundFromDataUrl('');
	}

	_save = () => {
		const t = trim(this._sketch._canvas).toDataURL();

		// const x = this._sketch.toDataURL();
		saveAs(t, new Date().getTime() + '.png');
		// var url = t.replace(/^data:image\/[^;]/, 'data:image/png');
    // window.location.href = url;
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
				<button onClick={this._save}>
						save
					</button>
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