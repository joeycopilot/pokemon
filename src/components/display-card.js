import React from 'react'
import join from '../util/classnames'

const DisplayCard = ({className, children, img }) =>
  <div className={join('display-card-container', className)}>
    <div className={'display-card-inner-container'}>
      <div className={'display-card-image-container'}>
        <img className="display-card-image" src={img} />
      </div>

      <div className={'display-card-content-container'}>
        {children}
      </div>
    </div>
  </div>

export default DisplayCard
