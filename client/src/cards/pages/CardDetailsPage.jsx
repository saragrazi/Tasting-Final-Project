import { Box, CardMedia, Container, Divider, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useCards from '../hooks/useCards';

const CardDetailsPage = () => {
  const { id } = useParams();
  const { card, handleGetCard } = useCards();
  
  useEffect(() => {
    handleGetCard(id);
    // eslint-disable-next-line
  }, [id]);

  return (
    <Container maxWidth="lg">
      {/* <PageHeader title="Make Me" textAlign={"center"} /> */}
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box mt={2} display={"flex"} alignItems={"center"} flexDirection={{ xs: "column", sm: "column" }}>
          <Typography color={"#d06b6b"} sx={{ textShadow: "1px 1px 1px black" }} mb={2} variant={'h3'}> {card?.title}</Typography>
          <Box position={"relative"} display={"flex"} width={{ xs: "100%", sm: "50%" }} alignItems={"center"} justifyContent={"center"}>
            <CardMedia sx={{ boxShadow: "1px 1px 15px 1px black", borderRadius: "8px", opacity: "1", minHeight: "250px", maxHeight: "600px" }} component="img" image={card?.image.url} alt={card?.image.alt} />
          </Box>
          <Box flexDirection={"column"} width={{ xs: "100%", sm: "50%" }} m={{ sx: 5, sm: 5 }} ml={{ xs: 0, sm: 5 }} display={"flex"} justifyContent={"flex-start"} alignItems={"flex-start"}>
            <Typography sx={{ textShadow: "1px 1px 1px black" }} mb={5} variant='h5'> {card?.subtitle}</Typography>
            <Typography alignItems={"flex-start"} justifyContent={"flex-start"}>{card?.description}</Typography>
            <Divider sx={{ height: "20px" }} />
           <h4>The ingredients:</h4>
            {card?.ingredients.split('\n').map((row, index) => {
              return (
                
                  <Typography mt={1} key={index}>{index + 1} {row}</Typography>
                
              )
            })}
           <h4>How to make?</h4>
            {card?.cookingSteps.split('\n').map((row, index) => {
              return (
                
                  <Typography mt={1} key={index}>{index + 1} {row}</Typography>
                
              )
            })}
          </Box>
        </Box>
      </Container>
    </Container>
  );
}

export default CardDetailsPage