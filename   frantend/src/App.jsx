import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Favorite from './Favorite/Favorite';
import Detail from './Detail/Detal';
import Account from './Account/Account';
import Add_to_card from './Add_to_card/Add_to_card';
import My_card from './Add_to_card/My_card';
import Test from './Test/Test';
import T from './Test/T';
import Login from './Login/Login';
import Ragistration from './Ragistration/Ragistration';
import Otp from './Ragistration/Otp';
import Product from './Product/Product';
import Product_by_Category from './Product/Product_by_Category';
import Address from './Address/Address';

  /*Admin*/
import Home_ from './Admin/Home/Home';
import Category from './Admin/Category/Category';
import AddCategory from './Admin/Category/AddCategory';
import EditCategory from './Admin/Category/edit_category';
import AdminProduct from './Admin/Product/Product';
import EditProduct from './Admin/Product/Edit.product';
import Add_prodect from './Admin/Product/Add_prodect';
import User from './Admin/User/User';
import Edit_user from './Admin/User/Edit_user';
import Order from './Admin/Order/Order';

import Size from './Admin/Size/Size';
import Add_size from './Admin/Size/Add_Size';
import Edit_size from './Admin/Size/Edit_size';
import Poster from './Admin/Poster/Poster';
import Add_poster from './Admin/Poster/Add_poster';
import Edit_poster from './Admin/Poster/Edit_poster';
  

const App = () => {
   return (
      <>


        <Routes>
          {/*app*/}
          
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/Detail/:id" element={<Detail />} />
            <Route path="/Favorite" element={<Favorite />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/Add_to_card" element={<Add_to_card />} />
            <Route path="/My_card" element={<My_card />} />
            <Route path="/Test" element={<Test />} />
            <Route path="/T" element={<T />} />
            <Route path="/Ragistration" element={<Ragistration />} />
            <Route path="/Otp" element={<Otp />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/Product_by_Category/:id" element={<Product_by_Category />} />
            <Route path="/Address" element={<Address />} />
          {/*Admin*/}
            <Route path="/Admin" element={<Home_ />} />
            <Route path="/Admin/Category" element={<Category />} />
            <Route path="/Admin/Category/AddCategory" element={<AddCategory />} />
            <Route path="/Admin/Category/EditCategory/:id" element={<EditCategory />} />
            
            <Route path="/Admin/Product" element={<AdminProduct />} />
            <Route path="/Admin/Product/Add_prodect" element={<Add_prodect />} />
            <Route path="/Admin/Product/EditProduct/:id" element={<EditProduct />} />
            <Route path="/Admin/User" element={<User />} />
            <Route path="/Admin/User/Edit_user/:id" element={<Edit_user />} />
            <Route path="/Admin/Order" element={<Order />} />
            
          <Route path="/Admin/Size" element={<Size />} /> 
          <Route path="/Admin/Size/Add_size" element={<Add_size />} /> 
          <Route path="/Admin/Size/Edit_size/:id" element={<Edit_size />} /> 
          
          <Route path="/Admin/Poster" element={<Poster />} /> 
          <Route path="/Admin/Poster/Add_poster" element={<Add_poster />} /> 
          <Route path="/Admin/Poster/Edit_poster/:id" element={<Edit_poster />} /> 
            
         </Routes>

      </>
   );
};
 
export default App;