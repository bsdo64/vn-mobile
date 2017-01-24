import React, { PropTypes } from 'react';

const AdForumLeft = React.createClass({
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
            float: 'right'
          }}/>
      </div>
    )
  }
});

export default AdForumLeft;
