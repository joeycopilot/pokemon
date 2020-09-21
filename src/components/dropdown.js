import React from 'react'
import join from '../util/classnames'
import _ from 'lodash'

const Dropdown = ({ className, value, values, onChange, label, disabled }) =>
  <div className={join("dropdown-container",className,disabled)}>
    <select className={join("dropdown-select", value)} value={value} onChange={onChange} disabled={disabled}>
      {_.map(values, val => (
        <option  value={val.value} key={val.value}>{val.display}</option>
      ))}
    </select>
    <div className="dropdown-cover"/>
    <div className="dropdown-arrow-mask"><div className="dropdown-arrow"></div></div>
    <div className="dropdown-value-readout">{_.get(_.find(values,{value}),'display')}</div>
  </div>

export default Dropdown
