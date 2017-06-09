import React from 'react';
import { Link } from 'found';
import logoImage from '../../../images/logo_text_white.png';

import t from '../../locale';

export const Logo = (props) => {
  return (
    <Link {...props} to="/"><img src={logoImage} alt={t('site_name')} /></Link>
  );
};

export default Logo;
