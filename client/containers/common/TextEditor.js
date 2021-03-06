import React, {Component, PropTypes} from 'react';
import 'react-quill/dist/quill.snow.css';

import TextEditorRich from '../../components/common/TextEditorRich';
import TextEditorPlain from '../../components/common/TextEditorPlain';

export default class TextEditor extends Component {

  static propTypes = {
    input: PropTypes.object.isRequired,
    textEditorType: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Clear text editor on switch as html does not directly translate into plaintext
    const oldType = this.props.textEditorType;
    const newType = nextProps.textEditorType;
    if (oldType !== newType) {
      this.setState({ value: '' });
      this.props.input.onChange('');
    }
  }

  onChange(value) {
    // Update redux form
    // See state comment for why we're updating two instances of component state
    this.props.input.onChange(value);
  }

  render() {
    const {
      input: {
        value
      }
    } = this.props;

    const isPlaintext = this.props.textEditorType === 'Plaintext';

    const textEditorProps = {
      value,
      onChange: this.onChange
    };

    // Render either a plaintext or html editor
    return (
      isPlaintext
        ? <TextEditorPlain {...textEditorProps} />
        : <TextEditorRich {...textEditorProps} />
    );
  }

}
