import { Component, createRef } from "react";
import PropTypes from "prop-types";

export default class GalleryPage extends Component {
  state = {
    shadowBoxImage: null,
    currentZoom: 1,
    stepSize: 0.1,
    minZoom: 0.6,
    maxZoom: 3,
    minDrag: 5,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragStartOffsetX: 0,
    dragStartOffsetY: 0,
    imageOffsetX: 0,
    imageOffsetY: 0,
    windowOffset: null,
  }
  
  constructor( props ) {
    super( props );
    
    this.filesByDirectory = this.getFilesByDirectory();
    this.shadowBoxImageRef = createRef();
  }
  
  getFilesByDirectory() {
    // dynamic can be: const module = await import(`./dir/${file}.js`)
    const files = import.meta.glob(
      [
        '/gallery/**/*.{png,jpg,jpeg,PNG,JPEG}',
        '/public/gallery/**/*.{png,jpg,jpeg,PNG,JPEG}'
      ],
      { eager: true, import: 'default' }
    ); // /src/assets/gallery/**/*
    const filesByDirectory = {};
    
    Object.keys( files ).forEach( file => {
      const parts = file.split( '/' );
      parts.pop(); // Remove the file name
      const dir = parts.join( '/' );
      
      if ( !filesByDirectory[dir] ) {
        filesByDirectory[dir] = [];
      }
      filesByDirectory[dir].push( file );
    } );
    
    return filesByDirectory;
  }
  
  shadowBoxImage = ( file ) => {
    let windowOffset = window.scrollY;
    this.setState( {
      shadowBoxImage: file,
      currentZoom: 1,
      imageOffsetX: 0,
      imageOffsetY: 0,
    } );
    
    if ( file ) {
      document.body.setAttribute( 'style',
        `position: fixed; top: -${windowOffset}px; left: 0; right: 0;`);
      this.setState( {
        windowOffset: windowOffset,
      } );
    } else {
      document.body.setAttribute( 'style', '' );
      window.scrollTo( 0, this.state.windowOffset );
      this.setState( {
        windowOffset: null,
        imageOffsetX: 0,
        imageOffsetY: 0,
      } );
    }
  }
  
  onScrollImage = ( event ) => {
    let direction = event.deltaY > 0 ? -1 : 1;
    let newZoom = this.state.currentZoom + direction * this.state.stepSize;
    newZoom = Math.max( this.state.minZoom, Math.min( newZoom, this.state.maxZoom ) );
    this.setState( {
      currentZoom: newZoom
    }, this.transformImage );
  }
  
  onImageClick = ( event ) => {
    event.stopPropagation();
    this.setState({
      currentZoom: 1,
    }, this.transformImage );
  }
  
  onMouseDownImage = (event) => {
    if (this.state.currentZoom > 1) {
      this.setState({
        isDragging: true,
        dragStartX: event.clientX,
        dragStartY: event.clientY,
        dragStartOffsetX: event.clientX,
        dragStartOffsetY: event.clientY,
        imageOffsetX: this.state.imageOffsetX || 0,
        imageOffsetY: this.state.imageOffsetY || 0,
      });
      this.shadowBoxImageRef.current.style.cursor = 'grabbing';
    } else {
      this.onImageClick(event);
    }
  };
  
  onMouseMoveImage = (event) => {
    if (this.state.isDragging) {
      const deltaX = (event.clientX - this.state.dragStartOffsetX) / this.state.currentZoom;
      const deltaY = (event.clientY - this.state.dragStartOffsetY) / this.state.currentZoom;
      
      this.setState({
        imageOffsetX: this.state.imageOffsetX + deltaX,
        imageOffsetY: this.state.imageOffsetY + deltaY,
        dragStartOffsetX: event.clientX,
        dragStartOffsetY: event.clientY,
      }, this.transformImage);
      
      // this.transformImage();
    }
  };
  
