import React from 'react';

function Loader({ loading, error }) {
  const loader_path = '/loader.svg';
  const loaderClass = loading
    ? 'loading-wrapper loading-wrapper--active'
    : 'loading-wrapper loading-wrapper--hide';
  return (
    <div className={loaderClass} style={{ zIndex: 1000 }}>
      {!error ? (
        <img src={loader_path} />
      ) : (
        <p>
          <h2>Something went wrong</h2>
          Sorry, something went wrong here. Please try again later.
          <br />
          Meanwhile, please visit my website{' '}
          <a href='https://pariyawit.com'>pariyawit.com</a>
        </p>
      )}
    </div>
  );
  // return (
  //   <>
  //     {loading ? (
  //       <div className='loading-wrapper' style={{ zIndex: 1000 }}>
  //         {!error ? (
  //           <img src={loader_path} />
  //         ) : (
  //           <p>
  //             <h2>Something went wrong</h2>
  //             Sorry, something went wrong here. Please try again later.
  //             <br />
  //             Meanwhile, please visit my website{' '}
  //             <a href='https://pariyawit.com'>pariyawit.com</a>
  //           </p>
  //         )}
  //       </div>
  //     ) : (
  //       ''
  //     )}
  //   </>
  // );
}

export default Loader;
