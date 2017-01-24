import React, { PropTypes } from 'react';

const Main1 = React.createClass({
  propTypes: {
    url: PropTypes.string
  },

  render() {
    const { url } = this.props;
    return (
      <div>
        <img
          src={url}
          style={{
            padding: 10,
            width: '100%',
            borderTop: '1px solid #abc',
            borderBottom: '1px solid #abc'
          }}/>
      </div>
    );
  }
});

export default Main1;
