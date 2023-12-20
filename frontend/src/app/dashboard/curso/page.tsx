"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ColorizeIcon from "@mui/icons-material/Colorize";
import CreateIcon from "@mui/icons-material/Create";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import SquareIcon from "@mui/icons-material/Square";
import UploadIcon from "@mui/icons-material/Upload";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputLabel,
  Paper,
  Stack,
  Step,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChromePicker } from "react-color";
import { theme } from "../../theme";

const StepLabel = dynamic(() => import("@mui/material/StepLabel"), {
  ssr: false,
});

const Curso = () => {
  const [primaryColor, setPrimaryColor] = useState(theme.palette.primary.main);
  const [secondaryColor, setSecondaryColor] = useState(
    theme.palette.secondary.main
  );
  const [showPrimaryColorPicker, setShowPrimaryColorPicker] = useState(false);
  const [showSecondaryColorPicker, setShowSecondaryColorPicker] =
    useState(false);

  const primaryColorInputRef = useRef(null);
  const secondaryColorInputRef = useRef(null);

  const [image, setImage] = useState(null);

  const handlePrimaryColorChange = (newColor) => {
    setPrimaryColor(newColor.hex);
  };

  const handleSecondaryColorChange = (newColor) => {
    setSecondaryColor(newColor.hex);
  };

  const handleTogglePrimaryColorPicker = () => {
    setShowPrimaryColorPicker((prev) => !prev);
    setShowSecondaryColorPicker(false);
  };

  const handleToggleSecondaryColorPicker = () => {
    setShowSecondaryColorPicker((prev) => !prev);
    setShowPrimaryColorPicker(false);
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader() as any;

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleClickOutside = (event: any) => {
    if (
      primaryColorInputRef.current &&
      !primaryColorInputRef.current.contains(event.target)
    ) {
      setShowPrimaryColorPicker(false);
    }
    if (
      secondaryColorInputRef.current &&
      !secondaryColorInputRef.current.contains(event.target)
    ) {
      setShowSecondaryColorPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const steps = useMemo(
    () => [
      {
        label: "Dados",
      },
      { label: "Identidade visual" },
    ],
    []
  );

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const handleChangeName = (event: any) => {
    setName(event.target.value);
  };

  const handleChangeDescription = (event: any) => {
    setDescription(event.target.value);
  };

  const [stepsState, setStepsState] = useState(0);

  return (
    <Container maxWidth="md" sx={{ marginTop: 2, marginBottom: 2, p: 2 }}>
      <Box sx={{ width: "100%", marginTop: 3 }}>
        <Stepper activeStep={stepsState} alternativeLabel>
          {steps.map((label) => (
            <Step key={label.label}>
              <StepLabel>{label.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Container sx={{ marginTop: 2, marginBottom: 2 }} maxWidth="md">
        <Paper sx={{ p: 4 }} elevation={24}>
          {stepsState === 0 ? (
            <>
              <Box p={1}>
                <Stack direction="row" spacing={1}>
                  <CreateIcon sx={{ color: theme.palette.primary.main }} />
                  <Typography
                    sx={{
                      fontWeight: 800,
                      color: theme.palette.primary.main,
                    }}
                    variant="h6"
                    gutterBottom
                  >
                    Dados
                  </Typography>
                </Stack>
                <Typography
                  sx={{ color: theme.palette.info.main }}
                  variant="subtitle1"
                  gutterBottom
                >
                  Informe as informações do curso.
                </Typography>
              </Box>
              <Stack spacing={2}>
                <Box>
                  <InputLabel>Titulo</InputLabel>
                  <TextField
                    value={name}
                    onChange={handleChangeName}
                    fullWidth
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <InputLabel>Descrição</InputLabel>
                  <TextField
                    value={description}
                    onChange={handleChangeDescription}
                    fullWidth
                    multiline
                    rows={8}
                  />
                </Box>
              </Stack>
            </>
          ) : (
            <>
              <Box>
                <Box p={1}>
                  <Stack direction="row" spacing={1}>
                    <ColorLensIcon sx={{ color: theme.palette.primary.main }} />
                    <Typography
                      sx={{
                        fontWeight: 800,
                        color: theme.palette.primary.main,
                      }}
                      variant="h6"
                      gutterBottom
                    >
                      Cores
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{ color: theme.palette.info.main }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Defina as cores primária, secundária.
                  </Typography>
                </Box>

                <Box>
                  <Stack direction="row" spacing={2}>
                    <div ref={primaryColorInputRef}>
                      <TextField
                        value={"Cor primária"}
                        onClick={handleTogglePrimaryColorPicker}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <SquareIcon sx={{ color: primaryColor }} />
                          ),
                          endAdornment: (
                            <ColorizeIcon
                              sx={{ color: theme.palette.info.main }}
                            />
                          ),
                          style: {
                            color: theme.palette.info.main,
                          },
                        }}
                      />

                      {showPrimaryColorPicker && (
                        <ChromePicker
                          color={primaryColor}
                          onChange={handlePrimaryColorChange}
                        />
                      )}
                    </div>

                    <div ref={secondaryColorInputRef}>
                      <TextField
                        value={"Cor secundária"}
                        onClick={handleToggleSecondaryColorPicker}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <SquareIcon sx={{ color: secondaryColor }} />
                          ),
                          endAdornment: (
                            <ColorizeIcon
                              sx={{ color: theme.palette.info.main }}
                            />
                          ),
                          style: {
                            color: theme.palette.info.main,
                          },
                        }}
                      />

                      {showSecondaryColorPicker && (
                        <ChromePicker
                          color={secondaryColor}
                          onChange={handleSecondaryColorChange}
                        />
                      )}
                    </div>
                  </Stack>
                </Box>

                <Box marginTop={2} p={1}>
                  <Stack direction="row" spacing={1}>
                    <InsertPhotoIcon
                      sx={{ color: theme.palette.primary.main }}
                    />
                    <Typography
                      sx={{
                        fontWeight: 800,
                        color: theme.palette.primary.main,
                      }}
                      variant="h6"
                      gutterBottom
                    >
                      Capa do Curso
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{ color: theme.palette.info.main }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Elevando o Visual do Seu Conteúdo - Faça o Upload da Capa do
                    Seu Curso para uma Experiência de Aprendizagem Reconhecível
                    e Inspiradora.
                  </Typography>

                  {!image && (
                    <>
                      <Box>
                        <Box
                          height={250}
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          bgcolor={"#F5F5F5"}
                          marginBottom={1}
                        >
                          <UploadIcon
                            sx={{
                              fontSize: 50,
                              color: theme.palette.info.main,
                            }}
                          />
                        </Box>
                        <Button
                          startIcon={<CloudUploadIcon />}
                          variant="contained"
                          component="label"
                          fullWidth
                        >
                          Upload
                          <input
                            type="file"
                            style={{
                              display: "none",
                            }}
                            onChange={handleImageUpload}
                          />
                        </Button>
                      </Box>
                    </>
                  )}

                  {image && (
                    <>
                      <Stack marginTop={2} spacing={0.2}>
                        <Box width={10}>
                          <IconButton
                            color="error"
                            onClick={() => setImage(null)}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Box>
                        <Box>
                          <img
                            src={image}
                            alt="Uploaded"
                            style={{ maxWidth: "400px", maxHeight: "400px" }}
                          />
                        </Box>
                      </Stack>
                    </>
                  )}
                </Box>
              </Box>
            </>
          )}
        </Paper>
      </Container>
      <Box
        display={"flex"}
        justifyContent={"end"}
        sx={{ marginTop: 1, marginBottom: 1 }}
      >
        <Stack direction="row" spacing={2}>
          <Button
            disabled={stepsState === 0}
            startIcon={<ArrowBackIcon />}
            onClick={() => setStepsState(0)}
            variant="outlined"
          >
            Voltar
          </Button>
          {stepsState === 0 ? (
            <Button onClick={() => setStepsState(1)} variant="contained">
              Próximo
            </Button>
          ) : (
            <Button variant="contained">Criar</Button>
          )}
        </Stack>
      </Box>
    </Container>
  );
};

export default Curso;
