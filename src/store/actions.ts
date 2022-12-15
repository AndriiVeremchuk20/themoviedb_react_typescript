import * as MoviesActionCreators from "./Movies/actionCreator";
import * as MovieActionCreators from "./Movie/actionCreator";
import * as AppActionCreators from "./App/actionCreators";
import * as UserActionCreators from "./User/actionCreators";

export default {
  ...MoviesActionCreators,
  ...MovieActionCreators,
  ...AppActionCreators,
  ...UserActionCreators,
};
