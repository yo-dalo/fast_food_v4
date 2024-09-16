import { useState, useEffect } from 'react';
import '../App.css';
import Button_1 from '../Components/Button_1';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import axios from 'axios';

function Test() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.post('/add/',{id:3,name:"hello"})
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
    
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>There was an error fetching the data!</div>;


  return (
    
    <div className="w-screen h-screen px-5 pt-10 an">
      {data}
      
      <div className="w-full h-full overflow-y-scroll">
        <div className='flex justify-between items-center'>
          <Button_1  />
          <h1 className="r3 text-xl">Favorite</h1>
          <div></div>
        </div>
        <div className="flex flex-wrap justify-between gap-1 my-4">
          
            <div className="w-[49%] rounded-md h-[36vw] bg-cyan-500">
              <Card  />
            </div>
            <div className="w-[49%] rounded-md h-[36vw] bg-cyan-500">
              <Card  />
            </div>
            <div className="w-[49%] rounded-md h-[36vw] bg-cyan-500">
              <Card  />
            </div>
            <div className="w-[49%] rounded-md h-[36vw] bg-cyan-500">
              <Card  />
            </div>
            <div className="w-[49%] rounded-md h-[36vw] bg-cyan-500">
              <Card  />
            </div>
          
        </div>
      </div>
      <Footer className="" on="2" />
    </div>
  );
}

export default Test;
