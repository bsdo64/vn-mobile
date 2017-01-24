class ImageType {
  constructor(props) {
    if (typeof props === 'object') {
      this.imageUrl = props.imageUrl;
      this.buffer = props.buffer;
    } else if (typeof props === 'string') {
      this.imageUrl = props;
    }
  }

  getImageType() {
    const splitted = this.imageUrl.split('.');
    return splitted[splitted.length - 1];
  }
}

export default ImageType;