import { compose, withStateHandlers, withHandlers, lifecycle, branch, renderComponent } from 'recompose';
import { withRouter } from 'react-router';
import { db, withUser } from '../../utils';
import { connect } from 'react-redux';

import AppLoader from '../Loaders/AppLoader';
import Component from './Component';


//***********
// Made by Stepan Kuntsyo && Volodymyr Boichuk
//***********

const sortByTime = (a, b) => {
  if (a.createdAt.getTime() >= b.createdAt.getTime()) {
    return -1;
  }
  if (a.createdAt.getTime() < b.createdAt.getTime()) {
    return 1;
  }
}

const sortVotes = (a, b) => {
  if (a <= b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
}

const sortByOpinion = (array, order, key) => {
  array.sort(function(a, b) {
    let A = a[key],
      B = b[key];
    if (order.indexOf(A) > order.indexOf(B)) {
      return 1;
    }
    else {
      return -1;
    }
  });
  return array.reverse();
}

const unique = (arr) => {
  let obj = {};
  let count = 1;
  for (let i = 0; i < arr.length; i++) {
    let str = arr[i];
    if (arr[i] === arr[i + 1]) {
      count++;
      obj[str] = count;
    }
    else if (arr[i] !== arr[i + 1] && count === 1) {
      obj[str] = 1;
    }
    else { count = 1; }
  }
  return obj;
}


const enhance = compose(
  withStateHandlers({ answers: [], users: [], votes: [], isFetching: true }),

  withRouter,

  lifecycle({
    componentWillMount() {
      this.interval = db.pooling(async() => {
        const questionId = this.props.match.params.questionId;

        const users = await db.users.find();

        let answers = await db.answers.find();
        answers = answers.filter(answer => answer.questionId === questionId);

        let votes = await db.votes.find();
        const answerIds = answers.map(a => a._id);
        votes = votes.filter(vote => answerIds.includes(vote.answerId));

        let likes = unique(votes
          .filter(vote => vote.isPositive)
          .map(vote => vote.answerId)
          .sort(sortVotes))
        let dislikes = unique(votes
          .filter(vote => !vote.isPositive)
          .map(vote => vote.answerId)
          .sort(sortVotes))

        likes = Object.keys(likes).sort(function(a, b) { return likes[b] - likes[a] }).reverse();
        dislikes = Object.keys(dislikes).sort(function(a, b) { return dislikes[b] - dislikes[a] }).reverse();

        switch (this.props.sortBy) {
          case "createdAt":
            answers = answers.sort(sortByTime);
            break;
          case "best":
            answers = sortByOpinion(answers, likes, '_id');
            break;
          case "worst":
            answers = sortByOpinion(answers, dislikes, '_id');
            break;
          default:
            return answers;
        }

        this.setState({ answers, votes, users, isFetching: false, });
      });
    },
    componentWillUnmount() {
      clearInterval(this.interval);
    }
  }),

  branch(
    ({ isFetching }) => isFetching,
    renderComponent(AppLoader)
  ),

  withUser,

  withHandlers({
    onVote: ({ user }) => (answerId, isPositive) => {
      if (user) {
        db.votes.insert({
          answerId,
          isPositive,
          createdAt: new Date(),
          createdById: user._id,
        });
      }
    }
  }),
);

const mapStateToProps = state => ({
  sortBy: state.answerSort.sortBy,
});


export default connect(mapStateToProps)(enhance(Component));
