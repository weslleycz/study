"use client";

import { Box, Container, Grid, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dynamic from "next/dynamic";
import { api } from "@/app/services/api";
import { useQuery } from "react-query";
import { useRouter, useParams } from "next/navigation";
const Home = dynamic(() => import("@/app/components/Home"), {
  ssr: false,
});

const Page = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const router = useRouter();
  const params = useParams();
  const [selete, setSelete] = useState("home");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <Box marginTop={3}>
        <Grid container spacing={2}>
          <Grid xs={2.5}>
            <Box justifyContent={"center"} display={"flex"}>
              <Box
                sx={{
                  height: "90vh",
                  backgroundColor: "#f0f0f04e",
                  padding: 4,
                  width: "90%",
                }}
              >
                <Box>
                  <Button
                    sx={{ marginBottom: 1 }}
                    fullWidth
                    variant="contained"
                    onClick={() => setSelete("home")}
                  >
                    Home
                  </Button>
                </Box>
                <Button sx={{ marginBottom: 1 }}
                 onClick={() => setSelete("turma")}
                 fullWidth variant="text">
                  Turma
                </Button>
                <Button sx={{ marginBottom: 1 }}
                onClick={() => setSelete("aulas")}
                 fullWidth variant="text">
                  Aulas
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid xs={7}>
            {selete === "home" ? <Home id={params.id as string} /> : null}
            {selete === "aulas" ? (
              <>
                <Box p={1}>
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography
                        variant="h4"
                        sx={{ flexShrink: 0, fontWeight: 900 }}
                      >
                        Modulo 1:
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Nulla facilisi. Phasellus sollicitudin nulla et quam
                        mattis feugiat. Aliquam eget maximus est, id dignissim
                        quam.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </>
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Page;
