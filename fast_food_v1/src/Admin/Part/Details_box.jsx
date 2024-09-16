import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa";

const Details_box = ({open}) => {
const [data, setData] = useState(null);
/*
useEffect(() => {
fetch('https://jsonplaceholder.typicode.com/posts/1')
.then(response => response.json())
.then(json => setData(json));
}, []);
*/
return (
<div className={` ${open ? "w-[70vw]": "w-[0]"} left-0  relative rounded-2xl  top-20 h-[50vh] bg-amber-200 fixed z-[2]`}>
<div className={` ${open ? "scale-1": "scale-0"}` }>
<FaPlus className="absolute right-4 "/>



</div>
</div>
)
}

export default Details_box;
