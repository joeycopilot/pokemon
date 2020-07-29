import React from 'react'
import join from '../util/classnames'


const Header = ({ className, children }) =>
  <div className={join('header-container',className)}>
        {children}
  </div>

export default Header
