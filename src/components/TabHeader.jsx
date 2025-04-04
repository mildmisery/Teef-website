import { Component } from "react";
import PropTypes from 'prop-types';

export default class TabHeader extends Component {
  
  constructor( props ) {
    super( props );
  }
  
  render() {
    return (
      <menu className={'tabContainer'}>
        <TabButton active={this.props.activeTab === 0} onClick={() => this.props.onTabChange(0)}>Home</TabButton>
        <TabButton active={this.props.activeTab === 1} onClick={() => this.props.onTabChange(1)}>Gallery</TabButton>
        <TabButton active={this.props.activeTab === 2} onClick={() => this.props.onTabChange(2)} className={'disabled'}>Comic (Coming Soon!)</TabButton>
        <TabButton active={this.props.activeTab === 3} onClick={() => this.props.onTabChange(3)}>Form</TabButton>
      </menu>
    )
  }
}

TabHeader.propTypes = {
  activeTab: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired,
};


class TabButton extends Component {
  
  constructor( props ) {
    super( props );
  }
  
  render() {
    return (
      <li {...( this.props.active ? { className: 'active' } : {})} onClick={this.props.onClick}>
        {this.props.children}
      </li>
    )
  }
}

TabButton.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};