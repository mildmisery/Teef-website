import { Component } from "react";
import PropTypes from "prop-types";

export default class GalleryPage extends Component {
  constructor( props ) {
    super( props );
    
    this.filesByDirectory = this.getFilesByDirectory();
  }
  
  getFilesByDirectory() {
    // dynamic can be: const module = await import(`./dir/${file}.js`)
    const files = import.meta.glob(
      [
        // '/gallery/**/*.{png,jpg,jpeg,PNG,JPEG}',
        '/src/gallery/**/*.{png,jpg,jpeg,PNG,JPEG}'
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
  
  render() {
    return (
      <>
        {Array.from( Object.keys( this.filesByDirectory ) ).map( ( directory, index ) => {
          return <GalleryCard directory={directory} files={this.filesByDirectory[directory]} key={index}/>
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
    let baseUrl = (import.meta.env.BASE_URL).slice(0, -1);
    
    return (
      <div className="card">
        <h1>{this.title}</h1>
        <div className={'galleryContainer'}>
          {Object.values( this.files ).map( ( file, index ) => {
            return ( <img className={'galleryImg'} alt={"Teef's wonderful art"} src={baseUrl + file} key={index}/> )
          } )}
        </div>
      
      </div>
    )
  }
}


GalleryCard.propTypes = {
  directory: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
};