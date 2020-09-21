import React from 'react'
import join from '../util/classnames'


const TextInput = ({
                     className,
                     value,
                     onChange,
                     onKeyPress,
                     onKeyDown,
                     label,
                     disabled,
                     error,
                     type="text",
                     id,
                     placeholder }) =>

  <div className={join(
    'text-input-container',
    className, {
      'has-error': error,
    })}
       disabled={disabled}
  >

    <div className="text-input-interactive-group">
      <input type={type}
             className="text-input-control"
             value={value}
             onChange={onChange}
             onKeyPress={onKeyPress}
             onKeyDown={onKeyDown}
             disabled={disabled}
             placeholder={placeholder}
      />
    </div>


  </div>

export default TextInput

