/**
 * Created by dobyeongsu on 2016. 5. 24..
 */
import React, { PropTypes } from 'react';
import { AtomicBlockUtils, Editor, EditorState, Entity, RichUtils, /* convertToRaw */ } from 'draft-js';

class MediaEditorExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });
    // this.logState = () => {
    //   const content = this.state.editorState.getCurrentContent();
    //   console.log(convertToRaw(content));
    // };

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.addMedia = this._addMedia.bind(this);
    this.addAudio = this._addAudio.bind(this);
    this.addImage = this._addImage.bind(this);
    this.addVideo = this._addVideo.bind(this);
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _addMedia(type) {
    const src = window.prompt('Enter a URL');
    if (!src) {
      return;
    }

    const entityKey = Entity.create(type, 'IMMUTABLE', { src });

    return AtomicBlockUtils.insertAtomicBlock(
      this.state.editorState,
      entityKey,
      ' '
    );
  }

  _addAudio() {
    this.onChange(this._addMedia('audio'));
  }

  _addImage() {
    this.onChange(this._addMedia('image'));
  }

  _addVideo() {
    this.onChange(this._addMedia('video'));
  }

  render() {
    return (
      <div style={styles.root}>
        <div style={{ marginBottom: 10 }}>
          Use the buttons to add audio, image, or video.
        </div>
        <div style={{ marginBottom: 10 }}>
          Here are some local examples that can be entered as a URL:
          <ul>
            <li>media.mp3</li>
            <li>media.png</li>
            <li>media.mp4</li>
          </ul>
        </div>
        <div style={styles.buttons}>
          <button onMouseDown={this.addAudio} style={{ marginRight: 10 }}>
            Add Audio
          </button>
          <button onMouseDown={this.addImage} style={{ marginRight: 10 }}>
            Add Image
          </button>
          <button onMouseDown={this.addVideo} style={{ marginRight: 10 }}>
            Add Video
          </button>
        </div>
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            blockRendererFn={mediaBlockRenderer}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder="Enter some text..."
            ref="editor"
          />
        </div>
        <input
          // onClick={this.logState}
          style={styles.button}
          type="button"
          value="Log State"
        />
      </div>
    );
  }
}

function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
}

const Audio = (props) => {
  return <audio controls src={props.src} style={styles.media}/>;
};

Audio.propTypes = {
  src: PropTypes.string
};

const Image = (props) => {
  return <img src={props.src} style={styles.media}/>;
};

Image.propTypes = {
  src: PropTypes.string
};

const Video = (props) => {
  return <video controls src={props.src} style={styles.media}/>;
};

Video.propTypes = {
  src: PropTypes.string
};

const Media = (props) => {
  const entity = Entity.get(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  let media;
  if (type === 'audio') {
    media = <Audio src={src}/>;
  } else if (type === 'image') {
    media = <Image src={src}/>;
  } else if (type === 'video') {
    media = <Video src={src}/>;
  }

  return media;
};

const styles = {
  root: {
    fontFamily: '\'Georgia\', serif',
    padding: 20,
    width: 600,
  },
  buttons: {
    marginBottom: 10,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  media: {
    width: '100%',
  },
};

export default MediaEditorExample;