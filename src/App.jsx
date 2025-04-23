import './css/App.css'
import { Component, createRef } from "react";
import TabHeader from "./components/TabHeader.jsx";
import HomePage from "./components/pages/HomePage.jsx";
import GalleryPage from "./components/pages/GalleryPage.jsx";
import ComicPage from "./components/pages/ComicPage.jsx";
import FormPage from "./components/pages/FormPage.jsx";

const TABS = {
  HOME: { index: 0, title: 'home' },
  GALLERY: { index: 1, title: 'gallery' },
  COMIC: { index: 2, title: 'comic' },
  FORM: { index: 3, title: 'form' },
}

export default class App extends Component {
  
  constructor( props ) {
    super( props );
    createRef()
    this.state = {
      activeTab: TABS.HOME,
    };
    
    this.baseDirectory = import.meta.env.BASE_URL;
  }
  
  onTabChange = tab => {
    let activeTab = TABS[ Object.keys(TABS)[tab] ];
    this.setState({ activeTab: activeTab });
    this.UpdatePage( activeTab );
  }
  
  UpdatePage = activeTab => {
    history.pushState(null, activeTab.title, this.baseDirectory + activeTab.title );
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