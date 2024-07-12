import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <>
    <div className='bg-richblack-900 text-white mx-0 md:mx-5' >
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>
      <div className="flex  items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconBtn customClasses={"hidden md:flex"}
          text="Edit"
          className='flex items-center justify-center'
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div className='md:hidden'>
        <IconBtn 
          text={'Edit Profile'}
          onclick={() => {
            navigate("/dashboard/settings")
          }}
          customClasses="w-full  my-5 !py-1 text-center  flex items-center justify-center"
          children={<RiEditBoxLine />} />
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn customClasses={"hidden md:flex"}
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div  className="flex flex-col gap-y-5 md:gap-y-10 rounded-md border border-richblack-700 p-8 px-3 md:px-12 bg-richblack-800">
        <div className="flex items-center justify-between w-full">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn customClasses={"hidden md:flex"}
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className='flex flex-col md:flex-row gap-y-5'>
          <div className='w-full md:w-1/2'>
            <p className='mb-2 text-sm text-richblack-600'>First Name</p>
            <p className='text-sm text-richblack-5 font-medium' >{user?.firstName}</p>
          </div>

          <div className='w-full md:w-1/2'>
            <p className='mb-2 text-sm text-richblack-600'>Last Name</p>
            <p className='text-sm text-richblack-5 font-medium' >{user?.lastName}</p>
          </div>
        </div>


        <div className='flex flex-col md:flex-row gap-y-5'>
          <div className='w-full md:w-1/2'>
            <p className='mb-2 text-sm text-richblack-600'>Email</p>
            <p className='text-sm text-richblack-5 font-medium' >{user?.email}</p>
          </div>

          <div className='w-full md:w-1/2'>
            <p className='mb-2 text-sm text-richblack-600'>Phone Number</p>
            <p className={`text-sm font-medium ${user?.additionalDetails?.contactNumber ? 'text-richblack-5' : 'text-richblack-400'} `} >{user?.additionalDetails?.contactNumber ?? 'Add Contact Number'}</p>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-y-5'>
          <div className='w-full md:w-1/2'>
            <p className='mb-2 text-sm text-richblack-600'>Gender</p>
            <p className='text-sm text-richblack-5 font-medium' >{user?.email}</p>
          </div>

          <div className='w-full md:w-1/2'>
            <p className='mb-2 text-sm text-richblack-600'>Date of Birth</p>
            <p className={`text-sm font-medium ${user?.additionalDetails?.dateOfBirth ? 'text-richblack-5' : 'text-richblack-400'} `} >{user?.additionalDetails?.dateOfBirth ? formattedDate(user?.additionalDetails?.dateOfBirth) : 'Add Date of Birth'}</p>
          </div>
        </div>


      </div>
      </div>
    </>
  )
}