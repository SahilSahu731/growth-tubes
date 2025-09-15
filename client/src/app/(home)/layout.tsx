import Navbar from "../../components/Navbar"


const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <Navbar />
      <div>
        {children}
      </div>
    </div>
  )
}

export default HomeLayout
