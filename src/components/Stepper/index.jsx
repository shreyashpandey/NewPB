import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Forms from "../Forms"
import Template from "../Template/Template1";
import Modal from '@mui/material/Modal';
import { Context } from '../Context';
import { useContext, useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { ContextProvider } from "../Context";
import App from "../Template/Template1/Template1";
import { renderToString } from "react-dom/server";
import { downloadHtml } from "../Template/download";
import AboutSection from "../Template/AboutSection";
import "../Template/AboutSection.css";
import { AboutCss } from "../Template/Combine";
import 'pure-react-carousel/dist/react-carousel.es.css';
import template11 from "../../assets/templat1-1.png"
import template12 from "../../assets/template1-2.png"
import template13 from "../../assets/template1-3.png"
import template21 from "../../assets/template2-1.png"
import template22 from "../../assets/template2-2.png"
import template23 from "../../assets/template2-3.png"
import template31 from "../../assets/template3-1.png"
import template32 from "../../assets/template3-2.png"
import template33 from "../../assets/template3-3.png"
import FileSaver from "file-saver"
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {

    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));
function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <LibraryAddIcon />,
    2: <SettingsIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};


const steps = ['Select Template', 'Configure Values', 'Generate Portfolio'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const { template, setTemplate } = useContext(Context);
  const [cardStyle, setCardStyle] = useState({});
  const [toggleCard, setToggleCard] = useState({});
  const [error, setError] = useState("");
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (template.length == 0) {
      setError("Template Not selected");
    }
    else {
      setError("");
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  const selectedTemplate = (e, id) => {
    console.log("Id ", id)
    console.log("Template selected", e);
    if (template != id && template != "") {
      setError("You can't select more than one template")
    }
    else {
      // const { target: { id } } = e;
      setError("");
      let cards = cardStyle;
      let toggles = toggleCard;
      toggles[id] = !toggles[id];
      if (toggleCard[id]) {
        cards[id] = { border: "5px solid #83cae1" };
        setTemplate(id);
      }
      else {
        cards[id] = { border: "0px solid black" };
        setTemplate("");
      }
      setToggleCard(toggles)
      setCardStyle(cards);
    }
  }
  const handleReset = () => {
    setActiveStep(0);
  };
  const handleDownload = () => {
    // console.log("AboutCss: ", AboutCss);
    // const blob = new Blob([AboutCss], { type: "text/css" });
    // const url = window.URL.createObjectURL(blob);
    // console.log("CSS Url ", url);
    // const a = document.createElement("a");// Create an anchor element and trigger the download
    // a.href = url;
    // a.download = "styles.css"; // Set the desired filename
    // document.body.appendChild(a);
    // a.click();
    // window.URL.revokeObjectURL(url);
    // document.body.removeChild(a);

    const links = document.querySelectorAll('link');
    console.log("Links ", links)
    // Iterate over the list and download each CSS file.
    for (let link of links) {
      let run = async () => {
        console.log("Download Link ", link);
        if (link.rel === 'stylesheet') {
          // Fetch the CSS file and save it to the local directory.
          const response = await fetch(link.href);
          const cssText = await response.text();
          const filename = link.href.split('/').pop();
          const blob = new Blob([cssText], { type: 'text/css' });
          console.log("Blob ", blob)
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          URL.revokeObjectURL(url);
        }
      };
      run();
    }

  };
  const handleFinish = () => {
    console.log("Handled click")
    // const htmlContent = ReactDOMServer.renderToStaticMarkup(App);
    // console.log(renderToString(<App />));
    // console.log(htmlContent);

    // const links = document.querySelectorAll('link');
    // console.log("Links ", links)
    // // Iterate over the list and download each CSS file.
    // for (let link of links) {
    //   let run=async () => {
    //     console.log("Download Link ", link);
    //     if (link.rel === 'stylesheet') {
    //       // Fetch the CSS file and save it to the local directory.
    //       const response = await fetch(link.href);
    //       console.log("Response ", response);
    //       const cssText = await response.text();
    //       console.log("CSS Text ",cssText);
    //       const filename = link.href.split('/').pop();
    //       console.log("File Name", filename);
    //       const blob = new Blob([cssText], { type: 'text/css' });
    //       console.log("Blob ",blob)
    //       const url = URL.createObjectURL(blob);
    //       const a = document.createElement('a');
    //       a.href = url;
    //       a.download = filename;
    //       a.click();
    //       URL.revokeObjectURL(url);
    //     }
    //   };
    //   run();
    // }
    downloadHtml(renderToString(<App />), "component.html");
  };
  return (
    <>
      {
        error.length > 0 ? (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">{error}</Alert>
          </Stack>
        ) : <></>
      }
      <Box sx={{ width: '100%', border: '2px solid gray', paddingLeft: '20px', paddingTop: '20px', paddingBottom: '20px', paddingRight: '40px', background: 'linear-gradient(90deg, #fdb44b, transparent)', boxShadow: '20px 15px 5px white', borderRadius: '10px' }}>
        <Stepper activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps} >
                <StepLabel StepIconComponent={ColorlibStepIcon} {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {
              activeStep == 0 ? (
                <>
                  <Typography sx={{ mt: 2, mb: 1, color: "#fff" }}>Templates</Typography>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={4} md={4}>
                      <Card id={"template1"} onClick={(e) => selectedTemplate(e, "template1")} sx={{ minWidth: "230px", minHeight: '250px', boxShadow: "0px 2px 1px -1px rgba(0,170,90,11.9), 0px 1px 1px 0px rgba(0,0,0,0.14), 10px 1px 3px 10px rgba(0,0,0,0.12)", zIndex: 9999 }} style={cardStyle.template1}>
                        <CardContent >
                          <div>
                            <Typography gutterBottom variant="h5" component="div">
                              Template1
                            </Typography>

                            <CarouselProvider

                              naturalSlideWidth={100}
                              naturalSlideHeight={100}
                              totalSlides={3}
                            >
                              <Slider>
                                <Slide index={0}><img src={template11} style={{ width: '200px', height: '150px' }} /></Slide>
                                <Slide index={1}><img src={template12} style={{ width: '200px', height: '150px' }} /></Slide>
                                <Slide index={2}><img src={template13} style={{ width: '200px', height: '150px' }} /></Slide>
                              </Slider>
                              <ButtonBack>Back</ButtonBack>
                              <ButtonNext>Next</ButtonNext>
                            </CarouselProvider>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <Card id={"template2"} sx={{ minWidth: "230px", minHeight: '250px', boxShadow: "0px 2px 1px -1px rgba(0,170,90,11.9), 0px 1px 1px 0px rgba(0,0,0,0.14), 10px 1px 3px 10px rgba(0,0,0,0.12)" }} onClick={(e) => selectedTemplate(e, "template2")} style={cardStyle.template2}>
                        <CardContent>

                          <Typography gutterBottom variant="h5" component="div">
                            Template2
                          </Typography>
                          <CarouselProvider
                            naturalSlideWidth={100}
                            naturalSlideHeight={100}
                            totalSlides={3}
                          >
                            <Slider>
                              <Slide index={0}><img src={template21} style={{ width: '200px', height: '150px' }} /></Slide>
                              <Slide index={1}><img src={template22} style={{ width: '200px', height: '150px' }} /></Slide>
                              <Slide index={2}><img src={template23} style={{ width: '200px', height: '150px' }} /></Slide>
                            </Slider>
                            <ButtonBack>Back</ButtonBack>
                            <ButtonNext>Next</ButtonNext>
                          </CarouselProvider>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <Card id={"template3"} sx={{ minWidth: "230px", minHeight: '250px', boxShadow: "0px 2px 1px -1px rgba(0,170,90,11.9), 0px 1px 1px 0px rgba(0,0,0,0.14), 10px 1px 3px 10px rgba(0,0,0,0.12)" }} onClick={(e) => selectedTemplate(e, "template3")} style={cardStyle.template3}>
                        <CardContent>

                          <Typography gutterBottom variant="h5" component="div">
                            Template3
                          </Typography>
                          <CarouselProvider
                            naturalSlideWidth={100}
                            naturalSlideHeight={100}
                            totalSlides={3}
                          >
                            <Slider>
                              <Slide index={0}><img src={template31} style={{ width: '200px', height: '150px' }} /></Slide>
                              <Slide index={1}><img src={template32} style={{ width: '200px', height: '150px' }} /></Slide>
                              <Slide index={2}><img src={template33} style={{ width: '200px', height: '150px' }} /></Slide>
                            </Slider>
                            <ButtonBack>Back</ButtonBack>
                            <ButtonNext>Next</ButtonNext>
                          </CarouselProvider>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>

                </>) : (<></>)

            }
            {
              activeStep == 1 ? (
                <>
                  <br />
                  {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                  <Forms />
                </>) : (<></>)
            }
            {
              activeStep == 2 ? (
                <>
                  <br />
                  {/* <ContextProvider> */}
                  {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                  {/* <Modal
                  open={true}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  > */}
                    <Box sx={{
                      display:'flex',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      transform: 'translate(0%, 0%)',
                      width: 800,
                      bgcolor: 'background.paper',
                      p: 4,
                    }}>
                      <Template />
                    </Box>
                  {/* </Modal> */}


                  {/* </ContextProvider> */}
                </>) : (<></>)
            }
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                className='stepButton'
                sx={{ mr: 1, color: 'black', background: 'white', boxShadow: '10px 10px 10px gray', fontWeight: '700' }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {/* {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )} */}
              {
                activeStep === steps.length - 1 ? (
                  <Button className='stepButton' onClick={() => { handleFinish(); }} sx={{ mr: 1, color: '#479ac2', background: 'white', boxShadow: '10px 10px 10px gray', fontWeight: '700' }}>
                    Download Portfolio
                  </Button>
                ) : (
                  <Button className='stepButton' onClick={handleNext} sx={{ mr: 1, color: '#479ac2', background: 'white', boxShadow: '10px 10px 10px gray', fontWeight: '700' }}>
                    Next
                  </Button>
                )
              }

            </Box>
          </React.Fragment>
        )}
      </Box >
    </>
  );
}