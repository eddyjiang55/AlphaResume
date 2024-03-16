import React from 'react'

import PropTypes from 'prop-types'

const FloatWindowChooseTypeForCommunication = (props) => {
  return (
    <>
      <div
        className={`float-window-choose-type-for-communication-container ${props.rootClassName} `}
      ></div>
      <style jsx>
        {`
          .float-window-choose-type-for-communication-container {
            width: 973px;
            height: 400px;
            display: flex;
            position: relative;
            align-items: flex-start;
            border-color: #ffffff;
            border-width: 1px;
            flex-direction: column;
            background-color: #27272d;
          }
        `}
      </style>
    </>
  )
}

FloatWindowChooseTypeForCommunication.defaultProps = {
  rootClassName: '',
}

FloatWindowChooseTypeForCommunication.propTypes = {
  rootClassName: PropTypes.string,
}

export default FloatWindowChooseTypeForCommunication
