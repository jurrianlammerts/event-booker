import React, { useState, useContext } from 'react';

import AuthContext from '../context/AuthContext';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormButton from '../form/FormButton';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  industryDropdown: {
    padding: '24px 0',
  },
  button: {
    marginTop: theme.spacing(3),
  },
  label: {
    padding: '12px 0',
  },
}));

const possibleRoles = [
  'Frontend developer',
  'Influencer',
  'Backend developer',
  'Copywriter',
  'Content creator',
  'Photographer',
  'Video editor',
  'Graphic designer',
  'UX Designer',
  'DevOps',
  'Virtual assistant',
  'Voice actor',
  '3D Modeller',
  'Illustrator',
  'Marketing consultant',
  'Game developer',
  'Social Media Coordinator',
  'Teacher',
  'Recruiter',
  'SEO Specialist',
  'Internet Security Specialist',
];

export default function ProfileForm() {
  const classes = useStyles();
  const { editProfile } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [industry, setIndustry] = useState(null);

  const handleSubmit = () => {
    const profile = {
      industry,
      role,
    };

    editProfile(profile);
  };

  return (
    <div>
      <h2>Profile information</h2>
      <form onSubmit={handleSubmit}>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            What option describes you best
          </FormLabel>
          <RadioGroup
            aria-label="role"
            name="role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            <FormControlLabel
              value="Business owner"
              control={<Radio />}
              label="I own a business"
            />
            <FormControlLabel
              value="Freelancer"
              control={<Radio />}
              label="I'm a freelancer"
            />
            <FormControlLabel
              value="Employee"
              control={<Radio />}
              label="I'm an employee"
            />
            <FormControlLabel
              value="Personal"
              control={<Radio />}
              label="I use Talento for personal needs"
            />
          </RadioGroup>
          {role && (
            <div className={classes.industryDropdown}>
              <div className={classes.label}>
                <FormLabel component="legend">
                  What industry does the workplace/business belong to?
                </FormLabel>
              </div>
              <Autocomplete
                id="combo-box-demo"
                freeSolo
                options={possibleRoles}
                onChange={(event, newValue) => {
                  setIndustry(newValue);
                }}
                getOptionLabel={(option) => option || ''}
                value={industry}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
              {industry !== '' && industry !== null && (
                <FormButton
                  className={classes.button}
                  size="large"
                  color="secondary"
                  fullWidth
                >
                  Save changes
                </FormButton>
              )}
            </div>
          )}
        </FormControl>
      </form>
    </div>
  );
}
