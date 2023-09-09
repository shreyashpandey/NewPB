import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useContext } from "react";
import { Context } from '../Context';
import { useState } from "react"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import App from "../Template/App";
import { renderToString } from "react-dom/server";
import { downloadHtml } from "../Template/download";
import AboutSection from "../Template/AboutSection";
import "../Template/AboutSection.css";
import { AboutCss } from "../Template/Combine";
const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Java',
    'Javascript',
    'Python',
    'React',
    'Angular JS',
    'Node JS',
    'Problem Solving',
    'Vue JS',
    'Next JS',
    'C++',
    'C'
];

function getStyles(name, skills, theme) {
    return {
        fontWeight:
            skills.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,

    };
}
export default function Forms() {

    const { name, setName, email, setEmail, phone, setPhone, address, setAddress, about, setAbout, workExperience,
        setWorkExperience, projects, setProjects, skills, setSkills, certifications, setCertifications } = useContext(Context);
    // const [items, setItems] = useState([{ "ProfileName": "", "From": "", "To": "", "Description": "" }]);

    const handleAddItemWE = () => {
        // setAdded(false);
        let items = [...workExperience];
        console.log("Items ", items)
        items.push({ "ProfileName": "", "From": "", "To": "", "Description": "" });
        setWorkExperience(items);
        // setWorkExperience([...workExperience, { "ProfileName": "", "From": "", "To": "", "Description": "" }]);
        // setAdded(true);
    };

    const handleRemoveItemWE = (name) => {
        console.log("Name", name)
        const newItems = [...workExperience];
        console.log("Items", newItems);
        // newItems.splice(index, 1);
        setWorkExperience(newItems.filter(f => name != f.ProfileName));
    };

    const handleItemChangeWE = (event, index) => {
        const { name, value } = event.target;
        const newItems = [...workExperience];
        newItems[index][name.split("_")[0]] = value;
        setWorkExperience(newItems);
    };
    const handleAddItemP = () => {
        // setAdded(false);
        let items = [...projects];
        console.log("Items ", items)
        items.push({ "ProjectName": "", "ProjectURL": "", "Description": "" });
        setProjects(items);
        // setWorkExperience([...workExperience, { "ProfileName": "", "From": "", "To": "", "Description": "" }]);
        // setAdded(true);
    };

    const handleRemoveItemP = (name) => {
        console.log("Name", name)
        const newItems = [...projects];
        console.log("Items", newItems);
        // newItems.splice(index, 1);
        setProjects(newItems.filter(f => name != f.ProjectName));
    };

    const handleItemChangeP = (event, index) => {
        const { name, value } = event.target;
        const newItems = [...projects];
        newItems[index][name.split("_")[0]] = value;
        setProjects(newItems);
    };
    const handleAddItemC = () => {
        // setAdded(false);
        let items = [...certifications];
        console.log("Items ", items)
        items.push({ "CertificationName": "", "CertificationId": "", "Description": "" });
        setCertifications(items);
        // setWorkExperience([...workExperience, { "ProfileName": "", "From": "", "To": "", "Description": "" }]);
        // setAdded(true);
    };

    const handleRemoveItemC = (name) => {
        console.log("Name", name)
        const newItems = [...certifications];
        console.log("Items", newItems);
        // newItems.splice(index, 1);
        setCertifications(newItems.filter(f => name != f.ProjectName));
    };

    const handleItemChangeC = (event, index) => {
        const { name, value } = event.target;
        const newItems = [...certifications];
        newItems[index][name.split("_")[0]] = value;
        setCertifications(newItems);
    };
    const theme = useTheme();

    const handleChangeSkills = (event) => {
        const {
            target: { value },
        } = event;
        setSkills(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    function handleChangeAbout(e) {
        const { target: { value } } = e;
        console.log("About Value ", value);
        setAbout(value);
    }
    const handleDownload = () => {
        // Create a Blob from the CSS file
        // const cssContent = AboutCss; // Replace with your CSS content
        console.log("AboutCss: ", AboutCss);
        const blob = new Blob([AboutCss], { type: "text/css" });
    
        // Create an object URL for the Blob
        // let zip = new JSZip();
        // zip
        // console.log("Zip ", zip);
        const url = window.URL.createObjectURL(blob);
        console.log("CSS Url ", url);
        // Create an anchor element and trigger the download
        const a = document.createElement("a");
        a.href = url;
        a.download = "styles.css"; // Set the desired filename
        document.body.appendChild(a);
        a.click();
    
        // Clean up the object URL
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      };
      const handleFinish = () => {
        console.log("Handled click")
        // const htmlContent = ReactDOMServer.renderToStaticMarkup(App);
        console.log(renderToString(<App />));
        // console.log(htmlContent);
        downloadHtml(renderToString(<App />), "component.html");
      };
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ marginBottom: '20px' }}>
                    <Grid container spacing={1} style={{ background: 'linear-gradient(6deg, gray, transparent)', border: '2px solid #fff', maxWidth: '100%', borderRadius: '10px' }}>
                        <Grid item xs={12} sm={4} md={4}>
                            <TextField id="name" value={name} label="Name" variant="outlined" onChange={(e) => setName(e.value)} style={{ float: 'left' }} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4}>
                            <TextField id="email" value={email} label="Email" variant="outlined" onChange={(e) => setEmail(e.value)} style={{ float: 'left' }} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={4}>
                            <TextField id="phone" value={phone} label="Phone" variant="outlined" onChange={(e) => setPhone(e.value)} style={{ float: 'left' }} />
                        </Grid>
                        <Grid item sm={12} md={12} xs={12}>
                            <StyledTextarea
                                maxRows={4}
                                aria-label="About"
                                placeholder="About"
                                value={about}
                                onChange={
                                    handleChangeAbout
                                }
                                style={{ height: '100px', minHeight: '100px', display: 'flex', direction: 'row', width: '87%', marginRight: '100px', marginBottom: "15px", maxWidth: '87%' }}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={12} sm={12} style={{ background: 'linear-gradient(6deg, gray, transparent)', border: '2px solid #fff', paddingBottom: '10px', maxWidth: '98.7%', marginLeft: '10px', borderRadius: '10px',marginBottom: '20px'  }}>
                    <Box>
                        <Typography variant="h4" style={{ color: '#fff', fontWeight: '800' }}>
                            Add Work Experience
                        </Typography>
                        {/* <p style={{ float: "centre", display: "flex", flexWrap: 'wrap', flexDirection: 'row', color: '#fff', fontWeight: '800', fontSize: '32px' }}>Add Work Experience</p> */}
                        <Button onClick={handleAddItemWE} style={{ float: 'centre', backgroundColor: 'transparent' }}><AddIcon /></Button>
                    </Box>
                    <br />

                    {
                        workExperience.length == 0 || !workExperience ? <></> : <>

                            {
                                workExperience.map((m1, i) =>
                                (
                                    console.log("Hello", workExperience.length),
                                    <Grid container spacing={2}>
                                        <Grid item sm={12} md={12} xs={12}>
                                            <Box>
                                                <Typography variant="h7" style={{ color: '#fff', fontWeight: '800' }}>
                                                    Work Experience {i + 1}
                                                </Typography>
                                                {/* <p style={{ float: "left", display: "flex", flexWrap: 'wrap', flexDirection: 'row' }}>Work Experience</p> */}
                                                <Button name={`but_${m1.ProfileName}`} onClick={() => handleRemoveItemWE(m1.ProfileName)} style={{ float: 'right', backgroundColor: '#4079ac2' }}><RemoveIcon /></Button>
                                            </Box>
                                        </Grid>
                                        <Grid item sm={4} md={4} xs={12}>
                                            <TextField name={`ProfileName_${i + 1}`} id={`profileName_${i}`} label="Profile Name" variant="outlined" onChange={(e) => handleItemChangeWE(e, i)} style={{ minWidth: '260px', float: 'left' }} />
                                        </Grid>

                                        <Grid item sm={4} md={4} xs={12} style={{ maxWidth: "350", float: 'left', display: 'flex' }}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs} style={{ float: 'left', display: 'flex', flexWrap: 'wrap', alignItems: "left", alignContent: 'left' }}>
                                                <DatePicker name={`From_${i + 1}`} label="From" value={`${m1.From}`} style={{ float: 'left', display: 'flex', flexWrap: 'wrap', alignItems: "left" }} />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item sm={4} md={4} xs={12} style={{ maxWidth: "350", float: 'left', display: 'flex' }}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker name={`To_${i + 1}`} label="To" value={`${m1.To}`} />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item sm={12} md={12} xs={12}>
                                            <StyledTextarea
                                                maxRows={4}
                                                aria-label="Description"
                                                placeholder="Description"
                                                defaultValue=""
                                                onChange={
                                                    (e) => handleItemChangeWE(e, i)
                                                }
                                                style={{ height: '100px', minHeight: '100px', display: 'flex', flexWrap: 'wrap', width: '97%', marginRight: '50px' }}
                                            />
                                        </Grid>
                                    </Grid>
                                )
                                )
                            }
                        </>}
                        
                </Grid>
                
                <Grid item xs={12} md={12} sm={12} style={{ background: 'linear-gradient(6deg, gray, transparent)', border: '2px solid #fff', paddingBottom: '10px', maxWidth: '98.7%', marginLeft: '10px', borderRadius: '10px' }}>
                    <Box>
                        <Typography variant="h4" style={{ color: '#fff', fontWeight: '800' }}>
                            Add Projects
                        </Typography>
                        {/* <p style={{ float: "left", display: "flex", flexWrap: 'wrap', flexDirection: 'row' }}>Add Projects</p> */}
                        <Button onClick={handleAddItemP} style={{ float: 'centre', backgroundColor: '#4079ac2' }}><AddIcon /></Button>
                    </Box>
                    <br />
                    {
                        projects.map((m1, i) =>
                        (
                            <Grid container spacing={2}>
                                <Grid item sm={12} md={12} xs={12}>
                                    <Box>
                                    <Typography variant="h7" style={{ color: '#fff', fontWeight: '800' }}>
                                                    Project {i + 1}
                                                </Typography>
                                        {/* <p style={{ float: "left", display: "flex", flexWrap: 'wrap', flexDirection: 'row' }}>Project {i + 1}</p> */}
                                        <Button name={`but_${m1.ProjectName}`} onClick={() => handleRemoveItemP(m1.ProjectName)} style={{ float: 'right', backgroundColor: '#4079ac2' }}><RemoveIcon /></Button>
                                    </Box>
                                </Grid>
                                <Grid item sm={6} md={6} xs={12}>
                                    <TextField name={`ProjectName_${i + 1}`} id={`projectName_${i}`} label="Project Name" variant="outlined" onChange={(e) => handleItemChangeP(e, i)} style={{ minWidth: '260px', float: 'left' }} />
                                </Grid>
                                <Grid item sm={6} md={6} xs={12}>
                                    <TextField name={`ProjectURL_${i + 1}`} id={`projectUrl_${i}`} label="Project URL" variant="outlined" onChange={(e) => handleItemChangeP(e, i)} style={{ minWidth: '260px', float: 'left' }} />
                                </Grid>

                                {/* <Grid item sm={4} md={4} xs={12} style={{ maxWidth: "350" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker name={`ValidTill_${i + 1}`} label="Valid Till" value={`${m1.From}`} />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item sm={4} md={4} xs={12} >
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker name={`To_P_${i + 1}`} label="To" value={`${m1.To}`} />
                                    </LocalizationProvider>
                                </Grid> */}
                                <Grid item sm={8} md={8} xs={12}>
                                    <StyledTextarea
                                        maxRows={4}
                                        aria-label="Description"
                                        placeholder="Description"
                                        defaultValue=""
                                        onChange={
                                            (e) => handleItemChangeP(e, i)
                                        }
                                        style={{ height: '100px', minHeight: '100px', display: 'flex', flexWrap: 'wrap', width: '97%', marginRight: '50px' }}
                                    />
                                </Grid>
                            </Grid>
                        )
                        )
                    }
                </Grid>
                <Grid item sm={12} md={12} xs={12}>
                    <FormControl sx={{  width: '100%', float: 'left',marginBottom:'10px',borderRadius:'10px',color:'white' }}>
                        <InputLabel id="demo-multiple-chip-label">Skills</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={skills}
                            onChange={handleChangeSkills}
                            input={<OutlinedInput id="select-multiple-chip" label="Skills" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} sx={{ color: '#fff' }} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {names.map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, skills, theme)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12} sm={12} style={{ background: 'linear-gradient(6deg, gray, transparent)', border: '2px solid #fff', paddingBottom: '10px', maxWidth: '98.7%', marginLeft: '10px', borderRadius: '10px' }}>
                    <Box>
                    <Typography variant="h4" style={{ color: '#fff', fontWeight: '800' }}>
                            Add Certifications
                        </Typography>
                        <Button onClick={handleAddItemC} style={{ float: 'centre', backgroundColor: '#4079ac2' }}><AddIcon /></Button>
                    </Box>
                    <br />
                    {
                        certifications.map((m1, i) =>
                        (
                            <Grid container spacing={2}>
                                <Grid item sm={12} md={12} xs={12}>
                                    <Box>
                                    <Typography variant="h7" style={{ color: '#fff', fontWeight: '800' }}>
                                                    Certificate {i + 1}
                                                </Typography>
                                        <Button name={`but_${m1.ProjectName}`} onClick={() => handleRemoveItemC(m1.CertificationName)} style={{ float: 'right', backgroundColor: '#4079ac2' }}><RemoveIcon /></Button>
                                    </Box>
                                </Grid>
                                <Grid item sm={6} md={6} xs={12}>
                                    <TextField name={`CertificationName_${i + 1}`} id={`certificationName_${i}`} label="Certification Name" variant="outlined" onChange={(e) => handleItemChangeC(e, i)} style={{ minWidth: '260px', float: 'left' }} />
                                </Grid>
                                <Grid item sm={6} md={6} xs={12}>
                                    <TextField name={`CertificationId_${i + 1}`} id={`certificationId_${i}`} label="Certification Id" variant="outlined" onChange={(e) => handleItemChangeC(e, i)} style={{ minWidth: '260px', float: 'left' }} />
                                </Grid>

                                {/* <Grid item sm={4} md={4} xs={12} style={{ maxWidth: "350" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker name={`ValidTill_${i + 1}`} label="Valid Till" value={`${m1.From}`} />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item sm={4} md={4} xs={12} >
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker name={`To_P_${i + 1}`} label="To" value={`${m1.To}`} />
                                    </LocalizationProvider>
                                </Grid> */}
                                <Grid item sm={8} md={8} xs={12}>
                                    <StyledTextarea
                                        maxRows={4}
                                        aria-label="Description"
                                        placeholder="Description"
                                        defaultValue=""
                                        onChange={
                                            (e) => handleItemChangeC(e, i)
                                        }
                                        style={{ height: '100px', minHeight: '100px', display: 'flex', flexWrap: 'wrap', width: '97%', marginRight: '50px' }}
                                    />
                                </Grid>
                            </Grid>
                        )
                        )
                    }
                    {/* <Button onClick={() => { handleFinish(); handleDownload(); }} sx={{ mr: 1, color: '#479ac2', background: 'white', boxShadow: '10px 10px 10px gray', fontWeight: '700' }}>
                    Download Portfolio
                  </Button> */}
                </Grid>
            </Grid>
        </div>
    );
}