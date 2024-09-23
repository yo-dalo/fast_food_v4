import Nav from "../Part/Nav"

function Home_() {
  return (
    <>
      <div className="w-screen h-screen px-4 bg-blue-50">
       <Nav/>
      <div className="breadcrumbs text-sm">
  <ul>
    <li><a>Home</a></li>
    <li><a>Documents</a></li>
    <li>Add Document</li>
  </ul>
</div>
        
      </div>
      
    </>
  )
}

export default Home_
