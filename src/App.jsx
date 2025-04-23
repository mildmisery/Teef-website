import './css/App.css'
import { Component } from "react";
import TabHeader from "./components/TabHeader.jsx";
import HomePage from "./components/pages/HomePage.jsx";
import GalleryPage from "./components/pages/GalleryPage.jsx";
import ComicPage from "./components/pages/ComicPage.jsx";
import FormPage from "./components/pages/FormPage.jsx";

const TABS = {
  HOME: { index: 0, title: 'Home' },
  GALLERY: { index: 1, title: 'Gallery' },
  COMIC: { index: 2, title: 'Comic' },
  FORM: { index: 3, title: 'Form' },
}

export default class App extends Component {
  state = {
    activeTab: TABS.HOME,
  }
  
  constructor( props ) {
    super( props );
    
    this.activeTab = TABS.HOME;
    this.checkState();
    this.baseDirectory = import.meta.env.BASE_URL;
  }
  
  componentDidMount() {
    this.setState( { activeTab: this.activeTab } );
    window.addEventListener( 'popstate', this.onPopState );
  }
  
  checkState() {
    let path = window.location.pathname;
    let activeTab = TABS[ Object.keys(TABS).find( key => path.includes( TABS[key].title ) ) ];
    if ( activeTab ) {
      this.activeTab = activeTab;
    }
  }
  
  onTabChange = tab => {
    let activeTab = TABS[ Object.keys(TABS)[tab] ];
    this.SetActiveTab( activeTab );
  }
  
  UpdatePage = activeTab => {
    // This updates the state of the page, and edits the URL, but it breaks github pages to have a URL other than the root
    // history.pushState(null, activeTab.title, this.baseDirectory + activeTab.title );
    history.pushState(null, activeTab.title );
    return null;
  }
  
  SetActiveTab = ( activeTab ) => {
    this.setState({ activeTab: activeTab });
    this.UpdatePage( activeTab );
  }
  
  onPopState = () => {
    this.checkState();
    this.setState({ activeTab: this.activeTab });
  }

  render() {
    return (
      <div className={'AppMainBody'}>
        <TabHeader onTabChange={ this.onTabChange } activeTab={ this.state.activeTab.index } />
        {{
          [TABS.HOME.index]: ( <HomePage /> ),
          [TABS.GALLERY.index]: ( <GalleryPage /> ),
          [TABS.COMIC.index]: ( <ComicPage /> ),
          [TABS.FORM.index]: ( <FormPage /> ),
        }[this.state.activeTab.index] }
      </div>
    )
  }
}