import React, { useEffect, useState } from 'react';

function Paginate(props) {
  const { setQuery, totalCount, filter, currentPage, setCurrentPage } = props;
  const totalPages = Math.ceil(totalCount / 10);

  const hdlPageChange = (pageNumber) => {
    setCurrentPage((prv) => pageNumber);
    const skip = (pageNumber - 1) * 10;
    setQuery((prv) => ({ ...prv, skip }));
    filter();
  };
  return (
    <div className="flex flex-col gap-2 p-2 items-center">
      <div className="text-lg italic opacity-50">{totalCount} Results Found</div>
      <div className="join">
        {[...Array(totalPages).keys()].map((page) => (
          <input
            key={page}
            className="join-item btn btn-square"
            type="radio"
            name="options"
            checked={page + 1 == currentPage ? 'checked' : false}
            aria-label={page + 1}
            onClick={() => hdlPageChange(page + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default Paginate;
