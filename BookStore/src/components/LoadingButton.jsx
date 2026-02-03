import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const LoadingButton = ({ loading, children, ...props }) => (
  <Button disabled={loading} {...props}>
    {loading ? (
      <>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          style={{ marginRight: '8px' }}
        />
        Loading...
        {/* <span className="visually-hidden">Loading...</span> */}
      </>
    ) : (
      children
    )}
  </Button>
);

export default LoadingButton;
