/**
 * Created by dobyeongsu on 2016. 3. 23..
 */
import React, { PropTypes } from 'react';

const PolicyBox = React.createClass({
  displayName: 'PolicyBox',
  propTypes: {
    location: PropTypes.object.isRequired,
  },

  render() {
    return (
      <div className="ui container">
        <div className="ui segment">
          <p>안녕하세요 베나클 입니다</p>
        </div>
        <div className="ui segment">
          <p>안녕하세요 베나클 입니다</p>
        </div>
        <div className="ui segment">
          <p>안녕하세요 베나클 입니다</p>
        </div>
      </div>
    )
  }
});

export default PolicyBox;
