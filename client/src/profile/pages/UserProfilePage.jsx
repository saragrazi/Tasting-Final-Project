import { Box, Button, Container, Grid, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import { useUserProfile } from "../hooks/useUserProfile";
import { useEffect, useState } from "react";
import { useUser } from "../../users/providers/UserProvider";
import { useNavigate } from "react-router-dom";
import useForm from "../../forms/hooks/useForm";
import EditUserForm from "../components/EditUserForm";
import initialEditForm from "../../users/helpers/initial-forms/initialEditForm";
import editSchema from "../../users/models/joi-schema/editSchema";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
const UserProfilePage = () => {
  const { getUserProfile, handleEditUser, userData, setUserId, open, setOpen } =
    useUserProfile();
  const { user } = useUser();
  const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState({});

  const { value, ...rest } = useForm(
    initialEditForm,
    editSchema,
    handleEditUser
  );

  const handleFormOpen = () => {
    open ? setOpen(false) : setOpen(true);
    rest.setData(userFormData);
  };

  useEffect(() => {
    const getAdnSetUserData = async () => {
      if (user?._id) {
        const data = await getUserProfile(user?._id);
        setUserId(user._id);
        setUserFormData({
          first: data?.name.first,
          middle: data?.name.middle,
          last: data?.name.last,
          phone: data?.phone,
          email: data?.email,
          url: data?.image.url,
          alt: data?.image.alt,
          state: data?.address.state,
          country: data?.address.country,
          city: data?.address.city,
          street: data?.address.street,
          houseNumber: data?.address.houseNumber,
          zip: data?.address.zip,
          isBusiness: user.isBusiness,
          userId: user._id,
        });
      } else {
        navigate("/");
      }
    };
    getAdnSetUserData();
        // eslint-disable-next-line

  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <PageHeader
          textAlign={"center"}
          title="User Profile"
          subtitle="Here you can see your details"
        />

        <Grid justifyContent={"center"} container spacing={0}>
          <Grid item xs={10} md={6} lg={8} alignSelf="center">
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={{ xs: "column-reverse", sm: "row" }}
            >
              <Box p={1} mr={5}>
                <Typography>First Name : {userData?.name.first}</Typography>
                {userData?.name.middle && (
                  <Typography>Middle Name : {userData?.name.middle}</Typography>
                )}
                <Typography>Last Name : {userData?.name.last}</Typography>
                <Typography>Phone : {userData?.phone}</Typography>
                <Typography>Email : {userData?.email}</Typography>
                <Typography>Street : {userData?.address.street}</Typography>
                <Typography>City : {userData?.address.city}</Typography>
                <Typography>State : {userData?.address.state}</Typography>
                <Typography>Country : {userData?.address.country}</Typography>
                <Typography>
                  User Type : {userData?.isAdmin ? "Admin" : ""}{" "}
                  {userData?.isBusiness ? "Business" : ""}{" "}
                  {!userData?.isAdmin && !userData?.isBusiness
                    ? "Regular User"
                    : ""}
                </Typography>
              </Box>
              <Box>
                <img
                  style={{ maxHeight: "200px" }}
                  src={userData?.image.url}
                  alt={userData?.image.alt}
                ></img>
              </Box>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Button
                color={open ? "error" : "primary"}
                variant={open ? "contained" : "outlined"}
                onClick={handleFormOpen}
              >
                {open ? <CancelPresentationIcon /> : "Edit Details"}
              </Button>
            </Box>
          </Grid>
          {open && (
            <EditUserForm
              title="Edit User"
              onSubmit={rest.onSubmit}
              onReset={rest.handleReset}
              onFormChange={rest.validateForm}
              onInputChange={rest.handleChange}
              data={value.data}
              errors={value.errors}
              setData={rest.setData}
            />
          )}
        </Grid>
      </Container>
    </>
  );
};

export default UserProfilePage;
