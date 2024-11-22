import { all, fork } from "redux-saga/effects";
import employeeSaga from "./EmployeeSaga";
import certificateSaga from "./CertificateSaga";
import familySaga from "./FamilySaga";
import experienceSaga from "./ExperienceSaga";
import salarySaga from "./SalarySaga";
import processSaga from "./ProcessSaga";
import proposalSaga from "./ProposalSaga";
import leaderSaga from "./LeaderSaga";

export default function* rootSagaWatcher() {
  yield all([
    fork(employeeSaga),
    fork(certificateSaga),
    fork(familySaga),
    fork(experienceSaga),
    fork(salarySaga),
    fork(processSaga),
    fork(proposalSaga),
    fork(leaderSaga),
  ]);
}
