import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  jobs: [],
  job: [],
  acceptedjobs: [],
  completedjobs: [],
  postulatedjobs: [],
  nextjobs: [],
  historyjobs: [],
  total_pages: 0,
  jobDetails: [],
  disableButton: [],
  disableButtonCustomer: [],
  calendar: [],
  canApply: [],
  loading: false,
};

const fetchJobsSuccess = (state, action) => updateObject(state, {
  jobs: action.jobs,
});

const fetchNextJobsStart = (state, action) => updateObject(state, {
  loading: true,
  nextjobs: [],
});

const fetchNextJobsSuccess = (state, action) => updateObject(state, {
  nextjobs: action.nextjobs,
  loading: false,
});

const fetchNextJobsFail = (state, action) => updateObject(state, {
  loading: false,
});

const fetchHistoryJobsSuccess = (state, action) => updateObject(state, {
  historyjobs: action.historyjobs,
});

const fetchJobStart = (state, action) => updateObject(state, {
  job: [],
  loading: true,
});

const fetchJobSuccess = (state, action) => updateObject(state, {
  job: action.job,
  loading: false,
});

const fetchJobFail = (state, action) => updateObject(state, {
  loading: false,
});

const acceptedJobSuccess = (state, action) => updateObject(state, {
  job: action.job,
});

const fetchAgentJobsSuccess = (state, action) => updateObject(state, {
  jobs: action.jobs,
  total_pages: action.total_pages,
});

const fetchJobAgentCurrent = (state, action) => updateObject(state, {
  acceptedjobs: action.acceptedjobs,
});

const fetchJobAgentCompleted = (state, action) => updateObject(state, {
  completedjobs: action.completedjobs,
});

const fetchJobAgentPostulated = (state, action) => updateObject(state, {
  postulatedjobs: action.postulatedJobs,
});

const jobDetails = (state, action) => updateObject(state, {
  jobDetails: action.jobDetails,
});

const disableButtonSuccess = (state, action) => updateObject(state, {
  disableButton: action.disableButton,
});

const disableButtonCustomerSuccess = (state, action) => updateObject(state, {
  disableButtonCustomer: action.disableButtonCustomer,
});

const jobCalendarSuccess = (state, action) => updateObject(state, {
  calendar: action.jobs,
});

const canApplySuccess = (state, action) => updateObject(state, {
  canApply: action.canApply,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_JOBS_START: return state;
    case actionTypes.FETCH_JOBS_SUCCESS: return fetchJobsSuccess(state, action);
    case actionTypes.FETCH_JOBS_FAIL: return state;
    case actionTypes.FETCH_JOB_START: return fetchJobStart(state, action);
    case actionTypes.FETCH_JOB_SUCCESS: return fetchJobSuccess(state, action);
    case actionTypes.FETCH_JOB_FAIL: return fetchJobFail(state, action);
    case actionTypes.FETCH_NEXTJOBS_START: return fetchNextJobsStart(state,action);
    case actionTypes.FETCH_NEXTJOBS_FAIL: return fetchNextJobsFail(state, action);
    case actionTypes.FETCH_NEXTJOBS_SUCCESS: return fetchNextJobsSuccess(state, action);
    case actionTypes.FETCH_HISTORYJOBS_START: return state;
    case actionTypes.FETCH_HISTORYJOBS_SUCCESS: return fetchHistoryJobsSuccess(state, action);
    case actionTypes.FETCH_HISTORYJOBS_FAIL: return state;
    case actionTypes.ACCEPTED_JOB_START: return state;
    case actionTypes.ACCEPTED_JOB_SUCCESS: return acceptedJobSuccess(state, action);
    case actionTypes.ACCEPTED_JOB_FAIL: return state;
    case actionTypes.CANCELLED_JOB_START: return state;
    case actionTypes.CANCELLED_JOB_SUCCESS: return state;
    case actionTypes.CANCELLED_JOB_FAIL: return state;
    case actionTypes.FETCH_AGENT_JOBS_START: return state;
    case actionTypes.FETCH_AGENT_JOBS_SUCCESS: return fetchAgentJobsSuccess(state, action);
    case actionTypes.FETCH_AGENT_JOBS_FAIL: return state;
    case actionTypes.APPLY_PROPOSAL_START: return state;
    case actionTypes.APPLY_PROPOSAL_SUCCESS: return state;
    case actionTypes.APPLY_PROPOSAL_FAIL: return state;
    case actionTypes.FETCH_JOB_AGENT_CURRENT_START: return state;
    case actionTypes.FETCH_JOB_AGENT_CURRENT_SUCCESS: return fetchJobAgentCurrent(state, action);
    case actionTypes.FETCH_JOB_AGENT_CURRENT_FAIL: return state;
    case actionTypes.FETCH_JOB_AGENT_COMPLETED_START: return state;
    case actionTypes.FETCH_JOB_AGENT_COMPLETED_SUCCESS: return fetchJobAgentCompleted(state, action);
    case actionTypes.FETCH_JOB_AGENT_COMPLETED_FAIL: return state;
    case actionTypes.FETCH_JOB_AGENT_POSTULATED_START: return state;
    case actionTypes.FETCH_JOB_AGENT_POSTULATED_SUCCESS: return fetchJobAgentPostulated(state, action);
    case actionTypes.FETCH_JOB_AGENT_POSTULATED_FAIL: return state;
    case actionTypes.JOB_DETAILS_START: return state;
    case actionTypes.JOB_DETAILS_SUCCESS: return jobDetails(state, action);
    case actionTypes.JOB_DETAILS_FAIL: return state;
    case actionTypes.DISABLE_BUTTON_START: return state;
    case actionTypes.DISABLE_BUTTON_SUCCESS: return disableButtonSuccess(state, action);
    case actionTypes.DISABLE_BUTTON_FAIL: return state;
    case actionTypes.DISABLE_BUTTON_CUSTOMER_START: return state;
    case actionTypes.DISABLE_BUTTON_CUSTOMER_SUCCESS: return disableButtonCustomerSuccess(state, action);
    case actionTypes.DISABLE_BUTTON_CUSTOMER_FAIL: return state;
    case actionTypes.JOB_CALENDAR_START: return state;
    case actionTypes.JOB_CALENDAR_SUCCESS: return jobCalendarSuccess(state, action);
    case actionTypes.JOB_CALENDAR_FAIL: return state;
    case actionTypes.CAN_APPLY_START: return state;
    case actionTypes.CAN_APPLY_SUCCESS: return canApplySuccess(state, action);
    case actionTypes.CAN_APPLY_FAIL: return state;
    default: return state;
  }
};

export default reducer;
