import { Component, createRef } from "react";
import { default as commissionSheetImg } from '@assets/commission sheet.jpg';

export default class FormPage extends Component {
 
  render() {
    return (
      <div className="card">
        <div className={'contactFormContainer'} >
          <div className={'contactFormColumn'}>
            <p>If you&#39;re interested in commissioning me for art, you can fill out this form to send me a message</p>
            <p>Alternatively, use the VGen link in the footer to commission to see the the services I offer</p>
            <img className={'commissionSheetImg'} src={commissionSheetImg}
              alt={'Commission Sheet detailing services and prices offered'} />
          </div>
          
          <div className={'contactFormColumn'}>
            <ContactForm />
          </div>
        </div>
      </div>
    );
  }
}

class ContactForm extends Component {
  
  constructor(props) {
    super( props );
    this.fileInputRef = createRef(); // Create a ref for the file input
    this.state = {
      selectedFiles: [],
    };
  }
  
  onSubmit = async ( event ) => {
    event.preventDefault();
    const formData = new FormData( event.target );
    console.log( 'formData ', formData );
    
    // const response = await fetch( 'https://formspree.io/f/xanoyvob', {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     'Accept': 'application/json',
    //   },
    // });
    //
    // if ( response.ok ) {
    //   alert( 'Form submitted successfully!' );
    // } else {
    //   alert( 'There was a problem submitting the form.' );
    // }
  }
  
  onFileChange = ( event ) => {
    const files = Array.from( event.target.files );
    this.setState({ selectedFiles: files });
  }
  
  onFilePreviewClick = ( index ) => {
    const { selectedFiles } = this.state;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = [...selectedFiles];
      newFiles.splice(index, 1);
      this.setState({ selectedFiles: newFiles });
      
      // Update the file input with the new file list
      const dataTransfer = new DataTransfer();
      newFiles.forEach((file) => dataTransfer.items.add(file));
      this.fileInputRef.current.files = dataTransfer.files;
    }
  }
  
  render() {
    return (
      <div className={'contactFormContainer'}>
        {/*<form className={'contactForm'} action="https://formspree.io/f/xanoyvob" method="POST" encType="multipart/form-data">*/}
        <form className={'contactForm'} onSubmit={this.onSubmit} encType="multipart/form-data" >
          <FormField type={'text'} name={'test'} label={'Test Field'} />
          
          <div className={'contactFormInput'}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
          </div>
          
          <div className={'contactFormInput'}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
          
          <div className={'contactFormInput'}>
            <label htmlFor="message">Description</label>
            <textarea id="message" name="message" ></textarea>
          </div>
          
          <div className={'contactFormInput'}>
            <label htmlFor="reference">References</label>
            <input type="url" id="reference" name="referenceURL" placeholder={"Url to image or gallery"} />
            <input
              type="file"
              id="reference"
              name="reference"
              multiple={true}
              accept={'image/*'}
              onChange={ this.onFileChange}
              ref={this.fileInputRef}
            />
            
            { this.state.selectedFiles &&
              <div className="attachmentsPreview">
                { this.state.selectedFiles.map( (file, index) => {
                  return (
                    <div key={file.name} className="filePreview">
                      <span className={'filePreviewClose'} onClick={ () => this.onFilePreviewClick(index) }>&times;</span>
                      <img src={URL.createObjectURL(file)} alt={file.name} />
                      <p>{file.name}</p>
                    </div>
                  );
                }) }
              </div>
            }
            
          </div>
          
          <button type="submit">Submit</button>
        </form>
        
        <div className={'contactFormDisclaimer'}>
          <p>Your information will be kept private and not shared with anyone.</p>
          <p>I will respond to your message as soon as possible!</p>
        </div>
      </div>
    );
  }
}

class FormField extends Component {
  constructor( props ) {
    super( props );
    
    this.state = {
      value: '',
      error: false,
    };
  }
  
  handleChange = ( event ) => {
    this.setState( { value: event.target.value } );
  }
  
  render() {
    return (
      <div className={'contactFormInput'}>
        <label
          htmlFor={ this.props.name } >
          { this.props.label }
          { this.props.required && <span className={'required'}>*</span> }
        </label>
        
        <input
          type={ this.props.type }
          id={ this.props.name }
          name={ this.props.name }
          value={this.state.value}
          onChange={this.handleChange}
          required={this.props.required} />
        
        { this.props.children }
      </div>
    );
  }
}