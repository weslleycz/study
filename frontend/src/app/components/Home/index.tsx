import { api } from "@/app/services/api";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useQuery } from "react-query";

type Props = {
  id: string;
};

const Home = ({ id }: Props) => {
  const { data, isLoading, error, refetch } = useQuery(
    id,
    async () => {
      try {
        const res = await api.get(`/course/${id}`);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  useEffect(() => {
    if (!data) {
      refetch();
    }
  }, []);

  return (
    <Box p={2}>
      {isLoading ? (
        <Typography variant="h6">Carregando...</Typography>
      ) : (
        <Box>
          <img
            style={{
              width: "100%", 
              height: "auto", 
              maxWidth: "550px", 
            }}
            alt="Capa"
            src={process.env.API_Url + `/course/cover/${id}`}
          />
          <Box mt={2}>
            <Typography
              sx={{ fontWeight: 800, textAlign: "justify" }}
              variant="h6"
              gutterBottom
            >
              {data?.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {data?.description}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Home;
