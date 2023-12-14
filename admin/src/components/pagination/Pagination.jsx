import React from 'react'
import './Pagination.css'

const Pagination = ({ currentPageNumber, setCurrentPageNumber, totalNumberOfPages }) => {
  const leftButtonClickHandler = () => {
    const pageNumber = currentPageNumber;
    const newPageNumber = (pageNumber > 1 ? pageNumber - 1 : pageNumber);
    setCurrentPageNumber(newPageNumber);
  }

  const rightButtonClickHandler = () => {
    const pageNumber = currentPageNumber;
    const newPageNumber = (pageNumber < totalNumberOfPages ? pageNumber + 1 : pageNumber);
    setCurrentPageNumber(newPageNumber);
  }

  return (
    <div className='pagination_box'>
        <button 
          className="left_container"
          onClick={leftButtonClickHandler}>
            <p>Left</p>
        </button>
        <div className='page_number_container'>
          <p>{currentPageNumber}</p>
        </div>
        <button 
          className="right_container"
          onClick={rightButtonClickHandler}>
            <p>Right</p>
        </button>
        <div className="info_container">
            <p>1 out of {totalNumberOfPages}</p>
        </div>
    </div>
  )
}

export default Pagination