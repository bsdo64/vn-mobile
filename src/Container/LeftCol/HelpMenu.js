import React from 'react';
import HelpMenu from '../../Components/LeftMenus/HelpMenu';

const MenuContainer = React.createClass({
  render() {
    return (<HelpMenu {...this.props} />)
  }
});

module.exports = MenuContainer;
