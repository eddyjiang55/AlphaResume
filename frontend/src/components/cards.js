import React from 'react'

import PropTypes from 'prop-types'

const Cards = (props) => {
  return (
    <>
      <section className={`cards-cards ${props.rootClassName} `}>
        <div className="cards-container">
          <span className="cards-text">{props.text}</span>
          <span className="cards-text1">{props.text1}</span>
        </div>
        <div className="cards-container1">
          <textarea
            placeholder={props.textarea_placeholder}
            className="cards-textarea textarea"
            value={props.value}
            onChange={props.onChange}
          ></textarea>
          <textarea
            placeholder={props.textarea_placeholder1}
            className="cards-textarea1 textarea"
            value={props.value1}
            onChange={props.onChange1}
          ></textarea>
        </div>
      </section>
      <style jsx>
        {`
          .cards-cards {
            gap: var(--dl-space-space-fiveunits);
            width: 1200px;
            height: 284px;
            display: flex;
            position: relative;
            max-width: 1440px;
            align-items: center;
            padding-top: 20px;
            padding-left: 29px;
            padding-right: var(--dl-space-space-oneandhalfunits);
            flex-direction: row;
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: center;
          }
          .cards-container {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .cards-text {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: var(--dl-space-space-threeunits);
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: var(--dl-space-space-threeunits);
          }
          .cards-text1 {
            color: var(--dl-color-gray-black);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            padding-top: var(--dl-space-space-threeunits);
            padding-left: 1px;
            padding-right: 1px;
            padding-bottom: var(--dl-space-space-threeunits);
          }
          .cards-container1 {
            flex: 0 0 auto;
            width: 783px;
            height: auto;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .cards-textarea {
            width: 783px;
            height: 100px;
            margin-top: var(--dl-space-space-unit);
            margin-bottom: var(--dl-space-space-unit);
          }
          .cards-textarea1 {
            width: 783px;
            height: 100px;
            margin-top: var(--dl-space-space-unit);
            margin-bottom: var(--dl-space-space-unit);
          }

          @media (max-width: 767px) {
            .cards-cards {
              padding-top: var(--dl-space-space-threeunits);
              padding-left: var(--dl-space-space-oneandhalfunits);
              padding-right: var(--dl-space-space-oneandhalfunits);
              padding-bottom: var(--dl-space-space-fourunits);
            }
          }
        `}
      </style>
    </>
  )
}

Cards.defaultProps = {
  text1: '主修课程',
  rootClassName: '',
  textarea_placeholder1: '',
  textarea_placeholder: '',
  text: '获奖记录',
}

Cards.propTypes = {
  text1: PropTypes.string,
  rootClassName: PropTypes.string,
  textarea_placeholder1: PropTypes.string,
  textarea_placeholder: PropTypes.string,
  text: PropTypes.string,
  value1: PropTypes.string,
  onChange1: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default Cards
