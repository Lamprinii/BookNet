import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';

function LoadingButton({ name, loadingText, onClick,className }) {
  const [isLoading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onClick(); // Call the provided onClick function
      setLoading(false); // Set isLoading back to false after onClick function is executed
    } catch (error) {
      // Handle any errors
      console.error(error);
      setLoading(false); // Set isLoading back to false in case of error
    }
  };

  return (
    <div>
      <link  type="text/css" rel="stylesheet" href="https://staticontnenthosting.blob.core.windows.net/booknetpublic/LoadingButton.css"/>
    <Button
    disabled={isLoading}
    onClick={!isLoading ? handleClick : null}
    size="md"
    bsPrefix ='btn'
    className={`custom-Btn ${className}`}
  >
    
    {isLoading ? loadingText : name}
  </Button></div>
    
  );
}

export default LoadingButton;