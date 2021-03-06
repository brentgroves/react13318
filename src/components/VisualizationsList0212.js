import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Divider from "@material-ui/core/Divider";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

// PROBLEM WITH COLLAPSE SUB LIST AND FIREFOX
// WAIT FOR NEW VERSION OF MATERIAL-UI WHICH HAS NESTE LIST-ITEM COMPONENT
//https://v0.material-ui.com/#/components/list
//https://medium.com/@ali.atwa/getting-started-with-material-ui-for-react-59c82d9ffd93
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function VisualizationsList(params) {
  const { isAuthenticated, isAdmin, Push, OpenSproc200206Dialog,Sproc200206Create  } = params;
  const classes = useStyles();
  const [openAdHocOEE, setOpenAdHocOEE] = React.useState(true);
  const [openFixedOEE, setOpenFixedOEE] = React.useState(true);

  const handleAdHocOEEClick = () => {
    setOpenAdHocOEE(!openAdHocOEE);
  };

  const handleFixedOEEClick = () => {
    setOpenFixedOEE(!openFixedOEE);
  };
  const handleSproc200206Create = () => {
    Sproc200206Create("2020-02-01T00:00:00","2020-02-07T23:59:00");
  }
  /*
  const handleSproc200206Dialog = () => {
    Push("/sproc200206params");
  }
  */
  const handleSproc200206Dialog = () => {
    OpenSproc200206Dialog(true);
  }

  return (
    <List>
    <ListSubheader>Ad-Hoc</ListSubheader>
    <ListItem button onClick={handleAdHocOEEClick}>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="OEE" />
      {openAdHocOEE ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={openAdHocOEE} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItem button className={classes.nested} onClick={handleSproc200206Dialog} >
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText primary="Part" />
        </ListItem>
      </List>
      <List component="div" disablePadding>
        <ListItem button className={classes.nested}  >
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText primary="Selectable" />
        </ListItem>
      </List>
    </Collapse>
    <Divider />
    <ListSubheader>Fixed</ListSubheader>
    <ListItem button onClick={handleFixedOEEClick}>
    <ListItemIcon>
      <SendIcon />
    </ListItemIcon>
      <ListItemText primary="Previous Week" />
      {openFixedOEE ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={openFixedOEE} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItem button className={classes.nested}  >
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText primary="OEE by Part" />
        </ListItem>
      </List>
    </Collapse>
    </List>
  );
}

/*
export default function Dashboard({ isAuthenticated, isAdmin, Push }) {
  useEffect(() => {
    // Update the document title using the browser API
    //document.title = `You clicked ${count} times`;
    if (!isAuthenticated) {
      Push("/login");
    }
  });
*/
