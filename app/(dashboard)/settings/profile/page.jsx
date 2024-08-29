"use client"
import { GetTokens, SetTokens } from '@/app/actions'
import { updateUserProfile, uploadImage } from '@/app/api/api'
import { useUserStore } from '@/app/store/UserStore'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiLoaderAlt } from 'react-icons/bi'
import { CiImageOn } from 'react-icons/ci'
import { FaCamera, FaChevronRight, FaRegEdit, FaRegUserCircle } from 'react-icons/fa'
import { GoKey } from 'react-icons/go'
import { ImSpinner3 } from 'react-icons/im'
import { RiDeleteBinLine } from 'react-icons/ri'
import { toast } from 'react-toastify'

function Profile() {
    const [isEditable, setIsEditable] = useState(false);
    const { userState, updateUserData } = useUserStore((state) => ({
        userState: state.userState,
        updateUserData: state.updateUserData,
    }));
    const [analysisData, setAnalysisData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupData, setPopupData] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [cardData, setCardData] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [oldPasswordError, setOldPasswordError] = useState("");
    const router = useRouter();
    const [sendingMail, setIsSendingMail] = useState(false);
    const email = useRef(null);
    const fileUploadRef = useRef(null);
    const [showEmailDialog, setShowEmailDialog] = useState(false);

    /**************************** */
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const userdata = userState?.userdata || {};
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isUpdatingData, setIsUpdatingData] = useState(false);
    /******************************* */

    useEffect(() => {
        if (userState?.userdata) {
            setPreviewImage(
                userState.userdata.profilePicture || "https://via.placeholder.com/150"
            );
        }
    }, [userState?.userdata]);

    const handleImageUpload = (event) => {
        event.preventDefault();
        if (fileUploadRef.current) {
            fileUploadRef.current.click();
        }
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullname: userdata?.fullname,
            occupation: userdata?.occupation,
            address: userdata?.address,
        },
    });

    const userProfileHandler = async (data) => {
        setIsUpdatingData(true)
        try {
            const { accessToken } = await GetTokens();
            const response = await updateUserProfile(data, accessToken.value);
            if (response.status === 200) {
                const {
                    userdata
                } = response.data.data;
                updateUserData(userdata);
                setPreviewImage(userdata.profilePicture);
                reset(userdata);
                toast.success("Profile updated successfully", {
                    position: "top-right",
                });
                setIsEditable(false)
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setIsUpdatingData(false)
        }
    };

    const handleEmailDialogClose = () => {
        setShowEmailDialog(false);
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        value = value.trim();
        setPasswords({ ...passwords, [name]: value });
    };
    // const handleImageChange = (e) => {
    //   const file = e.target.files[0];
    //   if (file) {
    //     setSelectedImage(file);
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       setPreviewImage(reader.result);
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // };

    const updateUserImage = async (data) => {
        try {
            const { accessToken } = await GetTokens();
            const response = await updateUserProfile(data, accessToken.value);
            if (response.status === 200) {
                const {
                    userdata
                } = response.data.data;
                updateUserData(userdata);
                setPreviewImage(userdata.profilePicture);
                toast.success("Profile picture updated successfully");
            }
        } catch (error) {
            toast.error("Error updating profile picture")
        }
    }


    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setIsUploadingImage(true);

            // Create FormData and append the selected file
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "careerg");

            // Upload the image
            const uploadResponse = await uploadImage(formData);

            if (uploadResponse.status === 200) {
                const imageUrl = uploadResponse.data.secure_url;

                // Update the user's profile picture with the new image URL
                await updateUserImage({ profilePicture: imageUrl });
            } else {
                throw new Error("Failed to upload image");
            }
        } catch (error) {
            // Show an error message if the upload fails
            toast.error("Error uploading profile picture");
            console.error("Error uploading profile picture:", error);
        } finally {
            // Ensure the uploading state is reset after upload completes
            setIsUploadingImage(false);
        }
    };


    const handleRemoveProfilePicture = async () => {
        setIsUploadingImage(true)
        try {
            const { accessToken } = await GetTokens();
            const response = await updateUserProfile({ profilePicture: "" }, accessToken.value);
            if (response.status === 200) {
                const {
                    userdata
                } = response.data.data;
                updateUserData(userdata);
                setPreviewImage(null);
                toast.success("Profile picture removed successfully");
            }
        } catch {
            toast.error("Error removing profile picture")
        }finally{
            setIsUploadingImage(false)
        }
    }





    const handleUserAnalysis = (id) => {
        router.push(`/analyser/${id}`);
    };

    function formatDate(dateString) {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    }

    const handleReadMore = (data) => {
        setCardData(data);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleResetPassword = () => {
        setPasswordError("");
        setOldPasswordError("");
    };

    const handleChangePassword = async () => {
        const { accessToken } = await GetTokens();
        let token = accessToken.value;
        handleResetPassword();
        let { oldPassword, newPassword, confirmPassword } = passwords;
        if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
            setPasswordError("Please fill in all fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError("Please re-enter correct password.");
            return;
        }
        setIsChangingPassword(true);
        try {
            const response = await axios.post(
                "/api/changePassword",
                { oldPassword, newPassword },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            if (response.status === 200) {
                toast.success("Password changed successfully");
                handleDialogClose();
                setIsChangingPassword(false);
                setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
            }
        } catch (error) {
            if (error.response.status === 401) {
                setOldPasswordError("Incorrect old password");
            }
        }
    };

    const handleDialogClose = () => {
        setShowDialog(false);
        setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setPasswordError("");
        setOldPasswordError("");
    };

    const handleForgotPassword = () => {
        setShowDialog(false);
        setShowEmailDialog(true);
    };

    const handleSendResetEmail = async () => {
        const userEmail = email.current.value;
        setIsSendingMail(true);
        try {
            const response = await axios.post("/api/resetpassword", {
                email: userEmail,
            });
            if (response.status === 200) {
                email.current.value = null;
                toast.success("Reset password link sent to your email");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.error || "Error sending reset password email"
            );
        } finally {
            setIsSendingMail(false);
            setShowEmailDialog(false);
        }
    };


    return (
        <>
            <Dialog open={showDialog}>
                <DialogContent
                    showCloseButton
                    onClick={handleDialogClose}
                    className="w-96"
                >
                    <div className="w-full flex flex-col items-center">
                        <div className="w-24  h-24 flex items-center justify-center rounded-full bg-blue-100">
                            <GoKey className="text-5xl text-blue-800" />
                        </div>
                        <div className="py-4 text-xl w-full px-4 flex flex-col items-center">
                            <h1>Set your new password</h1>
                            <div className="w-full my-1">
                                <Label className=" text-sm">Old password</Label>
                                <Input
                                    type="password"
                                    className="mt-1"
                                    onChange={handleInputChange}
                                    name="oldPassword"
                                    value={passwords.oldPassword}
                                />
                                <div className="w-full">
                                    {oldPasswordError && (
                                        <p className="text-xs text-red-600 text-start">
                                            {oldPasswordError}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="w-full my-1">
                                <Label className=" text-sm">New password</Label>
                                <Input
                                    type="password"
                                    className="mt-1"
                                    onChange={handleInputChange}
                                    name="newPassword"
                                    value={passwords.newPassword}
                                />
                            </div>
                            <div className="w-full my-1">
                                <Label className="mb-1">Confirm new password</Label>
                                <Input
                                    type="password"
                                    className="mt-1"
                                    onChange={handleInputChange}
                                    name="confirmPassword"
                                    value={passwords.confirmPassword}
                                />
                            </div>
                            <div className="w-full">
                                {passwordError && (
                                    <p className="text-xs text-red-600 text-start">
                                        {passwordError}
                                    </p>
                                )}
                            </div>
                            <div className="w-full my-2">
                                <p
                                    className="text-sm cursor-pointer"
                                    onClick={handleForgotPassword}
                                >
                                    Forgot password?
                                </p>
                            </div>
                            <div className="pt-5 w-full">
                                <Button
                                    className="w-full"
                                    onClick={handleChangePassword}
                                    disabled={isChangingPassword}
                                >
                                    {isChangingPassword ? (
                                        <>
                                            Changing Password
                                            <ImSpinner3 className="animate-spin w-3 h-3 text-white ml-1" />
                                        </>
                                    ) : (
                                        <>
                                            Change password
                                            <FaChevronRight className="w-3 h-3 text-white ml-1" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={showEmailDialog}>
                <DialogContent
                    className=" w-96"
                    onClick={handleEmailDialogClose}
                    showCloseButton
                >
                    <div>
                        <h1>Reset Password</h1>
                        <Input
                            placeholder="Enter your email address"
                            className="mt-4"
                            ref={email}
                        />
                        <div className="w-full my-3 flex justify-end items-center">
                            <Button
                                className=" disabled:bg-opacity-85"
                                disabled={sendingMail}
                                onClick={handleSendResetEmail}
                            >
                                {sendingMail ? (
                                    <>
                                        Sending
                                        <ImSpinner3 className="animate-spin ml-2" size={16} />
                                    </>
                                ) : (
                                    "Send"
                                )}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <section className="bg-gradient-to-r p-6 sm:p-10">
  <div className="px-3 sm:px-5">
    <p className="font-bold text-2xl sm:text-3xl flex items-center text-blue-900">
      <FaRegUserCircle className="mr-2" />
      Profile
    </p>
  </div>

  <div className="container mx-auto px-3 sm:px-5">
    <div className="mb-4 p-4">
      <div className="flex flex-col sm:flex-row my-3">
        <div className="w-full sm:w-1/3 flex flex-col items-center sm:items-start relative">
          <div className="rounded-full overflow-hidden w-24 h-24 sm:w-36 sm:h-36 relative">
            <img
              src={previewImage || "https://i.sstatic.net/l60Hf.png"}
              alt="avatar"
              className="mx-auto h-full w-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
            {isUploadingImage && (
              <div className="absolute top-0 w-full h-full bg-black/50 flex items-center justify-center">
                <BiLoaderAlt className="text-white w-10 h-10 animate-spin" />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center items-center h-24 w-24 sm:h-36 sm:w-36 mt-4 sm:mt-0">
            <div>
              <Button
                variant="outline"
                className="my-2 lg:w-full w-[200px]"
                onClick={handleImageUpload}
              >
                <CiImageOn className="mr-1" />
                Change
              </Button>
              <input
                type="file"
                accept="image/*"
                ref={fileUploadRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <Button
              variant="outline"
              className="my-2 lg:w-full w-[200px]"
              onClick={handleRemoveProfilePicture}
            >
              <RiDeleteBinLine className="mr-1" />
              Remove
            </Button>
          </div>
        </div>

        <div className="w-full sm:w-2/3 px-5 p-4 sm:p-5 mt-6 sm:mt-0 shadow-lg rounded-2xl">
          <form onSubmit={handleSubmit(userProfileHandler)}>
            <div className="w-full mb-4">
              <Label>Fullname</Label>
              <div>
                {isEditable ? (
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset">
                    <Input
                      type="text"
                      {...register("fullname")}
                      defaultValue={userdata?.fullname}
                      className="text-md text-gray-500"
                    />
                  </div>
                ) : (
                  <p className="text-gray-500 flex items-center h-8">
                    {userdata?.fullname || "-"}
                  </p>
                )}
              </div>
            </div>

            <div className="my-3">
              <Label>Email</Label>
              <p className="text-gray-500 h-8">
                {userdata?.email || ""}
              </p>
            </div>

            <div className="my-3">
              <Label>Occupation</Label>
              <div>
                {isEditable ? (
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset">
                    <Input
                      type="text"
                      {...register("occupation")}
                      defaultValue={userdata?.occupation}
                    />
                  </div>
                ) : (
                  <p className="text-gray-500 h-10">
                    {userdata?.occupation || "-"}
                  </p>
                )}
              </div>
            </div>

            <div className="my-3">
              <Label>Address</Label>
              <div>
                {isEditable ? (
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset">
                    <Input
                      type="text"
                      {...register("address")}
                      defaultValue={userdata?.address}
                    />
                  </div>
                ) : (
                  <p className="text-gray-500 h-10">
                    {userdata?.address || "-"}
                  </p>
                )}
              </div>
            </div>

            <div className="my-3">
              <Label>Plan</Label>
              <p className="text-gray-500">
                {userdata?.subscription?.plan}
              </p>
            </div>

            <div className="py-4 flex flex-col sm:flex-row justify-between items-center gap-5">
              <div className="flex items-center justify-end">
                {isEditable ? (
                  <div className="flex flex-row">
                    <Button
                      variant="outline"
                      type="button"
                      className="mr-0 sm:mr-4 mb-2 sm:mb-0"
                      onClick={() => setIsEditable(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="text-white py-2 px-4 rounded"
                      disabled={isUpdatingData}
                    >
                      {isUpdatingData ? (
                        <>
                          Updating
                          <ImSpinner3 className="h-4 w-4 animate-spin ml-2" />
                        </>
                      ) : (
                        "Update"
                      )}
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    className="w-[150px] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 border h-10 cursor-pointer text-white bg-blue-900"
                    onClick={() => setIsEditable(true)}
                  >
                    Edit
                  </Button>
                )}
              </div>
              <div>
                <Button type="button" className="" onClick={() => setShowDialog(true)}>
                  Change Password
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

        </>
    )
}

export default Profile