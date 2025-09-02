import Navbar from "../../modules/components/layout/Navbar"


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
