import { Typography } from '@mui/material';
import React, { useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom'

const NoSearchMatch = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(6);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    count === 0 && navigate("/posts");
    return () => {clearInterval(intervalId);}//clear interval stops the interval and as it is in useEffect it will start fresh
  }, [count,navigate])
  return (
    <Typography variant='h3' style={{marginLeft:'40px'}}>No post matches with given title or tags.....<br/>Redirecting to home page in {count} sec</Typography>
  );
};

export default NoSearchMatch;