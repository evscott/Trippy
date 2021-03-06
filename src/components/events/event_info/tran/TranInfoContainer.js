import { connect } from 'react-redux';
import TranInfo from './TranInfo';
import {
  deleteTranInDb,
  updateTranInDb
} from '../../../../redux/actions/tranActions';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (tran) => {
      dispatch(updateTranInDb(tran));
    },
    onDelete: (tran) => {
      dispatch(deleteTranInDb(tran));
    }
  };
};

const TranInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TranInfo);

export default TranInfoContainer;
