import React, { PropTypes } from 'react';

const AddPost1 = React.createClass({
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
            width: '100%'
          }}/>
      </div>
    )
  }
});

export default AddPost1;
