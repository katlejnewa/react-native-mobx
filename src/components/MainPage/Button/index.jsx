import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import PlusIcon from '../../../../assets/svg/Plus.svg';
import MicrophoneIcon from '../../../../assets/svg/Microphone.svg';
import TimerIcon from '../../../../assets/svg/Timer.svg';
import ClipIcon from '../../../../assets/svg/Clip.svg';
import UserIcon from '../../../../assets/svg/User.svg';
import Raino from '../../../../assets/svg/Raino.svg';

const ICONS = {
  plus: PlusIcon,
  user: UserIcon,
  clip: ClipIcon,
  microphone: MicrophoneIcon,
  timer: TimerIcon,
  raino: Raino,
};

const defaultStyles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#E7F8FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});

const Button = (props) => {
  const { name, styles } = props;

  const TargetIcon = ICONS[name];
  return (
    <TouchableOpacity style={[defaultStyles.container, styles]}>
      <TargetIcon />
    </TouchableOpacity>
  );
};
Button.propTypes = {
  name: PropTypes.string.isRequired,
  styles: PropTypes.object,
};
Button.defaultProps = {
  name: '',
};
export default memo(Button);
