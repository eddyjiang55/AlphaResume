import React from 'react'

import PropTypes from 'prop-types'

const Card = (props) => {
  return (
    <>
      <div className={`card-card ${props.rootClassName} `}>
        <div className="card-container">
          <div className="card-container1">
            <div className="card-container2">
              <div className="card-container3"></div>
            </div>
          </div>
          <img
            alt={props.image_alt1}
            src={props.image_src1}
            loading="lazy"
            className="card-image"
          />
        </div>
        <div className="card-row">
          <div className="card-main">
            <div className="card-content">
              <h2 className="card-header">{props.Header}</h2>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .card-card {
            gap: var(--dl-space-space-twounits);
            width: 317px;
            height: 369px;
            display: flex;
            position: relative;
            align-items: flex-start;
            padding-top: var(--dl-space-space-threeunits);
            padding-left: var(--dl-space-space-threeunits);
            padding-right: var(--dl-space-space-threeunits);
            flex-direction: column;
            padding-bottom: var(--dl-space-space-threeunits);
            justify-content: center;
            background-color: #8fa7df;
          }
          .card-container {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
          }
          .card-container1 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
          }
          .card-container2 {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
          }
          .card-container3 {
            flex: 0 0 auto;
            width: auto;
            border: 2px dashed rgba(120, 120, 120, 0.4);
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .card-image {
            flex: 1;
            width: 215px;
            height: 252px;
            object-fit: cover;
          }
          .card-row {
            gap: var(--dl-space-space-fourunits);
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: row;
            justify-content: center;
          }
          .card-main {
            gap: var(--dl-space-space-threeunits);
            width: 100%;
            display: flex;
            max-width: 460px;
            align-items: flex-start;
            flex-direction: column;
          }
          .card-content {
            gap: var(--dl-space-space-unit);
            width: 100%;
            display: flex;
            max-width: 460px;
            align-items: flex-start;
            flex-direction: column;
          }
          .card-header {
            color: rgb(0, 0, 0);
            font-size: 35px;
            align-self: center;
            white-space: nowrap;
            font-style: normal;
            text-align: center;
            font-weight: 500;
          }
          .card-root-class-name1 {
            background-color: var(--dl-color-gray-white);
          }
          .card-root-class-name2 {
            background-color: var(--dl-color-gray-white);
          }
          .card-root-class-name3 {
            background-color: var(--dl-color-gray-white);
          }
          .card-root-class-name4 {
            background-color: var(--dl-color-gray-white);
          }
          .card-root-class-name5 {
            background-color: var(--dl-color-gray-white);
          }
          .card-root-class-name6 {
            background-color: var(--dl-color-gray-white);
          }
          .card-root-class-name7 {
            background-color: var(--dl-color-gray-white);
          }
          .card-root-class-name8 {
            background-color: var(--dl-color-gray-white);
          }
          .card-root-class-name9 {
            background-color: var(--dl-color-gray-white);
          }
          .card-root-class-name10 {
            background-color: var(--dl-color-gray-white);
          }
          @media (max-width: 991px) {
            .card-row {
              flex-direction: column;
            }
          }
          @media (max-width: 767px) {
            .card-card {
              gap: var(--dl-space-space-oneandhalfunits);
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-oneandhalfunits);
            }
            .card-row {
              gap: var(--dl-space-space-twounits);
            }
            .card-main {
              gap: var(--dl-space-space-oneandhalfunits);
            }
            .card-header {
              font-size: 24px;
            }
          }
        `}
      </style>
    </>
  )
}

Card.defaultProps = {
  image_alt1: 'image',
  image_src1:
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8c2VhcmNofDY5fHxiZWF1dHl8ZW58MHx8fHwxNzAwMjgwODgzfDA&ixlib=rb-4.0.3&q=80&w=300',
  rootClassName: '',
  Header: '与AI助手对话',
  image_alt: 'image',
  image_src: '26bcad32-6703-4172-be97-7b8c57af3795',
}

Card.propTypes = {
  image_alt1: PropTypes.string,
  image_src1: PropTypes.string,
  rootClassName: PropTypes.string,
  Header: PropTypes.string,
  image_alt: PropTypes.string,
  image_src: PropTypes.string,
}

export default Card
