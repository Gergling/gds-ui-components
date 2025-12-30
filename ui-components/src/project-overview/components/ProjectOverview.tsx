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
import { GroupedMilestones, Milestone } from '../types';
import { StyledDateDisplay, StyledMilestoneDateRange } from './ProjectOverview.style';
import { MilestoneGroup } from '../config';

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
const MilestoneDetails = ({ description, progress, open, warning }: Milestone) => {
  const warningText = useMemo(() => {
    if (warning === 'due') return 'This milestone has a start date but no due date.';
    if (warning === 'start') return `
      This milestone has a due date but no start date. A start date needs to be
      included in the description matching ${GITHUB_DESCRIPTION_DATE_REGEX}.
    `;
    return '';
  }, [warning]);

  const {
    daysOfIssues,
    relativeDescription,
    remainingDays,
  } = useMemo(
    () => {
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
          daysOfIssues,
          relativeDescription,
          remainingDays,
        };
      }
      return {
        daysOfIssues: undefined,
        relativeDescription: '',
        remainingDays: undefined,
      };
    },
    [open, progress]
  );

  return <>
    {warning !== 'none' && <Alert severity="warning">{warningText}</Alert>}
    {progress.days && <div>There are {daysOfIssues} days of work to complete in {remainingDays} days. {relativeDescription}</div>}
    <div>{description}</div>
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

const MilestoneProgress = ({ progress }: Milestone) => {
  const color = useMemo(
    () => getMilestoneProgressColour(progress),
    [progress]
  );
  const isNotInProgress = useMemo(() => progress.issues === 0 && progress.days === undefined, [progress]);
  if (isNotInProgress) return <>Milestone is not in progress</>;
  return <>
    {progress.days && <LinearProgress variant="determinate" color='info' value={progress.days.proportion * 100} />}
    <LinearProgress variant="determinate" color={color} value={progress.issues * 100} />
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
  return <StyledMilestoneDateRange>
    <DisplayDate date={milestone?.start} /> - <DisplayDate date={milestone?.end} />
  </StyledMilestoneDateRange>;
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

const MilestoneRowGroup = ({
  group,
  milestones
}: GroupedMilestones) => {
  const readableGroup = useMemo(() => group.toUpperCase(), [group]);
  return <>
    <TableRow>
      <TableCell colSpan={4}>{readableGroup}</TableCell>
    </TableRow>
    {milestones.map((milestone) => <MilestoneRow key={milestone.id} {...milestone} />)}
  </>;
};

const Content = () => {
  const { milestones } = useMilestones();
  const { empty, grouped } = useMemo(() => milestones.reduce(({
    grouped,
    empty,
  }, { group, milestones }) => {
    if (milestones.length === 0) return {
      empty: [...empty, group],
      grouped,
    };
    return {
      empty,
      grouped: [...grouped, { group, milestones }],
    };
  }, { empty: [], grouped: [] } as { empty: MilestoneGroup[], grouped: GroupedMilestones[] }), [milestones]);
  return <>
    <AppHeader title="Milestone Overview" appBarProps={{ position: 'relative' }} />
    <List>
      <ListItem>
        <ListItemIcon><HourglassBottom /></ListItemIcon>
        <ListItemText primary="Column Width Limits" />
      </ListItem>
    </List>
    <TableContainer>
      <Table>
        {grouped.map((milestoneGroup) => <MilestoneRowGroup key={milestoneGroup.group} {...milestoneGroup} />)}
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
