import React from 'react'
import join from '../util/classnames'


const Button = ({ className, disabled, onClick, children, key, dataKey }) =>
  <div className={join('button-container',className)} disabled={disabled} key={key} data-button={dataKey}
       onClick={ (disabled || !onClick || (typeof onClick !== 'function')) ? undefined : // disabled/undefined: attach no handler for event
         event => { // not disabled, is defined ..
           event.stopPropagation() // never bubble
           onClick(event) // perform the specified action
         }}>
    <div className="button-face">
      <div className="button-face-caption">
        {children}
      </div>
    </div>
  </div>

export default Button
