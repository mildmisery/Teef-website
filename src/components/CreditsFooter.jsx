import { Component } from "react";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
// import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import vgenIcon from '../assets/icons/VGen-icon.png?inline';
import redbubbleIcon from '../assets/icons/redbubble-icon.svg';


library.add(fab, fas);

export default class CreditsFooter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className={"socialsList"}>
          { this.renderIcon( true, 'fa-brands fa-twitter', 'https://x.com/teefs_art/') }
          { this.renderIcon( true, 'fa-brands fa-bluesky', 'https://bsky.app/profile/teefs.bsky.social') }
          { this.renderIcon( true, 'fa-brands fa-instagram', 'https://www.instagram.com/teefs_art/') }
          { this.renderIcon( true, 'fa-brands fa-tiktok', 'https://www.tiktok.com/@teefs_art') }
          { this.renderIcon( false, vgenIcon, 'https://vgen.co/teefs_art') }
          { this.renderIcon( false, redbubbleIcon, 'https://www.redbubble.com/people/teefsart/shop') }
        </div>
        <p className={'footerCopyright'}>My name teef &#169; {(new Date()).getFullYear()}</p>
      </>
    )
  }
  
  renderIcon( isFa, icon, link) {
    return (
      <a href={ link } className={ 'socialAnchor' } target={ '_blank' } rel={ 'noopener noreferrer' }>
        { isFa
          ? <FontAwesomeIcon className={ 'socialIcon' } icon={ icon } size={"3x"} />
          : <img className={ 'socialIconImage' } src={ icon } alt={ 'Social media icon' } />
        }
      </a>
    )
  }
}