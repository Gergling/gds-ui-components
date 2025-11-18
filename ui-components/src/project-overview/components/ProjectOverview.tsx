import { useState, useMemo } from 'react';
import { Temporal } from '@js-temporal/polyfill';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  HourglassBottom,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Collapse,
  IconButton,
  LinearProgress,
  LinearProgressProps,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { AppHeader } from '../../app-header';
import { GITHUB_DESCRIPTION_DATE_REGEX } from '../constants';
import { useMilestones } from '../hooks/use-milestones';
import { Milestone } from '../types';
import { StyledDateDisplay } from './ProjectOverview.style';

const localStoragePersister = createAsyncStoragePersister({
  storage: window.localStorage,
})

// Configure the main Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 1 hour (3,600,000 ms)
      staleTime: 1000 * 60 * 60, 
      
      // Data will persist in the cache indefinitely and won't be garbage collected.
      // This is crucial for instant loading from local storage.
      gcTime: Infinity, 
      
      // Set retry to false for a clean display of data or error states
      retry: false,
    },
  },
});

const MilestoneTitle = ({ title }: Milestone) => {
  return <Typography variant="h6">{title}</Typography>;
};
const MilestoneDetails = ({ description, warning }: Milestone) => {
  const warningText = useMemo(() => {
    if (warning === 'due') return 'This milestone has a start date but no due date.';
    if (warning === 'start') return `
      This milestone has a due date but no start date. A start date needs to be
      included in the description matching ${GITHUB_DESCRIPTION_DATE_REGEX}.
    `;
    return '';
  }, [warning]);
  return <>
    <div>{description}</div>
    {warning !== 'none' && <Alert severity="warning">{warningText}</Alert>}
  </>;
};

const getMilestoneProgressColour = (progress: Milestone['progress']): LinearProgressProps['color'] => {
  if (progress.issues === 100) return 'success';
  if (progress.days !== undefined) {
    if (progress.issues > progress.days.proportion) return 'success';
    return 'error';
  }
  return 'info';
};

const MilestoneProgress = ({ open, progress }: Milestone) => {
  const {
    color,
    daysOfIssues,
    relativeDescription,
    remainingDays,
  } = useMemo(
    () => {
      const color = getMilestoneProgressColour(progress);
      if (progress.days !== undefined) {
        const { milestone, relative } = progress.days;
        const remainingIssuesFraction = 1 - progress.issues;
        const remainingDays = milestone - relative;
        const daysOfIssues = Math.ceil(remainingIssuesFraction * milestone);
        const lead = remainingDays - daysOfIssues;
        const scheduleAdjective = lead < 0 ? 'behind' : lead === 0 ? 'on' : 'ahead of';
        const remainingPercentage = Math.ceil(remainingIssuesFraction * 100);
        const catchUpIssues = Math.ceil(remainingIssuesFraction * open);
        const catchUp = Math.ceil((Math.abs(lead) * 100 * catchUpIssues) / milestone);
        const relativeDescription = `
          The milestone is ${lead !== 0 ? `${Math.abs(lead)} days` : ''} ${scheduleAdjective} schedule.
          ${open} issues (${remainingPercentage}% of the work) need completion in that time.
          ${catchUpIssues} issues (${catchUp}%) need completion to catch up.
        `;
        return {
          color,
          daysOfIssues,
          relativeDescription,
          remainingDays,
        };
      }
      return {
        color,
        daysOfIssues: undefined,
        relativeDescription: '',
        remainingDays: undefined,
      };
    },
    [open, progress]
  );
  return <>
    {progress.days && <LinearProgress variant="determinate" color='info' value={progress.days.proportion * 100} />}
    <LinearProgress variant="determinate" color={color} value={progress.issues * 100} />
    {progress.days && <div>There are {daysOfIssues} days of work to complete in {remainingDays} days. {relativeDescription}</div>}
  </>;
};

const DisplayDate = ({ date }: { date?: Temporal.PlainDate; }) => {
  const text = useMemo(() => {
    if (date) {
      const day = date.day.toString().padStart(2, '0');
      const month = date.month.toString().padStart(2, '0');
      const year = date.year.toString();
      return `${day}/${month}/${year}`;
    }
    return '';
  }, [date]);
  if (!text) return <StyledDateDisplay empty={true}>XX/XX/XXXX</StyledDateDisplay>;

  return <StyledDateDisplay empty={false}>{text}</StyledDateDisplay>;
};

const MilestoneDateRange = (milestone: Milestone) => {
  return <>
    <DisplayDate date={milestone?.start} /> - <DisplayDate date={milestone?.end} />
  </>;
};

const MilestoneRow = (milestone: Milestone) => {
  const [open, setOpen] = useState(false);
  return <>
    <TableRow>
      <TableCell>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      <TableCell><MilestoneTitle {...milestone} /></TableCell>
      <TableCell><MilestoneProgress {...milestone} /></TableCell>
      <TableCell><MilestoneDateRange {...milestone} /></TableCell>
    </TableRow>
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Details
            </Typography>
            <MilestoneDetails {...milestone} />
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  </>;
};

const Content = () => {
  const { milestones } = useMilestones();
  return <>
    <AppHeader title="Milestone Overview" appBarProps={{ position: 'relative' }} />
    <List>
      <ListItem>
        <ListItemIcon><HourglassBottom /></ListItemIcon>
        <ListItemText primary="Grouping" />
      </ListItem>
      <ListItem>
        <ListItemIcon><HourglassBottom /></ListItemIcon>
        <ListItemText primary="Column Width Limits" />
      </ListItem>
    </List>
    <TableContainer>
      <Table>
        {milestones.map((milestone) => <MilestoneRow key={milestone.id} {...milestone} />)}
      </Table>
    </TableContainer>
  </>;
}

export const ProjectOverview = () => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: localStoragePersister }}
    >
      <Content />
    </PersistQueryClientProvider>
  );
};
