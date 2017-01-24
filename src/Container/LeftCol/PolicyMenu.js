import React from 'react';
import PolicyMenu from '../../Components/LeftMenus/PolicyMenu';

const MenuContainer = React.createClass({
  render() {
    return (<PolicyMenu {...this.props} />)
  }
});

module.exports = MenuContainer;
