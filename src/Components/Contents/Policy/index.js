/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React, { PropTypes } from 'react';
import Privacy from './Privacy';
import Terms from './Terms';

require('./index.scss');
const PolicyBox = React.createClass({
  displayName: 'PolicyBox',
  propTypes: {
    location: PropTypes.object.isRequired,
  },

  getEndpoint(location) {
    return location.pathname.split('/')[2];
  },
  render() {
    const { location } = this.props;
    const endPoint = this.getEndpoint(location);

    switch (endPoint) {
      case 'privacy':
        return (<Privacy />);

      case 'terms':
        return (<Terms />);

      default:
        return (<Terms />);
    }
  }
});

export default PolicyBox;
