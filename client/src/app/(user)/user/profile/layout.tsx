import ProfileSidebar from "@/components/ProfileSidebar"

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <ProfileSidebar />
      <div className="flex-1 ml-64">
        {children}
      </div>
    </div>
  )
}

export default ProfileLayout
