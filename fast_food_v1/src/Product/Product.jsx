import { useState, useEffect } from 'react';
import '../App.css';
import Button_1 from '../Components/Button_1';
import Card from '../Components/Card';
import Footer from '../Components/Footer';
import axios from 'axios';

function Product() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/Product/')
      .then(response => {
       setData(response.data);
       //console.log(data)
        setLoading(false);
      })
      .catch(error => {
        ///setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>There was an error fetching the data!</div>;


  return (
    <div className="w-screen h-screen px-5 pt-10 an">

    
      <div className="w-full h-full overflow-y-scroll">
        <div className='flex justify-between items-center'>
          <Button_1  />
          <h1 className="r3 text-xl"> All Product </h1>
          <div></div>
        </div>
        <div className="flex flex-wrap justify-between gap-1 my-4">
          {data.map((i,r)=>(
           <div key={r} className="w-[49%] rounded-md h-[36vw] bg-cyan-100">
              <Card  id={i.Id} />
            </div>
          ))}
           
         
          
        </div>
      </div>
      {/*<Footer className="" on="2" />*/}
    </div>
  );
}

export default Product;
