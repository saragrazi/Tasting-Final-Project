import React from "react";
import Container from "@mui/material/Container";
import PageHeader from "./../components/PageHeader";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const AboutPage = () => {
  return (
    <Container maxWidth="lg">
       <PageHeader
        title="About Page"
        subtitle="On this page you can find explanations about using the application"
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={8} alignItems="center">
          <Typography>
            <p className="welcome">
              Hello and welcome to Tasting, your go-to place for all things
              delicious! At Tasting, we're all about making your cooking
              experience fun and easy.
            </p>
          </Typography>
          <b>Discover Amazing Recipes</b>{" "}
          <Typography>
            Explore a wide range of recipes that cater to every taste and skill
            level. From hearty meals to sweet treats, Tasting is your
            one-stop-shop for cooking inspiration.
          </Typography>
          <b>Your Kitchen, Your Rules</b>{" "}
          <Typography>
            Become a part of the Tasting community by signing up. Once you're
            in, you can share your favorite recipes, tweak them to your liking,
            and even build your personal collection of must-try dishes.
          </Typography>
          <b>Add, Edit, Delete</b>
          <Typography>
            Feel like a chef by contributing your recipes to our collection.
            Edit them anytime to match your evolving cooking style. Your
            kitchen, your rules – let your creativity shine!
          </Typography>{" "}
          <b>Save Your Favorites</b>{" "}
          <Typography>
            Love a recipe? Save it to your Favorites! Easily revisit the dishes
            you enjoyed the most without scrolling through the entire
            collection.
          </Typography>
          <b>Choose Your View</b>{" "}
          <Typography>
            Tasting understands that everyone has their unique way of browsing.
            Pick between an organized table or a cozy cards view to explore
            recipes – it's all about what suits you.
          </Typography>{" "}
          <b>Simple and Beautiful Design</b>{" "}
          <Typography>
            Tasting isn't just practical; it's pretty too! Enjoy a clean and
            user-friendly design that makes your cooking journey even more
            enjoyable.
          </Typography>
          <b>Join Us on Tasting</b>{" "}
          <Typography>
            So, whether you're a cooking pro or just getting started, Tasting is
            here to make your kitchen adventures exciting and flavorful. Join
            us, and let's make every meal a tasty one!
          </Typography>
          <p className="welcome1">
            Good luck with your culinary adventures on Tasting!
          </p>
        </Grid>
        <Grid
          item
          xs={7}
          sx={{
            display: { md: "flex", xs: "none" },
            justifyContent: "center",
          }}
        >
          <img src="/assets/images/avatar2.png" alt="avatar" width="70%" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