  onMouseUpImage = (event ) => {
    if (this.state.isDragging) {
      const deltaX = Math.abs(event.clientX - this.state.dragStartX);
      const deltaY = Math.abs(event.clientY - this.state.dragStartY);
      
      if (deltaX < this.state.minDrag && deltaY < this.state.minDrag) {
        // Treat as a click
        this.onImageClick(event);
      }
      
      this.setState({
        isDragging: false,
      });
      this.shadowBoxImageRef.current.style.cursor = 'grab';
    }
  };
  
  transformImage = () => {
    const container = this.shadowBoxImageRef.current.parentElement;
    const image = this.shadowBoxImageRef.current;

    const scaledWidth = image.offsetWidth * this.state.currentZoom;
    const scaledHeight = image.offsetHeight * this.state.currentZoom;
    
    const maxOffsetX = Math.max(0, (scaledWidth - container.offsetWidth) / ( 2 * this.state.currentZoom ));
    const maxOffsetY = Math.max(0, (scaledHeight - container.offsetHeight) / ( 2 * this.state.currentZoom ));

    const newOffsetX = Math.max(-maxOffsetX, Math.min(maxOffsetX, this.state.imageOffsetX));
    const newOffsetY = Math.max(-maxOffsetY, Math.min(maxOffsetY, this.state.imageOffsetY));

    this.setState({
      imageOffsetX: newOffsetX,
      imageOffsetY: newOffsetY,
    }, () => {
      this.shadowBoxImageRef.current.style.transform = `
        scale(${this.state.currentZoom})
        translate(${newOffsetX}px, ${newOffsetY}px)
      `;
    });
  }
  
  render() {
    return (
      <>
        {this.state.shadowBoxImage &&
          <div className={'shadowBox'} onClick={() => { this.shadowBoxImage( null ) }} >
            <span className={'shadowBoxClose'}>&times;</span>
            <div className={'shadowBoxImgContainer'} onWheel={ this.onScrollImage }>
              <img
                ref={this.shadowBoxImageRef}
                src={this.state.shadowBoxImage}
                alt={"Full Screen Image"}
                className={'shadowBoxContent'}
                onMouseDown={this.onMouseDownImage}
                onMouseMove={this.onMouseMoveImage}
                onMouseUp={this.onMouseUpImage}
                onMouseLeave={this.onMouseUpImage}
                onClick={ e => e.stopPropagation() }
                onDrag={ e => e.preventDefault() }
                onDragStart={ e => e.preventDefault()}
              />
            </div>
          </div>
          
        }
        
        {Array.from( Object.keys( this.filesByDirectory ) ).map( ( directory, index ) => {
          return <GalleryCard directory={directory} files={this.filesByDirectory[directory]} key={index}
            onClickCallback={ this.shadowBoxImage } />
        } )}
      </>
    )
  }
}

class GalleryCard extends Component {
  constructor( props ) {
    super( props );
    
    this.title = this.getTitle();
    // this.files = this.getFiles();
    this.files = this.props.files;
  }
  
  getTitle() {
    const parts = this.props.directory.split( '/' );
    let title = parts[parts.length - 1];
    title = title.charAt( 0 ).toUpperCase() + title.slice( 1 );
    return title;
  }
  
  render() {
    let baseUrl = ( import.meta.env.BASE_URL ).slice( 0, -1 );
    
    return (
      <div className="card">
        <h1>{this.title}</h1>
        <div className={'galleryContainer'}>
          {Object.values( this.files ).map( ( file, index ) => {
            let filepath = baseUrl + file;
            if ( import.meta.env.PROD ) {
              const parts = file.split( '/' ); // Split the string into an array
              const filteredParts = parts.filter( part => part !== 'public' ); // Remove 'public'
              filepath = filteredParts.join( '/' ); // Reconstruct the string
            }
            
            return (
              <img
                className={'galleryImg'}
                alt={"Teef's wonderful art"}
                src={filepath}
                onClick={ () => this.props.onClickCallback(filepath) }
                key={index}
              /> )
          } )}
        </div>
      
      </div>
    )
  }
}


GalleryCard.propTypes = {
  directory: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  onClickCallback: PropTypes.any,
};